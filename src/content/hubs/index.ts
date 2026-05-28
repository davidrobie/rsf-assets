// Central registry for Innovation Hub pages. Same pattern as chapters/index.ts.
import { hubs } from '../../data/hubs';
import { ChapterContent, makeStub } from '../chapters/_types';

// As you fill in each hub, import it here:
// import { visionHub } from './vision';
// import { pmfHub } from './pmf';

const filled: Record<string, ChapterContent> = {};

export function getHubContent(slug: string): ChapterContent {
  if (filled[slug]) return filled[slug];
  const meta = hubs.find(h => h.slug === slug);
  if (!meta) return makeStub('Page Not Found');
  return makeStub(meta.title, 'Innovation Hub');
}
