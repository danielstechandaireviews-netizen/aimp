import type { Course } from "./types";

/**
 * Courses. Each entry generates /courses/[slug].
 *
 * - price: set per currency (CAD, USD, GBP, EUR). No live conversion happens.
 * - purchaseUrl: the Selfany product/checkout link for this course.
 * - rating: leave null until you have genuine reviews.
 * - Optional long-form "About this course" copy lives in
 *   src/content/courses/<slug>.mdx and is rendered when present.
 *
 * All prices below are SAMPLE PRICES — replace with your own.
 */
export const courses: Course[] = [
  // ─── AI Software Development ─────────────────────────────────────────
  {
    slug: "ai-software-development-bootcamp",
    title: "AI Software Development Bootcamp: Build & Ship AI Apps",
    subtitle:
      "Go from developer to AI builder: ship three AI apps and learn to sell AI software to small businesses.",
    area: "ai-software-development",
    level: "Intermediate",
    formats: ["Self-paced", "Live cohort"],
    duration: "8 weeks · ~60 hours",
    price: { CAD: 899, USD: 649, GBP: 519, EUR: 599 },
    purchaseUrl: "[SELFANY_COURSE_URL_AI_SOFTWARE_BOOTCAMP]",
    rating: null,
    featured: true,
    description:
      "A hands-on bootcamp for developers who want to build real AI products. You'll integrate LLM APIs, build RAG and tool-using features, design clean back ends and deploy everything to the cloud — finishing with a portfolio of shipped AI apps.",
    whoItsFor: [
      "Software developers who want to move into AI engineering",
      "Data professionals who want to build AI applications, not just analyses",
      "Technical founders building an AI product",
      "Bootcamp graduates who want an AI-focused portfolio",
    ],
    outcomes: [
      "Integrate OpenAI, Anthropic and open-source models into applications",
      "Design prompts, structured outputs and tool calls that behave reliably",
      "Build a RAG feature over your own documents",
      "Ship AI features behind a secure, rate-limited API",
      "Deploy a full-stack AI app with authentication",
      "Evaluate AI output quality and track cost per request",
    ],
    earnWith: [
      "Build AI chatbots and apps for small business clients",
      "Offer monthly maintenance and hosting retainers",
      "Launch your own AI micro-SaaS",
      "Apply for AI developer roles and contracts",
    ],
    prerequisites: [
      "Comfortable writing Python or JavaScript/TypeScript",
      "Basic understanding of APIs and JSON",
      "Git and a code editor installed",
    ],
    curriculum: [
      {
        title: "Module 1 — Foundations of AI Engineering",
        summary: "How LLMs work and how they fit into software systems.",
        lessons: [
          { title: "What an AI engineer actually does", duration: "20 min" },
          { title: "How large language models generate text", duration: "35 min" },
          { title: "Tokens, context windows and cost", duration: "25 min" },
          { title: "Setting up your AI development environment", duration: "30 min" },
        ],
      },
      {
        title: "Module 2 — Working with LLM APIs",
        lessons: [
          { title: "Your first API call (OpenAI & Anthropic)", duration: "30 min" },
          { title: "System prompts, roles and prompt templates", duration: "40 min" },
          { title: "Structured outputs and JSON validation", duration: "45 min" },
          { title: "Streaming responses to the UI", duration: "35 min" },
          { title: "Handling errors, retries and rate limits", duration: "30 min" },
        ],
      },
      {
        title: "Module 3 — Tools, Functions and Data",
        lessons: [
          { title: "Function / tool calling explained", duration: "40 min" },
          { title: "Connecting LLMs to your database and APIs", duration: "50 min" },
          { title: "Intro to embeddings and semantic search", duration: "45 min" },
          { title: "Building a simple RAG feature", duration: "60 min" },
        ],
      },
      {
        title: "Module 4 — Building the Back End",
        lessons: [
          { title: "Designing an AI API with FastAPI", duration: "50 min" },
          { title: "Authentication and per-user limits", duration: "40 min" },
          { title: "Caching and cost control", duration: "30 min" },
          { title: "Logging and observability for AI calls", duration: "35 min" },
        ],
      },
      {
        title: "Module 5 — Front End & Product",
        lessons: [
          { title: "Building a chat and assistant UI in Next.js", duration: "60 min" },
          { title: "UX patterns for AI features", duration: "30 min" },
          { title: "Handling uncertainty and showing sources", duration: "25 min" },
        ],
      },
      {
        title: "Module 6 — Evaluation, Deployment & Launch",
        lessons: [
          { title: "Evaluating AI output quality", duration: "45 min" },
          { title: "Containerising with Docker", duration: "40 min" },
          { title: "Deploying to the cloud", duration: "45 min" },
          { title: "Pricing and selling AI apps to small businesses", duration: "35 min" },
          { title: "Capstone: ship and present your AI app", duration: "Project" },
        ],
      },
    ],
    projects: [
      { title: "AI Writing Assistant", description: "A streaming assistant with prompt templates, structured output and usage tracking." },
      { title: "Docs Q&A (RAG)", description: "Upload documents and ask questions with cited answers." },
      { title: "Capstone AI SaaS", description: "Your own AI product idea, deployed with auth and limits." },
    ],
    tools: ["Python", "FastAPI", "TypeScript", "Next.js", "OpenAI API", "Anthropic API", "pgvector", "Docker", "Vercel"],
    faqs: [
      {
        question: "Do I need machine learning experience?",
        answer: "No. You need to be comfortable writing code. We focus on building with models, not training them.",
      },
      {
        question: "What will the API usage cost me?",
        answer: "Most students spend very little on API credits during the course. We show you how to use free tiers and keep costs low.",
      },
    ],
  },
  {
    slug: "rag-llm-applications-production",
    title: "RAG & LLM Applications in Production",
    subtitle: "Build retrieval-augmented AI systems that are accurate, observable and ready for real users.",
    area: "ai-software-development",
    level: "Advanced",
    formats: ["Self-paced", "Live cohort"],
    duration: "6 weeks · ~40 hours",
    price: { CAD: 749, USD: 549, GBP: 439, EUR: 509 },
    purchaseUrl: "[SELFANY_COURSE_URL_RAG_PRODUCTION]",
    rating: null,
    featured: true,
    description:
      "Most RAG demos break on real data. This course goes deep on ingestion, chunking, retrieval quality, re-ranking, evaluation, security and operations — so your LLM application works reliably for real users.",
    whoItsFor: [
      "Developers who have built a basic LLM app and want production quality",
      "Data engineers responsible for AI document pipelines",
      "Tech leads evaluating RAG architectures",
    ],
    outcomes: [
      "Design ingestion pipelines for PDFs, web pages and structured data",
      "Choose chunking and embedding strategies for your data",
      "Implement hybrid search, metadata filtering and re-ranking",
      "Build an evaluation set and measure retrieval and answer quality",
      "Defend against prompt injection and data leakage",
      "Monitor quality, latency and cost in production",
    ],
    earnWith: [
      "Charge premium rates for reliable AI assistants",
      "Offer knowledge-base set-up as a packaged service",
      "Win contracts for AI document assistants",
    ],
    prerequisites: [
      "Solid Python skills",
      "Experience calling an LLM API",
      "Basic SQL and familiarity with Docker",
    ],
    curriculum: [
      {
        title: "Module 1 — RAG Architecture",
        lessons: [
          { title: "Why naive RAG fails", duration: "30 min" },
          { title: "Reference architecture for production RAG", duration: "40 min" },
          { title: "Choosing a vector database", duration: "35 min" },
        ],
      },
      {
        title: "Module 2 — Ingestion & Chunking",
        lessons: [
          { title: "Parsing PDFs, HTML and Office documents", duration: "50 min" },
          { title: "Chunking strategies compared", duration: "45 min" },
          { title: "Metadata design for filtering and access control", duration: "35 min" },
          { title: "Incremental and scheduled re-indexing", duration: "40 min" },
        ],
      },
      {
        title: "Module 3 — Retrieval Quality",
        lessons: [
          { title: "Embedding models and dimensions", duration: "35 min" },
          { title: "Hybrid search (vector + keyword)", duration: "45 min" },
          { title: "Re-ranking and query rewriting", duration: "45 min" },
          { title: "Citations and grounded answers", duration: "30 min" },
        ],
      },
      {
        title: "Module 4 — Evaluation",
        lessons: [
          { title: "Building a golden evaluation set", duration: "40 min" },
          { title: "Retrieval metrics and answer metrics", duration: "45 min" },
          { title: "LLM-as-judge: uses and limits", duration: "35 min" },
          { title: "Regression testing for prompts and pipelines", duration: "35 min" },
        ],
      },
      {
        title: "Module 5 — Security & Operations",
        lessons: [
          { title: "Prompt injection and data leakage", duration: "45 min" },
          { title: "Document-level permissions", duration: "35 min" },
          { title: "Tracing, monitoring and cost dashboards", duration: "40 min" },
          { title: "Capstone: production RAG service", duration: "Project" },
        ],
      },
    ],
    projects: [
      { title: "Enterprise document assistant", description: "Multi-format ingestion, hybrid retrieval, citations and access control." },
      { title: "RAG evaluation harness", description: "An automated test suite that scores retrieval and answers on every change." },
    ],
    tools: ["Python", "LlamaIndex", "LangChain", "pgvector", "Qdrant", "Cohere Rerank", "Langfuse", "Docker"],
    faqs: [
      {
        question: "Which vector database do we use?",
        answer: "The main labs use PostgreSQL with pgvector, and we compare Qdrant and Pinecone so you can choose for your own projects.",
      },
    ],
  },

  // ─── AI Automation ───────────────────────────────────────────────────
  {
    slug: "ai-automation-masterclass",
    title: "AI Automation Masterclass: Automate & Earn",
    subtitle: "Learn to build AI automations that save businesses hours every week — and get paid to do it.",
    area: "ai-automation",
    level: "Beginner",
    formats: ["Self-paced", "Live cohort", "1-on-1"],
    duration: "5 weeks · ~25 hours",
    price: { CAD: 499, USD: 369, GBP: 289, EUR: 339 },
    purchaseUrl: "[SELFANY_COURSE_URL_AUTOMATION_MASTERCLASS]",
    rating: null,
    featured: true,
    description:
      "A practical masterclass for aspiring freelancers, side-hustlers and business owners. Learn to map processes, choose the right tools, and build AI-powered automations for email, documents, CRM and customer service — then package and sell them to small and medium businesses. No heavy coding required.",
    whoItsFor: [
      "Beginners who want a practical AI skill they can earn from",
      "Freelancers and side-hustlers who want to offer AI automation services",
      "Small business owners who want to automate their own admin",
    ],
    outcomes: [
      "Spot high-value automation opportunities in any business",
      "Build workflows that combine apps, data and AI steps",
      "Automate email triage, document processing and CRM updates",
      "Deploy a simple customer-service chatbot",
      "Measure time saved and calculate ROI",
      "Package automation as a service for clients",
    ],
    earnWith: [
      "Sell automation builds to local and online businesses",
      "Earn recurring income from maintenance retainers",
      "Sell ready-made automation templates",
      "Start your own AI automation agency",
    ],
    prerequisites: ["No coding required", "Comfortable using web apps and spreadsheets"],
    curriculum: [
      {
        title: "Module 1 — Automation Thinking",
        lessons: [
          { title: "Where AI automation creates value", duration: "25 min" },
          { title: "Mapping a business process", duration: "35 min" },
          { title: "Prioritising automations by ROI", duration: "25 min" },
        ],
      },
      {
        title: "Module 2 — Tools of the Trade",
        lessons: [
          { title: "Zapier, Make and n8n compared", duration: "30 min" },
          { title: "Triggers, actions and data mapping", duration: "40 min" },
          { title: "Adding AI steps with ChatGPT and Claude", duration: "40 min" },
        ],
      },
      {
        title: "Module 3 — Core Business Automations",
        lessons: [
          { title: "Inbox triage and reply drafting", duration: "45 min" },
          { title: "Extracting data from invoices and forms", duration: "45 min" },
          { title: "Lead capture, enrichment and CRM updates", duration: "45 min" },
          { title: "Automated reports and summaries", duration: "35 min" },
        ],
      },
      {
        title: "Module 4 — Chatbots & Customer Service",
        lessons: [
          { title: "Designing a helpful chatbot", duration: "30 min" },
          { title: "Training it on your FAQs and documents", duration: "40 min" },
          { title: "Hand-off to humans and safety rules", duration: "25 min" },
        ],
      },
      {
        title: "Module 5 — Rolling Out & Earning",
        lessons: [
          { title: "Testing, monitoring and maintenance", duration: "30 min" },
          { title: "Getting your team on board", duration: "20 min" },
          { title: "Pricing, packaging and selling automation to SMBs", duration: "35 min" },
          { title: "Final project: automate a real process", duration: "Project" },
        ],
      },
    ],
    projects: [
      { title: "AI inbox assistant", description: "Classifies incoming email and drafts replies for review." },
      { title: "Invoice-to-spreadsheet pipeline", description: "Extracts invoice fields with AI and logs them automatically." },
      { title: "FAQ chatbot", description: "A website chatbot trained on your own business content." },
    ],
    tools: ["Zapier", "Make", "n8n", "ChatGPT", "Claude", "Google Workspace", "Microsoft 365", "HubSpot", "Airtable"],
    faqs: [
      {
        question: "Is this suitable for non-technical people?",
        answer: "Yes. The course is designed for non-developers. Everything is built with visual, no-code tools.",
      },
      {
        question: "Do I need paid tool subscriptions?",
        answer: "You can complete the course using free tiers. We point out where a paid plan becomes worthwhile.",
      },
    ],
  },
  {
    slug: "n8n-ai-automation",
    title: "No-Code/Low-Code AI Automation with n8n",
    subtitle: "Build powerful AI workflows and agents with n8n — self-hosted or in the cloud.",
    area: "ai-automation",
    level: "Intermediate",
    formats: ["Self-paced", "1-on-1"],
    duration: "4 weeks · ~20 hours",
    price: { CAD: 349, USD: 259, GBP: 209, EUR: 239 },
    purchaseUrl: "[SELFANY_COURSE_URL_N8N]",
    rating: null,
    featured: true,
    description:
      "n8n gives you the flexibility of code with the speed of a visual builder. Learn to build robust AI workflows, connect any API, handle errors properly and deploy n8n for yourself or your clients.",
    whoItsFor: [
      "Automation builders who have outgrown Zapier",
      "Developers who want to build automations faster",
      "Freelancers offering automation services",
    ],
    outcomes: [
      "Build multi-step n8n workflows with branching and loops",
      "Connect any REST API and handle authentication",
      "Use AI nodes for classification, extraction and generation",
      "Build an AI agent workflow with tools and memory",
      "Add error handling, retries and alerts",
      "Self-host n8n with Docker",
    ],
    earnWith: [
      "Freelance as an n8n automation specialist",
      "Sell n8n workflow templates",
      "Offer self-hosted n8n set-up and care plans",
    ],
    prerequisites: ["Some automation experience (Zapier, Make or similar)", "Basic understanding of APIs and JSON"],
    curriculum: [
      {
        title: "Module 1 — n8n Fundamentals",
        lessons: [
          { title: "n8n cloud vs self-hosted", duration: "20 min" },
          { title: "Nodes, items and expressions", duration: "40 min" },
          { title: "Branching, merging and loops", duration: "40 min" },
        ],
      },
      {
        title: "Module 2 — APIs & Data",
        lessons: [
          { title: "The HTTP Request node in depth", duration: "45 min" },
          { title: "Credentials, OAuth and webhooks", duration: "35 min" },
          { title: "Transforming data with the Code node", duration: "40 min" },
        ],
      },
      {
        title: "Module 3 — AI in n8n",
        lessons: [
          { title: "LLM nodes and prompt design", duration: "35 min" },
          { title: "Structured extraction from documents", duration: "40 min" },
          { title: "Building an AI agent with tools and memory", duration: "55 min" },
          { title: "Vector stores and RAG in n8n", duration: "45 min" },
        ],
      },
      {
        title: "Module 4 — Production Workflows",
        lessons: [
          { title: "Error workflows, retries and alerts", duration: "35 min" },
          { title: "Self-hosting n8n with Docker", duration: "45 min" },
          { title: "Versioning and handing workflows to clients", duration: "25 min" },
          { title: "Finding clients and selling n8n services", duration: "30 min" },
          { title: "Final project: an AI operations workflow", duration: "Project" },
        ],
      },
    ],
    projects: [
      { title: "AI support ticket router", description: "Classifies, prioritises and routes tickets with an AI summary." },
      { title: "n8n AI agent", description: "An agent that uses tools to look up data and take actions." },
    ],
    tools: ["n8n", "Docker", "OpenAI API", "Anthropic API", "Webhooks", "Google Sheets", "Slack", "Postgres"],
    faqs: [
      {
        question: "Do I have to self-host n8n?",
        answer: "No. You can follow the whole course on n8n Cloud. Self-hosting is covered as an optional module.",
      },
    ],
  },

  // ─── Agentic AI ──────────────────────────────────────────────────────
  {
    slug: "agentic-ai-autonomous-agents",
    title: "Agentic AI: Build Autonomous AI Agents",
    subtitle: "Build AI agents that plan, use tools and complete real tasks — and offer them as a service to businesses.",
    area: "agentic-ai",
    level: "Intermediate",
    formats: ["Self-paced", "Live cohort"],
    duration: "6 weeks · ~40 hours",
    price: { CAD: 799, USD: 589, GBP: 469, EUR: 539 },
    purchaseUrl: "[SELFANY_COURSE_URL_AGENTIC_AI]",
    rating: null,
    featured: true,
    description:
      "Agents are the next step beyond chatbots. You'll learn how agents reason, plan and use tools, then build increasingly capable agents — with the evaluation, guardrails and human oversight needed to trust them.",
    whoItsFor: [
      "Developers who want to build AI agents",
      "AI engineers moving from RAG to agentic systems",
      "Technical product managers who want hands-on understanding",
    ],
    outcomes: [
      "Explain the agent loop: plan, act, observe, reflect",
      "Build tool-using agents with structured outputs",
      "Add short- and long-term memory",
      "Design guardrails, approvals and safe tool permissions",
      "Evaluate agent success rates and failure modes",
      "Deploy an agent as a service with tracing",
    ],
    earnWith: [
      "Build customer-service and booking agents for SMBs",
      "Offer monthly agent care and improvement plans",
      "Sell agent templates and starter kits",
    ],
    prerequisites: ["Python programming", "Experience calling an LLM API", "Basic understanding of REST APIs"],
    curriculum: [
      {
        title: "Module 1 — What Makes AI Agentic",
        lessons: [
          { title: "From prompts to agents", duration: "25 min" },
          { title: "The agent loop explained", duration: "35 min" },
          { title: "When not to use an agent", duration: "20 min" },
        ],
      },
      {
        title: "Module 2 — Tools & Actions",
        lessons: [
          { title: "Designing good tools for LLMs", duration: "45 min" },
          { title: "Tool calling with the major SDKs", duration: "45 min" },
          { title: "Structured outputs and validation with Pydantic", duration: "35 min" },
        ],
      },
      {
        title: "Module 3 — Planning & Memory",
        lessons: [
          { title: "Planning patterns: ReAct, plan-and-execute", duration: "45 min" },
          { title: "Short-term and long-term memory", duration: "40 min" },
          { title: "Stateful agents with LangGraph", duration: "55 min" },
        ],
      },
      {
        title: "Module 4 — Safety & Evaluation",
        lessons: [
          { title: "Guardrails and permission design", duration: "40 min" },
          { title: "Human-in-the-loop approvals", duration: "30 min" },
          { title: "Evaluating agents: tasks, metrics, traces", duration: "50 min" },
        ],
      },
      {
        title: "Module 5 — Shipping Agents",
        lessons: [
          { title: "Deploying an agent as an API", duration: "40 min" },
          { title: "Tracing and monitoring with Langfuse", duration: "35 min" },
          { title: "Cost, latency and reliability trade-offs", duration: "30 min" },
          { title: "Packaging and pricing agents for small businesses", duration: "35 min" },
          { title: "Capstone: an autonomous agent for a real workflow", duration: "Project" },
        ],
      },
    ],
    projects: [
      { title: "Research agent", description: "Searches approved sources and produces a structured, cited report." },
      { title: "Operations agent", description: "Uses internal tools to complete tasks, with approval steps for risky actions." },
    ],
    tools: ["Python", "Claude Agent SDK", "OpenAI Agents SDK", "LangGraph", "Pydantic", "Langfuse", "Docker"],
    faqs: [
      {
        question: "Which agent framework do you teach?",
        answer: "We start framework-free so you understand the fundamentals, then build with LangGraph and the official vendor SDKs.",
      },
    ],
  },
  {
    slug: "multi-agent-systems-mcp",
    title: "Multi-Agent Systems & MCP for Developers",
    subtitle: "Orchestrate teams of agents and connect them to real tools and data with the Model Context Protocol.",
    area: "agentic-ai",
    level: "Advanced",
    formats: ["Self-paced", "Live cohort"],
    duration: "5 weeks · ~32 hours",
    price: { CAD: 799, USD: 589, GBP: 469, EUR: 539 },
    purchaseUrl: "[SELFANY_COURSE_URL_MULTI_AGENT_MCP]",
    rating: null,
    featured: false,
    description:
      "Go beyond single agents. Learn multi-agent architectures, build MCP servers that expose your tools and data, and run coordinated agent systems with proper observability, evaluation and security.",
    whoItsFor: [
      "Developers who have built single agents",
      "AI engineers designing agent platforms",
      "Teams integrating AI assistants with internal systems",
    ],
    outcomes: [
      "Choose between supervisor, hierarchical and peer multi-agent patterns",
      "Build MCP servers that expose tools, resources and prompts",
      "Connect agents and AI assistants to MCP servers",
      "Coordinate hand-offs and shared state between agents",
      "Secure MCP tools with authentication and least privilege",
      "Evaluate and trace multi-agent runs",
    ],
    earnWith: [
      "Build MCP integrations for businesses and SaaS tools",
      "Take on advanced agent contracts",
      "Create and sell MCP servers and agent products",
    ],
    prerequisites: ["Completed an agents course or equivalent experience", "Strong Python or TypeScript"],
    curriculum: [
      {
        title: "Module 1 — Multi-Agent Architectures",
        lessons: [
          { title: "Why (and when) to use multiple agents", duration: "30 min" },
          { title: "Supervisor, hierarchical and swarm patterns", duration: "45 min" },
          { title: "Shared state and hand-offs", duration: "40 min" },
        ],
      },
      {
        title: "Module 2 — The Model Context Protocol",
        lessons: [
          { title: "MCP concepts: tools, resources, prompts", duration: "35 min" },
          { title: "Building your first MCP server", duration: "55 min" },
          { title: "Connecting MCP to clients and agents", duration: "40 min" },
          { title: "Remote MCP servers and authentication", duration: "45 min" },
        ],
      },
      {
        title: "Module 3 — Building the System",
        lessons: [
          { title: "A planner-researcher-writer-reviewer team", duration: "60 min" },
          { title: "Error recovery and retries across agents", duration: "35 min" },
          { title: "Human checkpoints in multi-agent flows", duration: "30 min" },
        ],
      },
      {
        title: "Module 4 — Production & Security",
        lessons: [
          { title: "Tracing multi-agent runs", duration: "35 min" },
          { title: "Evaluating systems end to end", duration: "40 min" },
          { title: "MCP security: permissions and injection risks", duration: "40 min" },
          { title: "Capstone: a multi-agent system with MCP tools", duration: "Project" },
        ],
      },
    ],
    projects: [
      { title: "Company-data MCP server", description: "Exposes a database and document store as secure MCP tools and resources." },
      { title: "Multi-agent content pipeline", description: "A team of agents that researches, drafts, reviews and publishes." },
    ],
    tools: ["Python", "TypeScript", "MCP SDKs", "LangGraph", "CrewAI", "Claude Agent SDK", "Langfuse", "Docker"],
    faqs: [
      {
        question: "Python or TypeScript?",
        answer: "Labs are provided in Python, with TypeScript versions of the MCP server exercises.",
      },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export const featuredCourses = courses.filter((c) => c.featured);

export function lessonCount(course: Course) {
  return course.curriculum.reduce((n, m) => n + m.lessons.length, 0);
}
