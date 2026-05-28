// Shared shape for all chapter and hub content files.
// Editing this in one place updates the contract across every page.

export interface ChapterContent {
  eyebrow?: string;
  title: string;
  dek?: string;

  buttons?: { label: string; href: string; variant?: 'primary' | 'ghost' | 'copper'; newTab?: boolean }[];

  hero: { eyebrow?: string; heading: string; body?: string; image?: string; imageAlt?: string };

  actionPlan: {
    eyebrow?: string;
    heading: string;
    columnLeftTitle?: string;
    columnRightTitle?: string;
    columnLeft?: string;
    columnRight?: string;
    image?: string;
    imageAlt?: string;
    imagePosition?: 'top' | 'between' | 'bottom';
  };

  tools: {
    eyebrow?: string;
    heading: string;
    body?: string;
    image?: string;
    imageAlt?: string;
    tools?: { label: string; href: string; meta?: string }[];
  };

  // Multiple-choice quiz (right/wrong + tiered final score)
  quiz?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    image?: string;
    imageAlt?: string;
    quizId: string;
    questions: {
      question: string;
      choices: { label: string; correct?: boolean; feedback?: string }[];
      explanation?: string;
    }[];
    tiers?: { min: number; title: string; description: string }[];
  };

  // Likert-scale (1-5) self-assessment with multiple sections & primary-constraint analysis
  assessment?: {
    assessmentId: string;
    eyebrow?: string;
    heading: string;
    intro?: string;
    scaleNote?: string;
    externalUrl?: string;
    image?: string;
    imageAlt?: string;
    sections: {
      title: string;
      shortTitle?: string;
      max: number;
      bands: { min: number; max: number; label: string; text: string }[];
      questions: string[];
    }[];
  };

  references?: {
    title: string;
    authors?: string;
    source?: string;
    url?: string;
    type?: 'book' | 'article' | 'video' | 'tool' | 'other';
  }[];

  description?: string;
  noindex?: boolean;
}

// Bare-bones stub used to scaffold chapters/hubs you haven't filled in yet.
// Title + a placeholder paragraph everywhere, quiz omitted.
export function makeStub(title: string, eyebrow?: string): ChapterContent {
  return {
    eyebrow,
    title,
    dek: 'Content for this page is in progress. Check back soon.',
    hero: {
      heading: 'Step Inside',
      body: '<p>This section is being prepared. The framework section here will follow the same structure as Chapter 1.</p>',
    },
    actionPlan: {
      heading: 'Action Plan',
      columnLeftTitle: 'Coming soon',
      columnLeft: '<p>Placeholder — left column.</p>',
      columnRightTitle: 'Coming soon',
      columnRight: '<p>Placeholder — right column.</p>',
    },
    tools: {
      heading: 'Tools and templates for this section will appear here.',
      body: '<p>Worksheets and downloadable resources are in development.</p>',
    },
  };
}
