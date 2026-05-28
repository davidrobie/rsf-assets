# rsf-site

The Right-Sized Framework website — built with [Astro](https://astro.build/), deployed to DreamHost via GitHub Actions.

## Quickstart

```bash
# clone
git clone git@github.com:davidrobie/rsf-site.git
cd rsf-site

# install
npm install

# develop (hot reload at http://localhost:4321)
npm run dev

# build (output in ./dist)
npm run build

# preview the build locally
npm run preview
```

## Project layout

```
src/
├── components/              # Reusable section components (Hero, ActionPlan, Quiz, ...)
│   ├── SiteHeader.astro
│   ├── SiteFooter.astro
│   ├── PageTitle.astro
│   ├── ButtonRow.astro
│   ├── Hero.astro
│   ├── ActionPlan.astro
│   ├── ToolsTemplates.astro
│   ├── Quiz.astro           # interactive, scoring + tiered feedback
│   ├── References.astro
│   └── ChapterNav.astro
├── layouts/
│   ├── BaseLayout.astro     # <html>, header, footer
│   ├── ChapterPage.astro    # composes all the chapter components
│   └── SpecialPage.astro    # for privacy, terms, about, etc.
├── data/
│   ├── chapters.ts          # chapter registry (one source of truth)
│   └── hubs.ts              # hub registry
├── content/
│   ├── chapters/
│   │   ├── _types.ts        # shared shape
│   │   ├── index.ts         # registry — replace stubs as you fill chapters
│   │   └── chapter-1.ts     # fully filled example
│   └── hubs/
│       └── index.ts         # stub for every hub
├── pages/
│   ├── index.astro          # home (buy the book)
│   ├── chapters/[slug].astro  # generates all 11 chapter pages
│   ├── hubs/[slug].astro      # generates all 12 hub pages
│   ├── privacy.astro / terms.astro / contact.astro / about.astro / preorder.astro / blog.astro / 404.astro
└── styles/global.css        # design tokens + reset
public/
├── favicon.svg
├── robots.txt               # currently blocks crawlers — UPDATE BEFORE LAUNCH
├── images/                  # drop chapter images here
└── downloads/               # drop PDFs / worksheets here
```

## Adding a new chapter

1. Copy `src/content/chapters/chapter-1.ts` to `chapter-N.ts`.
2. Fill in the content. Each section's fields are typed by `_types.ts`, so the editor will yell if you miss something.
3. Open `src/content/chapters/index.ts`, import your new file, and add it to the `filled` map.
4. That's it — the new page appears at `/chapters/chapter-N/`. Nav, prev/next, and footer pick it up automatically.

To **skip the quiz** on a chapter, just omit the `quiz` field — the component is conditional.

## Adding a new hub page

Same pattern, but create the file in `src/content/hubs/` and register it in `src/content/hubs/index.ts`.

## Adding a special page (privacy, veterans, etc.)

Create `src/pages/your-page.astro` and use the `SpecialPage` layout. See `privacy.astro` for the pattern.

## Images & PDFs

- Drop chapter images at `public/images/chapter-1/hero.jpg`, etc. — the content files reference these paths.
- Drop PDFs at `public/downloads/`.
- Astro will copy `public/` into `dist/` as-is.

## Branding tokens

All colors, fonts, and spacing live as CSS variables at the top of `src/styles/global.css`. Change them in one place and every page updates.

## Downloading chapter images

The repo includes a reusable script at `scripts/download-images.mjs` that pulls images off Wix (or any URL list) and saves them under `public/images/<slug>/`.

```bash
# Pull every <img> from a live page:
node scripts/download-images.mjs --slug chapter-1 --url https://www.rightsizedframework.com/chapter-1

# Or pass URLs directly, naming them in order:
node scripts/download-images.mjs \
  --slug chapter-1 \
  --names hero,action-plan,tools,quiz \
  https://static.wixstatic.com/media/foo.jpg https://static.wixstatic.com/media/bar.webp

# Or scrape a saved HTML file:
node scripts/download-images.mjs --slug chapter-2 --html ./ch2.html
```

The script skips files that already exist (safe to re-run) and sets a Referer header so Wix's hot-link protection cooperates.

## Theme preview

Open `theme-preview.html` in any browser to compare the dark Wix theme vs. the editorial light theme side by side. There are toggle buttons at the top for full-width single-theme view.

## Deploying to DreamHost

See [DEPLOY.md](./DEPLOY.md).
