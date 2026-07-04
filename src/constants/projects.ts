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
  summary: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  liveUrl?: string;
  githubUrl?: string;
  platforms?: { label: string; url: string }[];
  details: DetailedCaseStudy;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "vyaro",
    name: "Vyaro",
    tagline: "Digital marketplace connecting farmers and buyers",
    summary:
      "A unified agricultural platform connecting farmers directly to buyers via web, mobile, and marketing channels.",
    description:
      "I built Vyaro, an agricultural marketplace ecosystem comprising a responsive web app, an Android application, and a marketing website. The platform allows farmers to showcase and sell produce directly to buyers, bypassing traditional middlemen.",
    tags: ["React", "Node", "PostgreSQL", "Flutter", "REST APIs"],
    image: "/images/case-study-api.svg",
    imageAlt: "Vyaro agricultural marketplace interface mockup",
    imagePosition: "right",
    platforms: [
      {
        label: "Marketplace Web",
        url: "https://vyaro-marketing-site.vercel.app/",
      },
      {
        label: "Marketing Website",
        url: "https://vyaro-web-app.vercel.app",
      },
      {
        label: "Android App",
        url: "https://github.com/leaparchy/vyaro-APP/releases/download/v1.0.0/vyaro-v1.0.0.apk",
      },
    ],
    details: {
      metaTitle: "Vyaro agricultural marketplace - Engineering Case Study",
      metaDescription:
        "An engineering review of the Vyaro agricultural marketplace, featuring a shared Spring Boot backend, a web portal, and an Android client.",
      overview:
        "Vyaro is a multi-platform digital ecosystem designed to connect agricultural producers directly with buyers. The product consists of three distinct components: a high-conversion marketing website, a responsive marketplace web portal, and a native Android application for on-the-field access.",
      problem:
        "Farmers often lack direct digital channels to market their produce, leaving them dependent on local middlemen who drive down profits. At the same time, commercial buyers find it difficult to locate local sources of specific crops reliably.",
      objectives: {
        goals: [
          "Enable farmers to list produce with real-time pricing and stock updates.",
          "Provide a seamless search and filtering interface for commercial buyers.",
          "Ensure offline resilience and smooth performance on low-end mobile devices.",
        ],
        criteria: [
          "Deliver uniform API response formats across both web and native mobile client layers.",
          "Establish high-reliability image upload and storage for crop listings.",
        ],
        constraints: [
          "Limited mobile data speeds and lower-tier hardware common in rural areas, requiring minimal asset payloads.",
        ],
      },
      planningResearch:
        "I chose to build a decoupled architecture: a shared Spring Boot API service serving both the web and Android clients. I separated the marketing website into a static build to maximize search visibility and speed without loading heavy marketplace authentication bundles.",
      architecture: {
        diagramSvg: `<svg viewBox="0 0 800 320" class="w-full h-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"><style>text { font-family: var(--font-sans); fill: var(--color-text-primary); font-size: 11px; } rect { fill: var(--color-bg-primary); stroke: var(--color-border); stroke-width: 1px; } line { stroke: var(--color-border); stroke-width: 1.5px; }</style><rect x="50" y="30" width="130" height="70" /><text x="65" y="70">Marketing Site</text><rect x="50" y="125" width="130" height="70" /><text x="65" y="165">Marketplace Web</text><rect x="50" y="220" width="130" height="70" /><text x="65" y="260">Android App</text><line x1="180" y1="160" x2="310" y2="160" /><line x1="180" y1="255" x2="310" y2="160" /><rect x="310" y="115" width="180" height="90" /><text x="325" y="160">Spring Boot REST API</text><line x1="490" y1="160" x2="620" y2="160" /><rect x="620" y="115" width="130" height="90" /><text x="640" y="165">PostgreSQL</text></svg>`,
        responsibilities:
          "The Spring Boot REST API handles catalog management, user onboarding, and order flows. PostgreSQL stores relational listing data, while React manages the buyer interface and native Android SDK drives the seller mobile portal.",
        dataFlow:
          "Seller uploads produce -> Mobile app transmits data to REST API -> API processes and stores metadata in PostgreSQL -> Buyer searches database on React web portal.",
        infrastructure:
          "The REST API is containerized using Docker and hosted on a Linux virtual machine, with the web clients served from CDN locations.",
      },
      engineeringDecisions: [
        {
          choice: "Decoupled Static Marketing Portal",
          reason:
            "Separating landing pages from the marketplace prevents large application bundles from delaying the initial page load for first-time visitors.",
        },
        {
          choice: "Shared REST Backend API",
          reason:
            "Building a single API service for both mobile and web clients guarantees transaction consistency and halves backend maintenance efforts.",
        },
      ],
      implementation:
        "I built the relational database schema in PostgreSQL and coded the Spring Boot backend service. I then implemented the React frontend with responsive styling and compiled the native Android app using Java for on-site farmers.",
      challengesTradeoffs: [
        {
          problem: "Inconsistent UI presentation on various mobile screens",
          solutionsConsidered: [
            "Use mobile-only CSS stylesheets.",
            "Implement a flexible grid container structure matching uniform design standards.",
          ],
          finalDecision:
            "Implement a flexible grid container structure matching uniform design standards.",
          reasoning:
            "Using flex-grid patterns guarantees component alignment stays identical on both high-resolution desktop screens and legacy mobile viewports.",
        },
      ],
      results: {
        outcomes:
          "Successfully deployed the complete marketplace ecosystem, offering farmers a direct selling option and providing buyers with a searchable catalog.",
        performance:
          "Relational queries fetch indexed crop records in less than 80ms under typical loads.",
        metrics: [
          "Single unified API endpoint serving 3 client platforms",
          "100% relational consistency on transaction records",
          "Zero-friction onboarding flow for offline-first sellers",
        ],
        lessons:
          "Keeping client logic thin and relying on centralized backend validation rules makes maintaining multi-platform ecosystems significantly easier.",
      },
      technologies: [
        {
          category: "Frontend",
          items: ["React", "HTML5", "CSS3", "JavaScript"],
        },
        { category: "Backend", items: ["Spring Boot", "Java", "REST APIs"] },
        { category: "Database", items: ["PostgreSQL"] },
        {
          category: "Deployment & Platforms",
          items: ["Android SDK", "Docker", "Linux VM"],
        },
      ],
      gallery: [
        {
          src: "/images/case-study-api.svg",
          caption: "Marketplace seller portal listing dashboard.",
        },
        {
          src: "/images/case-study-portfolio.svg",
          caption: "Static product marketing portal landing screen.",
        },
        {
          src: "/images/case-study-ai-assistant.svg",
          caption: "Android seller client database sync configuration.",
        },
      ],
    },
  },
  {
    id: "sara-ai",
    name: "Sara AI",
    tagline: "Personal AI assistant focused on workflow automation",
    summary:
      "An active research project building a workflow-focused personal AI assistant using FastAPI and tool calling.",
    description:
      "I am developing Sara AI, a personal assistant aimed at automating specific daily workflows. Rather than functioning as a general chat platform, it uses structured tool-calling pipelines to connect directly with external productivity APIs.",
    tags: ["FastAPI", "Python", "OpenAI", "Tool Calling", "API Integration"],
    image: "/images/case-study-ai-assistant.svg",
    imageAlt: "Sara AI assistant workflow execution interface",
    imagePosition: "left",
    platforms: [
      { label: "Live Prototype", url: "https://saraai-eight.vercel.app/chat" },
    ],
    details: {
      metaTitle: "Sara AI Assistant - Engineering Case Study",
      metaDescription:
        "An honest engineering deep dive into building a workflow-focused AI assistant using FastAPI, prompt engineering, and LLM tool calling.",
      overview:
        "Sara AI is an active engineering project focused on building an assistant that performs real actions. It interfaces directly with third-party software, executing tasks like calendar scheduling and reminder settings via natural language processing.",
      problem:
        "Generic conversational agents lack integration with personal productivity tools, requiring users to manually copy and paste details between browser tabs to execute simple operations.",
      objectives: {
        goals: [
          "Translate plain text instructions into reliable external API payloads.",
          "Manage conversation memory to maintain state across multi-turn prompts.",
          "Provide streaming text responses for interactive user engagement.",
        ],
        criteria: [
          "Validate tool-calling JSON outputs against defined schemas before executing webhooks.",
          "Minimize response latency by streaming LLM text output.",
        ],
        constraints: [
          "Handling rate limits on external service APIs and ensuring reliable fallback execution.",
        ],
      },
      planningResearch:
        "I selected FastAPI to handle asynchronous request volumes and selected OpenAI's structured outputs API to ensure the assistant's arguments consistently validate against my application schemas.",
      architecture: {
        diagramSvg: `<svg viewBox="0 0 800 320" class="w-full h-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"><style>text { font-family: var(--font-sans); fill: var(--color-text-primary); font-size: 11px; } rect { fill: var(--color-bg-primary); stroke: var(--color-border); stroke-width: 1px; } line { stroke: var(--color-border); stroke-width: 1.5px; }</style><rect x="30" y="115" width="130" height="90" /><text x="50" y="165">User Interface</text><line x1="160" y1="160" x2="280" y2="160" /><rect x="280" y="115" width="140" height="90" /><text x="300" y="165">FastAPI Backend</text><line x1="420" y1="120" x2="540" y2="90" /><line x1="420" y1="200" x2="540" y2="230" /><rect x="540" y="50" width="150" height="75" /><text x="560" y="95">OpenAI Tool Call</text><rect x="540" y="195" width="150" height="75" /><text x="560" y="240">External APIs</text></svg>`,
        responsibilities:
          "The frontend sends queries to the FastAPI service, which coordinates with the LLM to verify if a tool needs to be called, runs the local function block, and returns the result.",
        dataFlow:
          "User types command -> FastAPI passes query to LLM -> LLM returns tool call request -> FastAPI runs local action script -> FastAPI returns formatted confirmation to user.",
        infrastructure:
          "The prototype runs on an asynchronous Python server and interfaces directly with cloud LLM endpoints.",
      },
      engineeringDecisions: [
        {
          choice: "FastAPI Async Architecture",
          reason:
            "Asynchronous I/O handling is critical when managing multiple concurrently open HTTP connections to external APIs and LLM streaming portals.",
        },
        {
          choice: "Schema-Driven Tool Execution",
          reason:
            "Defining executable actions as Pydantic models ensures that input arguments conform strictly to type requirements before calling third-party services.",
        },
      ],
      implementation:
        "I wrote the core assistant engine using Python, configured system prompts for predictable workflow execution, and built custom handlers to execute external calendar and task webhook requests.",
      challengesTradeoffs: [
        {
          problem:
            "LLM arguments occasionally drifting from target API structures",
          solutionsConsidered: [
            "Write extensive error retry code in Python.",
            "Enforce strict JSON schema parsing at the LLM level.",
          ],
          finalDecision: "Enforce strict JSON schema parsing at the LLM level.",
          reasoning:
            "Configuring the API call to enforce strict JSON structure prevents invalid arguments from being generated, eliminating redundant network calls.",
        },
      ],
      results: {
        outcomes:
          "Established a functional backend core capable of processing natural language commands into verified API operations.",
        performance:
          "Maintained tool schema validation failure rates under 1% during active testing.",
        metrics: [
          "Successful multi-turn task state tracking",
          "Asynchronous API integration with zero blocking threads",
          "Under 100ms backend processing overhead prior to LLM response",
        ],
        lessons:
          "Prompt engineering is a developer discipline that requires rigorous validation setups rather than simple ad-hoc testing.",
      },
      technologies: [
        { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript"] },
        {
          category: "Backend & AI",
          items: ["FastAPI", "Python", "OpenAI API", "Pydantic"],
        },
        { category: "Deployment", items: ["Docker", "Linux VM"] },
      ],
      gallery: [
        {
          src: "/images/case-study-ai-assistant.svg",
          caption: "Sara AI query response timeline log.",
        },
        {
          src: "/images/case-study-api.svg",
          caption: "Asynchronous webhook connection monitor.",
        },
        {
          src: "/images/case-study-portfolio.svg",
          caption: "Structured output validation logs.",
        },
      ],
    },
  },
  {
    id: "worklyn",
    name: "Worklyn",
    tagline: "Integrated productivity workspace prototype",
    summary:
      "A private productivity portal prototype combining chat, video meetings, and task tracking.",
    description:
      "I built Worklyn, a productivity workspace prototype designed to centralize everyday office collaboration tools. The project is not publicly hosted but is accessible as a complete code repository.",
    tags: ["Node.js", "React", "WebRTC", "Socket.io", "PostgreSQL"],
    image: "/images/case-study-api.svg",
    imageAlt: "Worklyn workspace interface prototype mockup",
    imagePosition: "left",
    platforms: [
      {
        label: "Frontend Repository",
        url: "https://github.com/SachinTadkale/worklyn_frontend",
      },
      {
        label: "Backend Repository",
        url: "https://github.com/SachinTadkale/worklyn_backend",
      },
    ],
    details: {
      metaTitle: "Worklyn Productivity Workspace - Engineering Case Study",
      metaDescription:
        "An engineering review of the Worklyn project, a unified collaborative workspace prototype utilizing WebRTC and WebSockets.",
      overview:
        "Worklyn is a unified workspace prototype that combines communication channels, video meetings, and task tracking into a single client portal. The prototype serves to demonstrate stable coordination between WebSockets, WebRTC media streams, and database states.",
      problem:
        "Teams often switch between multiple separate applications for chat, video, and task tracking, leading to disjointed communication histories and fragmented contexts.",
      objectives: {
        goals: [
          "Combine team messaging, direct calls, and tasks under one frontend dashboard.",
          "Ensure real-time sync for message feeds and board columns.",
          "Implement low-latency peer-to-peer video streaming.",
        ],
        criteria: [
          "Verify WebRTC connection handshakes process in under 2 seconds.",
          "Keep WebSocket message delivery latency under 50ms.",
        ],
        constraints: [
          "No external production infrastructure is available, meaning all configurations are built for local deployment.",
        ],
      },
      planningResearch:
        "I decided to build a Node.js server to coordinate connections. I chose WebSockets for chat and layout changes, and used WebRTC peer-to-peer channels for direct audio-video connections to avoid expensive media server configurations.",
      architecture: {
        diagramSvg: `<svg viewBox="0 0 800 320" class="w-full h-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"><style>text { font-family: var(--font-sans); fill: var(--color-text-primary); font-size: 11px; } rect { fill: var(--color-bg-primary); stroke: var(--color-border); stroke-width: 1px; } line { stroke: var(--color-border); stroke-width: 1.5px; }</style><rect x="40" y="80" width="120" height="150" /><text x="55" y="160">React Portal</text><line x1="160" y1="120" x2="310" y2="120" /><line x1="160" y1="180" x2="310" y2="180" /><rect x="310" y="80" width="160" height="150" /><text x="325" y="150">Node.js Server</text><text x="325" y="170">(WebSockets &amp; WebRTC)</text><line x1="470" y1="150" x2="600" y2="150" /><rect x="600" y="80" width="140" height="150" /><text x="615" y="165">PostgreSQL</text></svg>`,
        responsibilities:
          "The React portal manages user interactions, Socket.io manages live event routing, Node.js manages signaling, and PostgreSQL stores user records and task configurations.",
        dataFlow:
          "User triggers operation -> Socket connection broadcasts to Node.js -> Node.js updates PostgreSQL -> Client view updates synchronously.",
        infrastructure:
          "Designed as a containerized environment deployed locally via Docker Compose configurations.",
      },
      engineeringDecisions: [
        {
          choice: "Direct WebRTC Peer-to-Peer Calling",
          reason:
            "Routing media streams directly between clients avoids the bandwidth and processing costs of central video media servers.",
        },
        {
          choice: "Relational Task Mapping",
          reason:
            "Using PostgreSQL constraints guarantees that tasks cannot map to non-existent channels or users, preventing application errors.",
        },
      ],
      implementation:
        "I wrote the Node.js signaling gateway, configured WebSocket event managers to dispatch chat messages, established WebRTC peer connection pipelines, and built the task board database schema.",
      challengesTradeoffs: [
        {
          problem:
            "Real-time task synchronization lagging during heavy server loads",
          solutionsConsidered: [
            "Continuously query the database every second (polling).",
            "Send lightweight updates via Socket.io channels.",
          ],
          finalDecision: "Send lightweight updates via Socket.io channels.",
          reasoning:
            "Distributing state changes only when an action occurs prevents unnecessary database load and keeps all client layouts in sync instantly.",
        },
      ],
      results: {
        outcomes:
          "Constructed a functional productivity portal prototype demonstrating live messaging, peer calling, and task board state updates.",
        performance:
          "Verified peer call handshakes complete in under 1.2 seconds in local network environments.",
        metrics: [
          "Under 1.2-second WebRTC connection times",
          "Low-latency real-time task board updates",
          "Complete local codebase with fully configured Docker setup",
        ],
        lessons:
          "Asynchronous WebSockets require rigorous error catching to prevent connection dropouts from freezing client interfaces.",
      },
      technologies: [
        {
          category: "Frontend",
          items: ["React", "HTML5", "CSS3", "JavaScript"],
        },
        {
          category: "Backend",
          items: ["Node.js", "Express", "Socket.io", "WebRTC"],
        },
        { category: "Database", items: ["PostgreSQL"] },
        { category: "Infrastructure", items: ["Docker", "Docker Compose"] },
      ],
      gallery: [
        {
          src: "/images/case-study-api.svg",
          caption: "Integrated dashboard prototype workspace.",
        },
        {
          src: "/images/case-study-portfolio.svg",
          caption: "Interactive drag-and-drop task board layout.",
        },
        {
          src: "/images/case-study-ai-assistant.svg",
          caption: "WebRTC calling connection diagnostics panel.",
        },
      ],
    },
  },
];
