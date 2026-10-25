/**
 * Profile content for /about and the home page.
 * The bio restates facts provided by Daniel — keep them accurate.
 * Anything in [SQUARE_BRACKETS] is a placeholder.
 */

/** Impact stats. `count` (optional) animates the number when it scrolls into view. */
export const stats = [
  { value: "400+", count: 400, suffix: "+", label: "students trained globally" },
  { value: "3", count: 3, label: "AI skill tracks that pay: software, automation & agents" },
  { value: "4", count: 4, label: "communities trained online" },
  { value: "5", count: 5, label: "countries reached" },
];

export const bio = {
  role: "AI Skill Educator",
  headline: "Your AI Skill Educator at AIMoniPoint.",
  intro:
    "Daniel Makonor is the AI Skill Educator at AIMoniPoint. He helps everyday people master AI hard skills — AI app development, AI automation and AI agents — to create multiple streams of income and to deliver AI solutions for small and medium businesses.",
  paragraphs: [
    "Daniel's career has taken him from Product Associate to Software Engineer, and then into data as a Data Engineer and Analyst. Today he manages projects as a Senior Business Data Analyst across banking, telecommunications and oil & gas — sectors where reliability, scale and security are non-negotiable.",
    "Along the way he mastered building AI apps, AI automations and AI agents for small and medium-sized businesses — the same three skills he now teaches. He has taught them to communities across Canada, the United States, the UK and Europe through online and virtual courses, and has helped more than 400 students globally build AI skills that translate into jobs, freelance work and businesses.",
    "Through AIMoniPoint, Daniel trains individuals to master AI hard skills and build multiple streams of income — including offering AI services to small and medium businesses. AIMoniPoint also delivers rapid AI software, AI automation and AI agents directly to SMBs, and is growing its community across Africa, Asia, North America and beyond.",
  ],
};

/** Career path — years are placeholders. */
export const timeline = [
  {
    year: "[Year]",
    title: "Product Associate",
    description: "Started in product — learning how to turn customer and business needs into products people actually use.",
  },
  {
    year: "[Year]",
    title: "Software Engineer",
    description: "Moved into engineering, designing and building reliable software applications.",
  },
  {
    year: "[Year]",
    title: "Data Engineer & Analyst",
    description: "Shifted into data — building pipelines and turning data into insight for decision-makers.",
  },
  {
    year: "[Year] – today",
    title: "Senior Business Data Analyst",
    description: "Manages projects across banking, telecommunications and oil & gas.",
  },
  {
    year: "[Year]",
    title: "Building AI for small businesses",
    description: "Mastered building AI apps, AI automations and AI agents for small and medium-sized businesses.",
  },
  {
    year: "Today",
    title: "AI Skill Educator, AIMoniPoint",
    description:
      "Teaching AI skills to communities across Canada, the USA, the UK and Europe through online courses — and helping more than 400 students globally build AI skills that pay.",
  },
];

/** Sectors where Daniel manages projects as a Senior Business Data Analyst (career — not AIMoniPoint client projects). */
export const careerIndustries = [
  {
    name: "Banking",
    icon: "landmark" as const,
    description: "Where accuracy, security and compliance are non-negotiable.",
  },
  {
    name: "Telecommunications",
    icon: "radio-tower" as const,
    description: "High-volume data and systems that must perform at scale.",
  },
  {
    name: "Oil & Gas",
    icon: "fuel" as const,
    description: "Safety-critical operations with complex data.",
  },
];

/** Skill tags — edit freely. */
export const skillGroups = [
  { title: "Languages & data", skills: ["Python", "SQL", "TypeScript", "pandas", "Spark"] },
  { title: "Cloud & platforms", skills: ["AWS", "Azure", "Google Cloud", "Docker", "Supabase", "Vercel"] },
  { title: "Data engineering", skills: ["Data pipelines", "ETL / ELT", "Airflow", "dbt", "Data quality"] },
  { title: "AI & LLMs", skills: ["LLMs", "RAG", "Vector databases", "Prompt engineering", "Evaluation"] },
  { title: "Agents & automation", skills: ["AI agents", "MCP", "n8n", "Make", "Zapier"] },
  { title: "Product & business", skills: ["Product thinking", "Business data analysis", "Requirements", "Project management"] },
  { title: "Teaching", skills: ["Curriculum design", "Live online cohorts", "Mentoring", "Community training"] },
];

export const philosophy = [
  {
    title: "Practical",
    description: "Every lesson is tied to a real tool, a real workflow or a real business problem. Less theory, more doing.",
  },
  {
    title: "Project-based",
    description: "You learn by building. Every course produces portfolio projects you can show — and sell.",
  },
  {
    title: "Income-focused",
    description: "The goal is income: freelance clients, retainers, products or a new role. Skills that pay for themselves — in more than one way.",
  },
];

/** Certifications — placeholders. */
export const certifications = [
  { name: "[Certification name]", issuer: "[Issuer]", year: "[Year]" },
  { name: "[Certification name]", issuer: "[Issuer]", year: "[Year]" },
  { name: "[Certification name]", issuer: "[Issuer]", year: "[Year]" },
];

/** Media, speaking & podcast — placeholders. */
export const media = [
  { type: "Podcast", title: "[Podcast episode title]", outlet: "[Podcast name]", url: "" },
  { type: "Talk", title: "[Talk title]", outlet: "[Event / community name]", url: "" },
  { type: "Workshop", title: "[Workshop title]", outlet: "[Organisation]", url: "" },
];
