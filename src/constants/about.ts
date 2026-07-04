export const aboutContent = {
  main: `[EDIT: One strong first-person paragraph — who you are, what you build, and what you're looking for (full-time, contract, or both). Keep it specific, not generic.]`,
  supporting: `[EDIT: What draws you to building software and AI products — the kinds of problems you like, what you're exploring now in AI, and how you work with teams or clients.]`,
};

export const trustStrip = {
  ownership: "End-to-End Product Ownership",
  delivery: "Production Applications Shipped",
  expertise: "Full-Stack • Cloud • AI Engineering",
};

export type TechStackItem = {
  name: string;
};

export type TechStackGroup = {
  id: "ship" | "scale" | "ai";
  label: string;
  description: string;
  items: TechStackItem[];
};

export const techStack: TechStackGroup[] = [
  {
    id: "ship",
    label: "Ship products with",
    description:
      "Languages and frameworks I reach for when building features end-to-end.",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "Python" },
      { name: "PostgreSQL" },
    ],
  },
  {
    id: "scale",
    label: "Scale and deploy with",
    description:
      "Infrastructure and tooling that keeps products reliable in production.",
    items: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "CI/CD" },
      { name: "Vercel" },
      { name: "Redis" },
      { name: "Linux" },
    ],
  },
  {
    id: "ai",
    label: "Increasingly building with",
    description:
      "AI tooling I'm actively learning and applying to real product problems.",
    items: [
      { name: "OpenAI API" },
      { name: "LangChain" },
      { name: "RAG pipelines" },
      { name: "Vector DBs" },
      { name: "Prompt engineering" },
      { name: "Fine-tuning" },
    ],
  },
];

export const principles = [
  {
    title: "Clarity Before Code",
    description:
      "I spend time defining data models, system boundaries, and api contracts before writing code. A clear model prevents downstream implementation bugs.",
  },
  {
    title: "Production Mindset First",
    description:
      "No feature is complete without logging, error boundaries, unit tests, and performance profiles. Writing code is only half the battle.",
  },
  {
    title: "Pragmatic Tool Selection",
    description:
      "I choose boring, stable technologies unless the problem domain specifically demands a specialized tool. Reliable architecture minimizes operations overhead.",
  },
  {
    title: "Iterative Refinement",
    description:
      "I believe in shipping working micro-features early to solicit user feedback, then refactoring and optimizing performance under real workloads.",
  },
];
