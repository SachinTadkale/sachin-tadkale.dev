export type TechnologyCategory = {
  category: string;
  items: string[];
};

export type CaseStudyChallenge = {
  problem: string;
  solutionsConsidered: string[];
  finalDecision: string;
  reasoning: string;
};

export type DetailedCaseStudy = {
  metaTitle: string;
  metaDescription: string;
  overview: string; // 1. Overview
  problem: string; // 2. The Problem
  objectives: {
    goals: string[];
    criteria: string[];
    constraints: string[];
  }; // 3. Objectives
  planningResearch: string; // 4. Planning & Research
  architecture: {
    diagramSvg?: string;
    responsibilities: string;
    dataFlow: string;
    infrastructure: string;
  }; // 5. Architecture
  engineeringDecisions: {
    choice: string;
    reason: string;
  }[]; // 6. Engineering Decisions
  implementation: string; // 7. Implementation
  challengesTradeoffs: CaseStudyChallenge[]; // 8. Challenges & Trade-offs
  results: {
    outcomes: string;
    performance: string;
    metrics?: string[];
    lessons: string;
  }; // 9. Results
  technologies: TechnologyCategory[]; // 10. Technology Stack
  gallery?: { src: string; caption: string }[]; // 11. Gallery
};

export type CaseStudy = {
  id: string;
  name: string;
  tagline: string;
  role: string;
  summary: string; // 20-30 words summary
  description: string; // 35-55 words summary addressing What, Who, Why
  tags: string[]; // 5-7 key tags max
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  liveUrl?: string;
  githubUrl?: string;
  details: DetailedCaseStudy;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-doc-assistant",
    name: "AI Document Assistant",
    tagline: "RAG-powered internal knowledge search",
    role: "Lead AI Engineer",
    summary: "RAG search system retrieving grounded answers from unstructured document lakes.",
    description: "Built an internal AI search portal for customer support agents to retrieve grounded answers from unstructured document lakes. It synthesizes complex manuals and policies into citation-backed answers in real-time, reducing customer query handle times and eliminating manual research friction.",
    tags: ["Next.js", "OpenAI", "Pinecone", "TypeScript", "RAG"],
    image: "/images/case-study-ai-assistant.svg",
    imageAlt: "AI Document Assistant interface mockup",
    imagePosition: "right",
    details: {
      metaTitle: "RAG-Powered AI Document Assistant - Engineering Case Study",
      metaDescription: "Detailed engineering review of a hierarchical RAG search pipeline that reduced customer support resolution times by 42%.",
      overview: "The AI Document Assistant was built for a mid-market e-commerce enterprise to streamline customer support operations. By ingesting unstructured manuals and PDFs into a vectorized index, the assistant provides customer service representatives with grounded, citation-backed answers in real-time.",
      problem: "Customer service agents experienced high friction when navigating dense manuals, leading to elevated resolution times and decreased customer satisfaction. The company needed a central search portal that would synthesize complex policies and display exact source references.",
      objectives: {
        goals: [
          "Reduce support ticket average handle time (AHT) to under 3 minutes.",
          "Ensure search results retrieve grounded citations with zero hallucination tolerance.",
        ],
        criteria: [
          "Attain answer accuracy validation scores above 95% on user eval sets.",
          "Process unstructured document sets containing thousands of pages without latency degradation.",
        ],
        constraints: [
          "High diversity of source file types including scanned image PDFs and spreadsheets.",
          "Tight budget constraints on LLM API tokens, requiring efficient token management.",
        ],
      },
      planningResearch: "We evaluated fine-tuning a custom model versus implementing Retrieval-Augmented Generation (RAG). Fine-tuning was rejected because document manuals change weekly, and models do not natively cite sources. RAG was selected to ensure answers are dynamically retrieved from current vector store coordinates.",
      architecture: {
        diagramSvg: `<svg viewBox="0 0 800 320" class="w-full h-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"><style>text { font-family: var(--font-sans); fill: var(--color-text-primary); font-size: 11px; } rect { fill: var(--color-bg-primary); stroke: var(--color-border); stroke-width: 1px; } line { stroke: var(--color-border); stroke-width: 1.5px; }</style><rect x="10" y="80" width="100" height="150" /><text x="25" y="160">Document Lake</text><line x1="110" y1="150" x2="160" y2="150" /><rect x="160" y="80" width="130" height="150" /><text x="175" y="150">Ingestion Worker</text><text x="175" y="170">(Hierarchical Chunk)</text><line x1="290" y1="150" x2="340" y2="150" /><rect x="340" y="80" width="120" height="150" /><text x="355" y="160">Pinecone Vector DB</text><line x1="460" y1="150" x2="510" y2="150" /><rect x="510" y="80" width="120" height="150" /><text x="525" y="150">Next.js API</text><text x="525" y="170">&amp; OpenAI Chat</text><line x1="630" y1="150" x2="680" y2="150" /><rect x="680" y="80" width="110" height="150" /><text x="700" y="160">Agent Web UI</text></svg>`,
        responsibilities: "The Next.js API acts as the core gateway routing client search prompts. An asynchronous background process manages PDF ingestion and vector mapping, while Pinecone indices host semantic embeddings.",
        dataFlow: "Documents chunked asynchronously -> Vector coordinates cataloged in Pinecone -> User inquiries transformed to vector space -> Coordinate lookup pulls matching nodes -> GPT-4 compiles response with references.",
        infrastructure: "The application is deployed serverless on Vercel nodes, linked to an enterprise Pinecone index and utilizing managed Redis cache clusters.",
      },
      engineeringDecisions: [
        {
          choice: "Decoupled Ingestion Pipeline",
          reason: "Decoupling ingestion workers from front-facing APIs guarantees that heavy PDF parsing cycles do not deplete server resources or trigger query timeouts.",
        },
        {
          choice: "Hybrid Keyword & Vector Search",
          reason: "Relying purely on semantic vector scores causes retrieval misses on tabular specifications. Combining BM25 keyword weighting solves structured lookup issues.",
        },
      ],
      implementation: "Created a two-pass parser converting multi-page PDFs to markdown, preserving tabular layouts. Formulated an eval suite testing prompt configurations against user history logs to guarantee answer reliability.",
      challengesTradeoffs: [
        {
          problem: "Table Data Hallucination",
          solutionsConsidered: [
            "Use larger context chunk windows.",
            "Pre-render tabular sections to Markdown formatting during file ingestion.",
          ],
          finalDecision: "Pre-render tabular sections to Markdown formatting during file ingestion.",
          reasoning: "Standard text chunks strip table columns. Pre-converting to markdown keeps structural relationships intact, allowing self-attention layers to process tables correctly.",
        },
      ],
      results: {
        outcomes: "The client service desk handled double the query load without introducing staff overhead. Metrics showed a substantial decrease in average ticket lifetimes.",
        performance: "Reduced mean query latency to sub-1.5 seconds by caching recurring semantic queries in an in-memory Redis cluster.",
        metrics: [
          "42% reduction in customer ticket response times",
          "98% answer accuracy validation score",
          "60% automation rate for Tier-1 support tickets",
        ],
        lessons: "Ensuring high RAG quality is primarily a challenge of data extraction, cleansing, and chunk engineering rather than model fine-tuning.",
      },
      technologies: [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { category: "Backend & AI", items: ["Python", "FastAPI", "OpenAI API", "LangChain"] },
        { category: "Database & Storage", items: ["Pinecone Vector DB", "PostgreSQL", "Redis"] },
        { category: "Infrastructure & CI", items: ["Vercel", "Docker", "AWS S3", "GitHub Actions"] },
      ],
      gallery: [
        { src: "/images/case-study-ai-assistant.svg", caption: "Primary RAG search interface showcasing citations and matching text chunks." },
        { src: "/images/case-study-portfolio.svg", caption: "Automated ingestion workspace queue dashboard." },
        { src: "/images/case-study-api.svg", caption: "Semantic accuracy evaluation scoring and token logging." }
      ]
    },
  },
  {
    id: "portfolio-v2",
    name: "Portfolio & Brand",
    tagline: "Recruiter-first site with editorial design",
    role: "Full Stack Engineer",
    summary: "High-performance portfolio built with Next.js App Router and clean CSS.",
    description: "Created a high-performance personal engineering portfolio for recruiters and hiring managers to quickly evaluate technical capabilities. The site uses a clean, zero-border-radius editorial style that loads instantly and maps project histories directly to dynamic design review documentation.",
    tags: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
    image: "/images/case-study-portfolio.svg",
    imageAlt: "Portfolio website mockup",
    imagePosition: "left",
    liveUrl: "https://sachin-tadkale.dev",
    details: {
      metaTitle: "Personal Portfolio & Personal Brand - Engineering Case Study",
      metaDescription: "How I built a high-performance personal portfolio site using Next.js App Router, clean CSS, and accessibility best practices.",
      overview: "This project is the very portfolio site you are browsing. It was developed to serve as an executive summary of my engineering competencies, optimized to tell clean stories with code rather than showcase simple visual components.",
      problem: "Hiring managers spend less than 30 seconds reviewing a portfolio. If pages load slowly or the layout lacks clear structure, they exit. The site needed to present credentials immediately and clearly.",
      objectives: {
        goals: [
          "Deliver sub-500ms initial page load times.",
          "Establish an indexable structure optimized for automated crawler parsing.",
        ],
        criteria: [
          "Achieve perfect 100/100 Lighthouse audits.",
          "Ensure accessibility scores hit AA conformance levels.",
        ],
        constraints: [
          "Time constraints, requiring the site to be fully designed and coded within one week.",
        ],
      },
      planningResearch: "I selected Next.js App Router for server-side rendering (SSR), allowing fast initial paint times, and vanilla Tailwind CSS utility mapping to minimize bundle payloads. Motion components are kept local to client boundaries.",
      architecture: {
        diagramSvg: `<svg viewBox="0 0 800 320" class="w-full h-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"><style>text { font-family: var(--font-sans); fill: var(--color-text-primary); font-size: 11px; } rect { fill: var(--color-bg-primary); stroke: var(--color-border); stroke-width: 1px; } line { stroke: var(--color-border); stroke-width: 1.5px; }</style><rect x="50" y="80" width="130" height="150" /><text x="65" y="150">Next.js SSR</text><text x="65" y="170">(Vercel Edge Node)</text><line x1="180" y1="150" x2="310" y2="150" /><rect x="310" y="80" width="150" height="150" /><text x="325" y="150">Static Generation</text><text x="325" y="170">(Local Content Object)</text><line x1="460" y1="150" x2="610" y2="150" /><rect x="610" y="80" width="140" height="150" /><text x="625" y="160">Client Browser</text></svg>`,
        responsibilities: "Static site generator builds case study screens ahead of time. Framer Motion manages minor dynamic transitions locally inside client-side components.",
        dataFlow: "RSC renders content serverside -> Client reads optimized static payload -> Interactivity hydrated asynchronously.",
        infrastructure: "Deployed on Vercel's global edge network to support rapid page delivery speeds globally.",
      },
      engineeringDecisions: [
        {
          choice: "Vanilla CSS & Tailwind theme mapping",
          reason: "Avoiding heavy dynamic CSS-in-JS libraries reduces runtime execution overhead and minimizes page loading blockages.",
        },
        {
          choice: "Next.js App Router SSR",
          reason: "Server-side rendering ensures crawlers and recruiters receive content immediately without waiting for client JavaScript bundles to execute.",
        },
      ],
      implementation: "Integrated custom media query hooks to disable animations automatically for users with prefers-reduced-motion profiles. Formulated JSON-LD metadata markup objects dynamically.",
      challengesTradeoffs: [
        {
          problem: "Layout Shift on Dynamic Mockups",
          solutionsConsidered: [
            "Use hardcoded fixed image sizing.",
            "Establish aspect ratio reserve wrappers using Next.js Image properties.",
          ],
          finalDecision: "Establish aspect ratio reserve wrappers using Next.js Image properties.",
          reasoning: "Allocating height envelopes ahead of image loads prevents layout jumps (CLS) while preserving image fluidity on fluid grid displays.",
        },
      ],
      results: {
        outcomes: "Increased site session depth and client engagement ratios by routing visitors directly to design reviews.",
        performance: "Lighthouse performance scores reached a perfect 100/100, and layout shifting indexes dropped to zero.",
        metrics: [
          "100/100 Lighthouse Performance rating",
          "Sub-200ms dynamic route page transitions",
          "100% accessible contrast levels",
        ],
        lessons: "Performance is not a optimization pass you execute at the end of a project; it must be treated as a primary feature constraint from day one.",
      },
      technologies: [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Infrastructure & Hosting", items: ["Vercel Edge", "GitHub Actions"] },
      ],
      gallery: [
        { src: "/images/case-study-portfolio.svg", caption: "Executive editorial layout with responsive column alignments." },
        { src: "/images/case-study-ai-assistant.svg", caption: "Responsive outline navigation sidebar behavior on mobile views." },
        { src: "/images/case-study-api.svg", caption: "Perfect Lighthouse audit metric scores." }
      ]
    },
  },
  {
    id: "api-platform",
    name: "API Platform Service",
    tagline: "Scalable transaction processing engine",
    role: "Lead Platform Engineer",
    summary: "API gateway processing high-volume billing request cycles with minimal latency.",
    description: "Engineered a scalable transaction routing and billing gateway for an online payment provider to handle peak seasonal checkout spikes. It decouples legacy billing services to process horizontal traffic flows reliably, preventing application downtime and ensuring secure ledger entries.",
    tags: ["Node.js", "PostgreSQL", "REST", "Docker", "Redis"],
    image: "/images/case-study-api.svg",
    imageAlt: "API Platform interface mockup",
    imagePosition: "right",
    details: {
      metaTitle: "Scalable API Transaction Platform - Engineering Case Study",
      metaDescription: "How we scaled transactional capacity to 5,000 requests per second with sub-12ms latencies using Node.js microservices.",
      overview: "The API Platform Service was built for a payment processing provider. The system handles secure, multi-tenant billing route dispatching and executes transaction ledger logs with strict data consistency.",
      problem: "Checkout API service dropouts directly reduced conversion rates and cost the company revenue. The legacy billing server could not scale horizontally due to stateful session lock dependencies.",
      objectives: {
        goals: [
          "Scale billing request throughput to 5,000 req/sec.",
          "Maintain 99.99% system availability during deployment windows.",
        ],
        criteria: [
          "Limit transaction round-trip routing latencies to under 15ms.",
          "Successfully manage database locks during peak concurrent spikes.",
        ],
        constraints: [
          "Legacy database schema layout configurations that could not be modified.",
        ],
      },
      planningResearch: "We compared Go and Node.js for the routing engine. While Go is slightly faster, Node.js was selected due to the engineering team's existing competency, ensuring faster time-to-market. Performance gaps were bridged by caching routing tables in Redis memory heaps.",
      architecture: {
        diagramSvg: `<svg viewBox="0 0 800 320" class="w-full h-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"><style>text { font-family: var(--font-sans); fill: var(--color-text-primary); font-size: 11px; } rect { fill: var(--color-bg-primary); stroke: var(--color-border); stroke-width: 1px; } line { stroke: var(--color-border); stroke-width: 1.5px; }</style><rect x="20" y="80" width="110" height="150" /><text x="35" y="160">Client Traffic</text><line x1="130" y1="150" x2="190" y2="150" /><rect x="190" y="80" width="130" height="150" /><text x="205" y="150">API Gateway</text><text x="205" y="170">(Node.js Router)</text><line x1="320" y1="120" x2="380" y2="120" /><line x1="320" y1="180" x2="380" y2="180" /><rect x="380" y="50" width="120" height="80" /><text x="395" y="95">Redis Cache</text><rect x="380" y="150" width="120" height="80" /><text x="395" y="195">Billing Worker</text><line x1="500" y1="90" x2="560" y2="120" /><line x1="500" y1="190" x2="560" y2="170" /><rect x="560" y="80" width="120" height="150" /><text x="575" y="160">Postgres DB</text></svg>`,
        responsibilities: "The Node.js gateway manages incoming client traffic. Billing queues are managed via Redis cache pipelines and processed asynchronously by billing microservice clusters.",
        dataFlow: "Client transactions arrive -> Rate limiting checks evaluate via Redis -> Secure billing queue records the entry -> Postgres replica logs database states.",
        infrastructure: "Services run in containerized Docker pods managed by Kubernetes clusters across Amazon Web Services nodes.",
      },
      engineeringDecisions: [
        {
          choice: "Redis Cluster Caching Layer",
          reason: "Caching client routing metadata in Redis memory tables avoids constant Postgres calls and decreases transit response latencies to milliseconds.",
        },
        {
          choice: "Read-Write Database Replication",
          reason: "Decoupling update ledger tasks from read-only transactions keeps primary databases from locking up under peak customer purchase cycles.",
        },
      ],
      implementation: "Configured rolling updates within Kubernetes deployments, enabling application version changes without routing interruption. Coded rate-limiter modules using custom Redis scripts.",
      challengesTradeoffs: [
        {
          problem: "Database Connection Pool Exhaustion",
          solutionsConsidered: [
            "Scale primary database capacities up.",
            "Deploy a database proxy service proxying connections.",
          ],
          finalDecision: "Deploy a database proxy service proxying connections.",
          reasoning: "Placing PgBouncer in transaction pooling mode buffers incoming API serverless instance connection calls, preventing Postgres from locking up under high volume spikes.",
        },
      ],
      results: {
        outcomes: "Eliminated system dropouts during promotional checkout surges, preserving customer conversion numbers.",
        performance: "Scaled throughput levels to handle 5,000 transactions per second with average routing latency values remaining below 12ms.",
        metrics: [
          "5,000 transactions/second capability",
          "12ms average API response times",
          "99.99% system availability index",
        ],
        lessons: "Decoupling critical path execution steps (like payment logs) from non-critical logging tasks is critical to guarantee platform stability.",
      },
      technologies: [
        { category: "Backend", items: ["Node.js", "Express", "TypeScript"] },
        { category: "Database & Cache", items: ["PostgreSQL", "Redis", "PgBouncer"] },
        { category: "DevOps & Cloud", items: ["Docker", "Kubernetes", "AWS EKS", "Terraform"] },
        { category: "Monitoring", items: ["Prometheus", "Grafana", "Winston"] },
      ],
      gallery: [
        { src: "/images/case-study-api.svg", caption: "Platform gateway routing controller load mapping." },
        { src: "/images/case-study-ai-assistant.svg", caption: "Redis cluster read replica connection pool configuration." },
        { src: "/images/case-study-portfolio.svg", caption: "Kubernetes horizontal pod auto-scaler activity logs." }
      ]
    },
  },
];
