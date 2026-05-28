// Central registry of chapters — used by nav, prev/next, sitemap, etc.
// Update the title here once and it propagates everywhere.

export interface ChapterMeta {
  slug: string;        // URL segment, also the markdown filename
  number: number;
  title: string;       // full chapter title
  shortTitle?: string; // nav-friendly short version
}

export const chapters: ChapterMeta[] = [
  { slug: 'chapter-1',  number: 1,  title: 'Stuck in the Mud with No Traction', shortTitle: 'Ch 1 · Stuck in the Mud' },
  { slug: 'chapter-2',  number: 2,  title: 'Are You Ready for This',             shortTitle: 'Ch 2 · Ready for This' },
  { slug: 'chapter-3',  number: 3,  title: 'Crafting a Compelling Vision',       shortTitle: 'Ch 3 · Crafting a Vision' },
  { slug: 'chapter-4',  number: 4,  title: 'I Need More Paying Customers',       shortTitle: 'Ch 4 · Paying Customers' },
  { slug: 'chapter-5',  number: 5,  title: 'The Product Development Cycle in Action', shortTitle: 'Ch 5 · The PDC in Action' },
  { slug: 'chapter-6',  number: 6,  title: "Don't Wander — Plan with Purpose",   shortTitle: 'Ch 6 · Plan with Purpose' },
  { slug: 'chapter-7',  number: 7,  title: 'Design the Solution',                shortTitle: 'Ch 7 · Design the Solution' },
  { slug: 'chapter-8',  number: 8,  title: 'How to Build (and Intelligently Break)', shortTitle: 'Ch 8 · Build and Break' },
  { slug: 'chapter-9',  number: 9,  title: 'Test — Turn Uncertainty into Evidence', shortTitle: 'Ch 9 · Test' },
  { slug: 'chapter-10', number: 10, title: 'Release — Launch Without Regret',    shortTitle: 'Ch 10 · Release' },
  { slug: 'chapter-11', number: 11, title: 'Conclusion — Bringing It All Together', shortTitle: 'Ch 11 · Conclusion' },
];

export function chapterBySlug(slug: string): ChapterMeta | undefined {
  return chapters.find(c => c.slug === slug);
}

export function adjacentChapters(slug: string): { prev?: ChapterMeta; next?: ChapterMeta } {
  const i = chapters.findIndex(c => c.slug === slug);
  return {
    prev: i > 0 ? chapters[i - 1] : undefined,
    next: i >= 0 && i < chapters.length - 1 ? chapters[i + 1] : undefined,
  };
}
