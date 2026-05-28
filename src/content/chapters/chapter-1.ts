// Chapter 1 — Stuck in the Mud with No Traction
// Content ported from the existing Right-Sized Framework page.
// To create another chapter, copy this file as chapter-N.ts and edit.

import type { ChapterContent } from './_types';

export const chapter1: ChapterContent = {
  eyebrow: 'Chapter 1',
  title: 'Stuck in the Mud with No Traction',
  dek: 'You can feel a capable team working harder every week while progress quietly slips. The issue isn\'t talent — it\'s the system. This chapter is the turning point.',

  buttons: [
    { label: 'Step Inside',           href: '#hero',       variant: 'primary' },
    { label: 'Take the Assessment',   href: '#assessment-ch1', variant: 'ghost' },
    { label: 'Jump to References',    href: '#references', variant: 'ghost' },
  ],

  hero: {
    eyebrow: 'Step Inside',
    heading: "I've been there.",
    body: `
      <p>Watching a capable team work harder each week while progress quietly slips. Plans expand. Dependencies multiply. Confidence erodes. Not because the team lacks talent — but because the system isn't supporting the work.</p>

      <p>I know that pain. And more importantly, I can show you a better way forward.</p>

      <p><strong>The Right-Sized Framework</strong> is a practical approach to escaping chaos without burying teams in bureaucracy. It was shaped through wins and hard lessons across aerospace, defense, and advanced technology programs — where the difference between success and failure was rarely the idea. It was the system that connected vision to delivery.</p>

      <p>At its core is a six-phase product development cycle:</p>

      <ul>
        <li><strong>Product–Market Fit</strong> ensures you are solving a real problem</li>
        <li><strong>Plan</strong> aligns teams around achievable direction</li>
        <li><strong>Design</strong> turns intent into executable solutions</li>
        <li><strong>Build</strong> converts effort into working capability</li>
        <li><strong>Test</strong> exposes risk before it becomes failure</li>
        <li><strong>Release</strong> delivers value and informs the next cycle</li>
      </ul>

      <p>Each phase exists for a reason. Together, they create momentum instead of friction.</p>

      <p>If you recognize overbuilt MVPs, meetings without clarity, and schedules that slip quietly, this chapter is your turning point. You will see how to right-size rigor, establish a fast and sustainable cadence, and align leaders, engineers, and customers around measurable outcomes.</p>
    `,
    image: '/images/chapter-1/hero.jpg',
    imageAlt: 'Whiteboard planning with sticky notes',
  },

  actionPlan: {
    eyebrow: 'Action Plan',
    heading: 'Four moves that change the trajectory.',
    image: '/images/chapter-1/action-plan.webp',
    imageAlt: 'Team brainstorming with colorful notes — vision to MVP, turning clarity into motion.',
    imagePosition: 'top',
    columnLeftTitle: 'Diagnose & learn',
    columnLeft: `
      <ol>
        <li>
          <strong>Take the RSF Assessment.</strong>
          Identify where your organization is performing well and where structural constraints are limiting progress.
        </li>
        <li>
          <strong>Read the Book.</strong>
          Build a clear understanding of the framework, its intent, and how each phase connects vision to execution.
        </li>
      </ol>
    `,
    columnRightTitle: 'Deploy & lead',
    columnRight: `
      <ol start="3">
        <li>
          <strong>Engage Your Team.</strong>
          Direct your section leads to this site to access practical tools, templates, and guidance they can implement immediately.
        </li>
        <li>
          <strong>Lead Deliberately.</strong>
          High-performing systems require aligned leadership. Develop your ability to guide teams, integrate stakeholders, and sustain disciplined execution over time.
        </li>
      </ol>
    `,
  },

  tools: {
    eyebrow: 'Directed Tools & Templates',
    heading: 'Apply the framework this week.',
    body: '<p>Every chapter ships with tools you can put to work immediately. Start with whichever matches where you are right now.</p>',
    image: '/images/chapter-1/tools.jpg',
    imageAlt: 'Blueprints and laptops around a table — systems thinking, interfaces, integration.',
    tools: [
      { label: 'Take the Self-Scoring Assessment',  href: '/self-assessment/',  meta: 'Interactive · 5 min' },
      { label: 'Take the AI-Powered Assessment',    href: '/ai-assessment/',    meta: 'Deeper insights' },
      { label: 'Download a Chapter 1 Synopsis',     href: '/chapter-1-summary/', meta: 'PDF · concise' },
      { label: 'Download a Free Chapter',           href: '/free-chapter/',     meta: 'PDF · full chapter' },
    ],
  },

  // Likert 1–5 assessment, ported from the existing Wix page.
  assessment: {
    assessmentId: 'ch1',
    eyebrow: 'Executive Product Development Assessment',
    heading: 'Right-Sized Framework Executive Self-Assessment',
    intro: 'Most organizations do not struggle because they lack intelligence or effort. They struggle because one structural dimension is quietly constraining velocity. This assessment helps you identify that constraint.',
    externalUrl: 'https://www.rightsizedframework.com/RSFassessment',
    image: '/images/chapter-1/quiz.webp',
    imageAlt: 'Hands-on electronics build and test on a bench.',
    sections: [
      {
        title: 'Section 1: Product–Market Fit (PMF)',
        shortTitle: 'Product–Market Fit',
        max: 35,
        bands: [
          { min: 30, max: 35, label: 'Top 25%',    text: 'Market validation drives decisions.' },
          { min: 20, max: 29, label: 'Middle 50%', text: 'Alignment exists but assumptions may remain.' },
          { min:  7, max: 19, label: 'Bottom 25%', text: 'Lack of market clarity is a significant risk.' },
        ],
        questions: [
          'Our product vision is grounded in validated customer needs.',
          'We clearly define our target customer before major development begins.',
          'We test concepts with real customers prior to full investment.',
          'Sales, marketing, and engineering share a unified value proposition.',
          'We validate demand before scaling development or production.',
          'Customer feedback directly influences product decisions.',
          'We track engagement, adoption, and retention metrics.',
        ],
      },
      {
        title: 'Section 2: Program Leadership & Execution',
        shortTitle: 'Program Leadership & Execution',
        max: 35,
        bands: [
          { min: 30, max: 35, label: 'Top 25%',    text: 'Execution discipline supports predictable growth.' },
          { min: 20, max: 29, label: 'Middle 50%', text: 'Structure works but may erode under pressure.' },
          { min:  7, max: 19, label: 'Bottom 25%', text: 'Execution instability is limiting performance.' },
        ],
        questions: [
          'Leadership sets clear priorities aligned with strategy.',
          'We maintain a disciplined monthly rhythm that drives predictable progress.',
          'Risks are identified early and actively managed.',
          'Scope changes are controlled and deliberate.',
          'Budget and schedule estimates are realistic.',
          'Cross-functional communication is clear and consistent.',
          'Projects meet milestones without recurring crisis behavior.',
        ],
      },
      {
        title: 'Section 3: Systems Engineering Discipline',
        shortTitle: 'Systems Engineering',
        max: 35,
        bands: [
          { min: 30, max: 35, label: 'Top 25%',    text: 'Technical rigor protects product integrity.' },
          { min: 20, max: 29, label: 'Middle 50%', text: 'Discipline exists but may be inconsistent.' },
          { min:  7, max: 19, label: 'Bottom 25%', text: 'Weak structure may be driving rework or instability.' },
        ],
        questions: [
          'System requirements are defined clearly before development.',
          'We maintain traceability from need through test.',
          'Integration is planned early, not left to the end.',
          'Entry and exit criteria are defined for major reviews.',
          'Verification and validation occur before release.',
          'Technical risk is systematically assessed and consciously reduced.',
          'Modeling and analysis are used appropriately without bureaucracy.',
        ],
      },
      {
        title: 'Section 4: Design & Build Effectiveness',
        shortTitle: 'Design & Build',
        max: 25,
        bands: [
          { min: 21, max: 25, label: 'Top 25%',    text: 'Design converts plans into working product efficiently.' },
          { min: 14, max: 20, label: 'Middle 50%', text: 'Friction or iteration delays reduce velocity.' },
          { min:  5, max: 13, label: 'Bottom 25%', text: 'Reactive design may be causing late-stage crises.' },
        ],
        questions: [
          'We prototype and test early.',
          'Design revisions are driven by data, not opinion.',
          'Engineering collaborates effectively with adjacent functions.',
          'Our development cycle follows structured phases and review discipline.',
          'Rework is identified early and does not cascade into late crises.',
        ],
      },
      {
        title: 'Section 5: Metrics & Release Readiness',
        shortTitle: 'Metrics & Release',
        max: 25,
        bands: [
          { min: 21, max: 25, label: 'Top 25%',    text: 'Data drives decisions and releases are disciplined.' },
          { min: 14, max: 20, label: 'Middle 50%', text: 'Metrics exist but may not consistently shape behavior.' },
          { min:  5, max: 13, label: 'Bottom 25%', text: 'Decisions may rely more on intuition than evidence.' },
        ],
        questions: [
          'We use leading and lagging metrics to measure real progress.',
          'Metrics are reviewed regularly and drive decisions.',
          'Release decisions follow defined quality criteria.',
          'Internal teams are trained before launch.',
          'Customers can achieve value quickly after release.',
        ],
      },
    ],
  },

  references: [
    { type: 'book',    title: 'The Lean Startup',                                      authors: 'Eric Ries' },
    { type: 'book',    title: 'Inspired: How to Create Products Customers Love',      authors: 'Marty Cagan' },
    { type: 'book',    title: 'Good to Great',                                        authors: 'Jim Collins' },
    { type: 'book',    title: 'Measure What Matters',                                 authors: 'John Doerr' },
    { type: 'book',    title: 'Scrum: The Art of Doing Twice the Work in Half the Time', authors: 'Jeff Sutherland' },
    { type: 'book',    title: 'The Hard Thing About Hard Things',                    authors: 'Ben Horowitz' },
    { type: 'article', title: 'NASA Systems Engineering Handbook',                   url: 'https://www.nasa.gov/connect/ebooks/nasa-systems-engineering-handbook/' },
    { type: 'video',   title: 'The Knowledge Project',                               url: 'https://fs.blog/knowledge-project-podcast/' },
    { type: 'video',   title: 'Masters of Scale',                                    url: 'https://mastersofscale.com/' },
  ],
};
