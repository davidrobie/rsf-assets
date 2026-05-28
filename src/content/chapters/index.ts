// Central content registry. To fill in a chapter, replace its stub with a
// real content file alongside chapter-1.ts and re-export it here.

import { chapters } from '../../data/chapters';
import { ChapterContent, makeStub } from './_types';
import { chapter1 } from './chapter-1';

// As you fill in each chapter, import it here and replace the stub:
// import { chapter2 } from './chapter-2';
// import { chapter3 } from './chapter-3';
// ...

const filled: Record<string, ChapterContent> = {
  'chapter-1': chapter1,
};

export function getChapterContent(slug: string): ChapterContent {
  if (filled[slug]) return filled[slug];
  const meta = chapters.find(c => c.slug === slug);
  if (!meta) {
    return makeStub('Page Not Found');
  }
  return makeStub(meta.title, `Chapter ${meta.number}`);
}
