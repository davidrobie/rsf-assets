// Innovation Hub pages — same structure as chapters but separate domain.

export interface HubMeta {
  slug: string;
  title: string;
}

export const hubs: HubMeta[] = [
  { slug: 'change',          title: 'Change Self-Assessment' },
  { slug: 'vision',          title: 'Vision Hub' },
  { slug: 'pmf',             title: 'PMF Hub' },
  { slug: 'reviews',         title: 'Review Hub' },
  { slug: 'productdevcycle', title: 'Product Development Cycle Hub' },
  { slug: 'plan',            title: 'Plan Hub' },
  { slug: 'agile',           title: 'Agile Hub' },
  { slug: 'se',              title: 'SE Hub' },
  { slug: 'design',          title: 'Design Hub' },
  { slug: 'test',            title: 'Test Hub' },
  { slug: 'release',         title: 'Release Hub' },
  { slug: 'metrics',         title: 'Metrics Hub' },
];

export function hubBySlug(slug: string): HubMeta | undefined {
  return hubs.find(h => h.slug === slug);
}
