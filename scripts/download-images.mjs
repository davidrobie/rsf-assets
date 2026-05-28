#!/usr/bin/env node
/**
 * download-images.mjs
 *
 * Reusable script to download images from a Wix-hosted page (or any list of
 * URLs) and save them locally under public/images/<slug>/.
 *
 * Usage 1 — scrape an entire page:
 *   node scripts/download-images.mjs --url https://www.rightsizedframework.com/chapter-1 --slug chapter-1
 *
 * Usage 2 — pull from a saved HTML file:
 *   node scripts/download-images.mjs --html ./chapter-1.html --slug chapter-1
 *
 * Usage 3 — pass an explicit list of URLs:
 *   node scripts/download-images.mjs --slug chapter-1 https://static.wixstatic.com/... https://...
 *
 * For each image found:
 *   - Downloads to public/images/<slug>/
 *   - Names files predictably: hero.<ext>, action-plan.<ext>, tools.<ext>, quiz.<ext>, image-4.<ext>, ...
 *     (override order by passing --names hero,action-plan,tools,quiz)
 *   - Skips files that already exist (so it's safe to re-run)
 *   - Strips Wix CDN tracking params from filenames
 *
 * No external dependencies — uses Node 18+ built-ins (fetch, fs/promises).
 */

import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { argv, exit } from 'node:process';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, '..');
const defaultNames = ['hero', 'action-plan', 'tools', 'quiz'];

// ---------- arg parsing ----------
function parseArgs(args) {
  const out = { slug: null, url: null, html: null, names: defaultNames, urls: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--slug')       out.slug  = args[++i];
    else if (a === '--url')   out.url   = args[++i];
    else if (a === '--html')  out.html  = args[++i];
    else if (a === '--names') out.names = args[++i].split(',').map(s => s.trim());
    else if (a.startsWith('http')) out.urls.push(a);
    else if (a === '--help' || a === '-h') { printHelp(); exit(0); }
  }
  return out;
}

function printHelp() {
  console.log(`
download-images.mjs — Wix image downloader

  --slug NAME              destination folder (public/images/NAME). REQUIRED.
  --url URL                fetch the page and extract all <img> srcs
  --html FILE              read HTML from a local file instead of fetching
  --names a,b,c            rename downloaded files in order (default: hero,action-plan,tools,quiz,image-5,...)
  <URLs>                   any number of direct image URLs

  -h, --help               this message

Examples:
  node scripts/download-images.mjs --slug chapter-1 --url https://www.rightsizedframework.com/chapter-1
  node scripts/download-images.mjs --slug chapter-2 --html ./ch2.html
  node scripts/download-images.mjs --slug chapter-3 https://static.wixstatic.com/media/foo.jpg
`);
}

// ---------- helpers ----------
async function fileExists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

function extractImageUrls(html) {
  // Match every <img ... src="..."> — tolerates single/double quotes and extra attributes.
  const out = [];
  const re = /<img\b[^>]*?\bsrc\s*=\s*(["'])(.*?)\1/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[2]);
  // Also catch CSS background-image: url(...)
  const cssRe = /background(?:-image)?\s*:\s*url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;
  while ((m = cssRe.exec(html))) out.push(m[2]);
  // Dedupe, keep order
  return [...new Set(out)];
}

function guessExt(url) {
  const u = new URL(url);
  const ext = extname(u.pathname).toLowerCase().replace('.', '');
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'avif'].includes(ext)) return ext;
  return 'jpg'; // fallback
}

function buildFilename(idx, names, url) {
  const base = names[idx] || `image-${idx + 1}`;
  return `${base}.${guessExt(url)}`;
}

async function download(url, dest, referer) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (rsf-site image downloader)',
    'Accept': 'image/*,*/*;q=0.8',
  };
  if (referer) headers['Referer'] = referer;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

// ---------- main ----------
async function main() {
  const opts = parseArgs(argv.slice(2));
  if (!opts.slug) {
    console.error('Error: --slug is required (e.g. --slug chapter-1)');
    printHelp();
    exit(1);
  }

  let urls = opts.urls.slice();

  if (opts.url) {
    console.log(`Fetching ${opts.url} ...`);
    const res = await fetch(opts.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`Failed to fetch page: ${res.status}`);
    const html = await res.text();
    urls.push(...extractImageUrls(html));
  }
  if (opts.html) {
    const html = await readFile(opts.html, 'utf8');
    urls.push(...extractImageUrls(html));
  }

  urls = [...new Set(urls)].filter(u => /^https?:\/\//.test(u));

  if (urls.length === 0) {
    console.error('No image URLs found.');
    exit(1);
  }

  const outDir = join(projectRoot, 'public', 'images', opts.slug);
  await mkdir(outDir, { recursive: true });

  console.log(`\nFound ${urls.length} image URL(s). Saving to ${outDir}\n`);

  let saved = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = buildFilename(i, opts.names, url);
    const dest = join(outDir, filename);

    if (await fileExists(dest)) {
      console.log(`  [skip] ${filename}  (already exists)`);
      continue;
    }
    try {
      const size = await download(url, dest, opts.url || 'https://www.rightsizedframework.com/');
      console.log(`  [ok]   ${filename}  ${(size / 1024).toFixed(0)} KB  ← ${url.slice(0, 70)}${url.length > 70 ? '…' : ''}`);
      saved++;
    } catch (err) {
      console.error(`  [FAIL] ${filename}  ${err.message}`);
    }
  }

  console.log(`\nDone. Downloaded ${saved} new file(s) to public/images/${opts.slug}/`);
  console.log('Reference in chapter content as e.g.  image: "/images/' + opts.slug + '/hero.jpg"');
}

main().catch(err => {
  console.error('Fatal:', err);
  exit(1);
});
