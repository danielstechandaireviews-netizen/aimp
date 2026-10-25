import type { AiArea } from "./types";

/**
 * AI skill areas. The three pillars are the core, money-making skill tracks;
 * disciplines are supporting skills. Each entry generates /ai-areas/[slug].
 * relatedCourses / relatedServices reference slugs in courses.ts / services.ts.
 */
export const areas: AiArea[] = [
  // ─── Core pillars ────────────────────────────────────────────────────
  {
    slug: "ai-software-development",
    title: "AI Software Development",
    shortTitle: "AI Software",
    icon: "code",
    pillar: true,
    kind: "pillar",
    tagline: "Build AI apps that businesses will pay for.",
    summary:
      "Build AI-powered apps, assistants and MVPs — from LLM integrations and RAG chatbots to full AI products — and sell them to businesses.",
    overview: [
      "AI Software Development is where coding meets large language models. You learn to turn AI into reliable tools people pay for: assistants that answer from a business's own documents, apps that draft quotes and reports, and AI features added to existing products.",
      "Small and medium businesses everywhere want these tools but can't hire big development teams. That makes rapid AI software development one of the most valuable skills you can learn — for a job, for freelance clients or for your own product.",
    ],
    outcomes: [
      "Integrate LLM APIs (OpenAI, Anthropic, open-source models) into apps",
      "Build RAG chatbots that answer from a business's own documents",
      "Ship AI features behind clean, secure APIs",
      "Launch a full-stack AI app with sign-in and usage limits",
      "Scope, price and deliver AI builds for small business clients",
      "Package an idea into your own AI micro-SaaS",
    ],
    tools: ["Python", "TypeScript", "FastAPI", "Next.js", "OpenAI API", "Anthropic API", "LangChain", "LlamaIndex", "pgvector", "Supabase", "Vercel"],
    useCases: [
      { title: "Website AI assistant", description: "A chat assistant that answers customer questions from a business's own website, FAQs and documents." },
      { title: "AI quote & report generator", description: "An app that turns a few inputs into a polished quote, proposal or report in seconds." },
      { title: "Your own AI micro-SaaS", description: "A niche AI product with sign-up and subscriptions that earns while you sleep." },
    ],
    incomeStreams: [
      "Freelance AI app & chatbot builds",
      "Monthly maintenance & hosting retainers",
      "Selling your own AI micro-SaaS",
      "AI developer jobs & contracts",
    ],
    relatedCourses: ["ai-software-development-bootcamp", "rag-llm-applications-production"],
    relatedServices: ["rapid-ai-software-development"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    icon: "workflow",
    pillar: true,
    kind: "pillar",
    tagline: "The fastest AI skill to turn into income.",
    summary:
      "Automate business tasks with n8n, Make, Zapier and AI — then sell automation builds and monthly retainers to small businesses. No heavy coding needed.",
    overview: [
      "AI Automation combines workflow tools like n8n, Make and Zapier with AI that can read, sort and write. Together they handle the repetitive work every business has: answering emails, processing invoices, following up leads and updating spreadsheets.",
      "It's often the fastest route from learning to earning: you don't need to be a developer, every small business has processes to automate, and automations naturally lead to recurring monthly maintenance income.",
    ],
    outcomes: [
      "Spot high-value automation opportunities in any business",
      "Build multi-step workflows in n8n, Make and Zapier",
      "Add AI steps for sorting, extracting and drafting",
      "Automate email, documents, bookings and CRM updates",
      "Deploy customer-service chatbots",
      "Price, sell and maintain automations for clients",
    ],
    tools: ["n8n", "Make", "Zapier", "OpenAI API", "Anthropic API", "Google Workspace", "Microsoft 365", "HubSpot", "Airtable", "Slack", "WhatsApp Business API"],
    useCases: [
      { title: "Inbox triage & reply drafting", description: "Emails are sorted, routed and given a suggested reply — the team just reviews and sends." },
      { title: "Invoice & form processing", description: "AI reads invoices and forms, pulls out the key details and logs them automatically." },
      { title: "Lead follow-up machine", description: "New leads are captured, logged in the CRM and followed up automatically within minutes." },
    ],
    incomeStreams: [
      "Freelance automation projects",
      "Monthly automation maintenance retainers",
      "Selling automation templates",
      "Running your own AI automation agency",
    ],
    relatedCourses: ["ai-automation-masterclass", "n8n-ai-automation"],
    relatedServices: ["ai-automation"],
  },
  {
    slug: "agentic-ai",
    title: "AI Agents",
    shortTitle: "AI Agents",
    icon: "bot",
    pillar: true,
    kind: "pillar",
    tagline: "Build AI that does the work — and get paid for it.",
    summary:
      "Build AI agents that use tools, follow rules and complete real tasks — like booking appointments, qualifying leads and handling customer requests — for businesses.",
    overview: [
      "AI agents go beyond chatbots. They can plan, use tools, call other apps and complete multi-step tasks: checking a calendar and booking a meeting, qualifying a lead and updating the CRM, or researching and writing a report.",
      "Businesses are starting to adopt agents, and few people can build them safely. Learning to design agents with clear rules, approval steps and monitoring puts you ahead of the market.",
    ],
    outcomes: [
      "Understand how agents plan, use tools and remember",
      "Build agents with tool calling and structured outputs",
      "Connect agents to real business tools with MCP",
      "Add guardrails and human approval for important actions",
      "Test and monitor agents in production",
      "Package agents as a service for small businesses",
    ],
    tools: ["Python", "TypeScript", "Model Context Protocol (MCP)", "Claude Agent SDK", "OpenAI Agents SDK", "LangGraph", "CrewAI", "n8n AI agents", "Langfuse"],
    useCases: [
      { title: "Customer-service agent", description: "Answers customers on the website or WhatsApp and hands over to a person when needed." },
      { title: "Booking & lead agent", description: "Qualifies new enquiries, checks availability and books appointments automatically." },
      { title: "Back-office agent", description: "Updates records, drafts follow-ups and compiles reports across the business's tools." },
    ],
    incomeStreams: [
      "Building custom agents for businesses",
      "Monthly agent care & improvement plans",
      "Selling ready-made agent templates",
      "Agent-powered products and services",
    ],
    relatedCourses: ["agentic-ai-autonomous-agents", "multi-agent-systems-mcp"],
    relatedServices: ["ai-agents"],
  },

  // ─── Supporting skills ───────────────────────────────────────────────
  {
    slug: "generative-ai-prompt-engineering",
    title: "Generative AI & Prompt Engineering",
    shortTitle: "Generative AI",
    icon: "sparkles",
    pillar: false,
    kind: "discipline",
    tagline: "The foundation every AI earner needs.",
    summary: "Understand how generative models work and get reliable, high-quality results from them — the base skill behind every AI income stream.",
    overview: [
      "Generative AI powers text, image, audio and code generation. Prompt engineering is the practical skill of getting consistent, high-quality output from these models — and knowing when a prompt isn't enough.",
      "It's the starting point for all three skill tracks, and a valuable skill on its own for content, research and productivity work.",
    ],
    outcomes: [
      "Understand how large language models generate output",
      "Use proven prompt patterns (role, examples, step-by-step, constraints)",
      "Produce structured output reliably",
      "Build reusable prompt templates for clients",
      "Evaluate and compare prompts and models",
    ],
    tools: ["ChatGPT", "Claude", "Gemini", "OpenAI API", "Anthropic API", "Midjourney"],
    useCases: [
      { title: "Content operations", description: "Consistent drafts, summaries and rewrites using reusable prompt templates." },
      { title: "Structured extraction", description: "Turning messy text into clean, structured data for other tools." },
      { title: "Personal productivity", description: "Using AI assistants well for research, writing, planning and coding." },
    ],
    relatedCourses: ["ai-automation-masterclass", "ai-software-development-bootcamp"],
    relatedServices: ["ai-automation"],
  },
  {
    slug: "data-engineering-for-ai",
    title: "Data Engineering for AI",
    shortTitle: "Data for AI",
    icon: "database",
    pillar: false,
    kind: "discipline",
    tagline: "AI is only as good as the data behind it.",
    summary: "Prepare, clean and organise the data that AI apps, chatbots and agents depend on.",
    overview: [
      "Every reliable AI system rests on good data: documents that are collected, cleaned, organised and kept up to date. Data is at the heart of Daniel's career — from data engineering to business data analysis.",
      "This area covers the data skills that make your AI builds work better — from preparing documents for chatbots to building simple, dependable data pipelines.",
    ],
    outcomes: [
      "Prepare and chunk documents for AI chatbots and RAG",
      "Build simple, reliable data pipelines",
      "Clean and validate data before it reaches AI",
      "Store and search data with vector databases",
      "Keep AI knowledge up to date automatically",
    ],
    tools: ["Python", "SQL", "pandas", "Airflow", "dbt", "Postgres", "pgvector", "Supabase"],
    useCases: [
      { title: "Chatbot knowledge base", description: "Turning a business's documents into a clean, searchable knowledge base." },
      { title: "Automatic data refresh", description: "Pipelines that keep AI knowledge current without manual work." },
      { title: "Data clean-up", description: "Fixing messy spreadsheets and records so automations run smoothly." },
    ],
    relatedCourses: ["rag-llm-applications-production"],
    relatedServices: ["rapid-ai-software-development"],
  },
  {
    slug: "machine-learning-mlops",
    title: "Machine Learning & MLOps",
    shortTitle: "ML & MLOps",
    icon: "brain",
    pillar: false,
    kind: "discipline",
    tagline: "From notebook to production model.",
    summary: "Train, evaluate and deploy machine learning models for prediction tasks like forecasting and classification.",
    overview: [
      "Classical machine learning still solves many problems best: forecasting sales, predicting churn, classifying requests or spotting unusual activity.",
      "This area covers the ML workflow end to end, with a focus on getting models into real use.",
    ],
    outcomes: [
      "Frame business problems as ML problems",
      "Train and evaluate models with scikit-learn",
      "Track experiments and version models",
      "Deploy models as APIs",
      "Monitor models and retrain safely",
    ],
    tools: ["Python", "pandas", "scikit-learn", "XGBoost", "PyTorch", "MLflow", "Docker"],
    useCases: [
      { title: "Sales forecasting", description: "Predicting demand so a business can plan stock and staff." },
      { title: "Customer churn", description: "Spotting customers likely to leave so the business can act early." },
      { title: "Request classification", description: "Automatically sorting incoming requests by type and urgency." },
    ],
    relatedCourses: ["ai-software-development-bootcamp"],
    relatedServices: ["rapid-ai-software-development"],
  },
  {
    slug: "ai-for-small-business",
    title: "AI for Small Business Owners",
    shortTitle: "AI for SMB Owners",
    icon: "store",
    pillar: false,
    kind: "discipline",
    tagline: "Use AI to save time and grow — without the hype.",
    summary: "Practical AI for owners and managers of small and medium businesses: where it helps, what it costs, and how to get started.",
    overview: [
      "Small business owners don't need to become engineers to benefit from AI — but they do need to know where it actually saves time and money, and how to avoid expensive mistakes.",
      "This area covers practical AI adoption: quick wins, choosing tools, working with freelancers or agencies, and keeping customer data safe.",
    ],
    outcomes: [
      "Spot the tasks in your business AI can take over",
      "Choose between off-the-shelf tools and custom builds",
      "Estimate the time and money AI can save",
      "Brief and manage an AI freelancer or agency",
      "Use AI safely with customer data",
    ],
    tools: ["ChatGPT", "Claude", "Zapier", "Make", "n8n", "Google Workspace", "Microsoft 365"],
    useCases: [
      { title: "Quick-win automations", description: "Small automations that save hours in the first week." },
      { title: "AI-assisted marketing", description: "Faster content, emails and social posts with AI." },
      { title: "Customer support", description: "AI assistants that answer common questions around the clock." },
    ],
    relatedCourses: ["ai-automation-masterclass"],
    relatedServices: ["ai-automation", "ai-agents"],
  },
  {
    slug: "responsible-ai-governance",
    title: "Responsible AI & Security",
    shortTitle: "Responsible AI",
    icon: "shield",
    pillar: false,
    kind: "discipline",
    tagline: "Build AI clients can trust.",
    summary: "Build AI that is secure, fair and respectful of privacy — a selling point for every client project.",
    overview: [
      "Clients trust builders who take security and privacy seriously. Knowing how to protect data and keep AI under control sets you apart.",
      "This area covers practical controls: data privacy, prompt-injection defence, access control, human oversight and awareness of regulations such as GDPR, PIPEDA and the EU AI Act.",
    ],
    outcomes: [
      "Spot the main risks in chatbots and agents",
      "Defend against prompt injection and data leaks",
      "Apply privacy basics to client projects",
      "Add human review and monitoring",
      "Write a simple AI-use policy for a business",
    ],
    tools: ["OWASP Top 10 for LLMs", "NIST AI RMF", "EU AI Act", "Guardrail libraries"],
    useCases: [
      { title: "AI-use policy", description: "Clear, simple rules for how a team may use AI tools." },
      { title: "Chatbot security check", description: "Reviewing an AI assistant for leaks and misuse." },
      { title: "Privacy-safe automations", description: "Designing automations that keep customer data protected." },
    ],
    relatedCourses: ["agentic-ai-autonomous-agents", "rag-llm-applications-production"],
    relatedServices: ["ai-agents"],
  },
];

export const pillarAreas = areas.filter((a) => a.pillar);
export const disciplineAreas = areas.filter((a) => a.kind === "discipline");

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
