export const aboutContent = {
  main: `I am Sachin Tadkale, a software engineer who enjoys building full-stack applications that solve real problems and make everyday work a little easier. I especially enjoy automating repetitive tasks and turning ideas into products people can rely on. My long-term goal is simple: build software that people genuinely find useful, contribute to open source, and create products that make a positive impact.`,
  supporting: `Recently, I've been focused on AI engineering and building domain-specific AI assistants that help people with real tasks—not just general conversations. I'm fascinated by how AI is changing the way we work, learn, and solve problems, and I enjoy exploring technologies like tool calling, RAG, LangChain, and agentic systems to build practical, intelligent software.`,
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
    label: "Application Development",
    description: "Frameworks and languages I use to build modern applications.",
    items: [
      { name: "Angular" },
      { name: "Bootstrap" },
      { name: "FastAPI" },
      { name: "Flutter" },
      { name: "Java" },
      { name: "MySQL" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "Python" },
      { name: "React" },
      { name: "Spring Boot" },
      { name: "TypeScript" },
    ],
  },
  {
    id: "scale",
    label: "Infrastructure & Deployment",
    description:
      "Cloud services, tooling, and platforms used to deploy and operate software.",
    items: [
      { name: "AWS" },
      { name: "Cloudflare" },
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Kubernetes" },
      { name: "Redis" },
      { name: "Vercel" },
    ],
  },
  {
    id: "ai",
    label: "AI & Intelligent Systems",
    description:
      "Technologies I'm using to build and explore AI-powered applications.",
    items: [
      { name: "Chroma" },
      { name: "Hugging Face" },
      { name: "LangChain" },
      { name: "Ollama" },
      { name: "OpenAI API" },
      { name: "Pinecone" },
      { name: "RAG pipelines" },
    ],
  },
];

export const principles = [
  {
    title: "Think Before Building",
    description:
      "I like to understand the problem before jumping into code. A little planning early usually saves a lot of rework later.",
  },
  {
    title: "Keep It Simple",
    description:
      "I prefer simple, readable code over clever solutions. Clear logic is easier to maintain, debug, and improve as products grow.",
  },
  {
    title: "Learn Every Project",
    description:
      "Every project teaches me something new. I take those lessons forward to build better software with every project.",
  },
  {
    title: "Improve Continuously",
    description:
      "I don't expect the first version to be perfect. I build, gather feedback, and keep improving through small, meaningful iterations.",
  },
];
