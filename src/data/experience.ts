export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  url?: string;
  tech: string[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Techextensor Pvt. Ltd.",
    role: "Associate Software Developer",
    period: "Dec 2025 — Present",
    location: "Ahmedabad, India",
    url: "https://techextensor.com",
    tech: [".NET 8 (C#)", "Angular", "SQL Server", "RabbitMQ", "Microservices", "Background Jobs"],
    highlights: [
      "Contributing to Boardroom, a large-scale financial platform for employee equity management.",
      "Building full-stack features with .NET (C#) on the back end and Angular on the front end.",
      "Designing database schemas, optimizing SQL queries, and tuning data models for high-throughput transaction processing.",
      "Implementing background job scheduling and async processing for workflow automation.",
      "Integrating RabbitMQ for reliable event-driven communication across distributed services.",
    ],
  },
  {
    company: "TurningPoint",
    role: "Backend Developer",
    period: "Jul 2025 — Dec 2025",
    location: "Vadodara, India",
    tech: ["Node.js", "Express.js", "REST APIs", "Push / Email / SMS"],
    highlights: [
      "Built Checkdin, a professional networking platform with gamified engagement.",
      "Designed backend workflows and APIs in Node.js for authentication, referrals, and leaderboards.",
      "Implemented notification services across push, email, and SMS channels.",
    ],
  },
];
