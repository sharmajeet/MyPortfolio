export const systemDesign = {
  title: "Backend & System Design",
  body: "I design systems that scale — microservices, event-driven workflows, caching, and message queues — and ship them to the cloud on AWS & Azure with Docker and CI/CD.",
  tags: [
    "Distributed Systems",
    "Microservices",
    "Event-Driven Architecture",
    "Caching (Redis)",
    "Message Queues (RabbitMQ)",
    "Load Balancing",
    "API Design",
    "Multi-tenant / RBAC",
    "AWS",
    "Azure",
  ],
};

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Backend & APIs",
    items: ["Node.js", "Express.js", ".NET (C#)", "REST APIs", "Microservices"],
  },
  { title: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "CI/CD"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "SQL"] },
  { title: "Frontend", items: ["Angular", "Next.js", "TypeScript"] },
];
