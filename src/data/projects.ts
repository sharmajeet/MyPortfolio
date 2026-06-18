export type DetailBlock = { title: string; body: string };
export type BeforeAfter = { before: string; after: string };
export type Metric = { value: string; label: string };
export type TechRow = { category: string; details: string };

export type ProjectDetail = {
  logo?: string;
  overview: string;
  role: string;
  client?: string;
  industry?: string;
  exchanges?: string[];
  problem?: DetailBlock[];
  delivered?: DetailBlock[];
  beforeAfter?: BeforeAfter[];
  metrics?: Metric[];
  tech?: TechRow[];
  quote?: { text: string; author: string };
  closing?: string;
  links?: { label: string; href: string }[];
};

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  description: string;
  period: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
  kind: "Professional" | "Personal" | "Academic";
  detail: ProjectDetail;
};

export const projects: Project[] = [
  {
    slug: "boardroom",
    name: "Boardroom",
    blurb: "Enterprise employee share plan platform",
    description:
      "Modernizing employee share plan administration for one of Australia's leading share registries — serving listed companies across nine global stock exchanges. Five major enhancements across SREG Web, ClientOnline, and EmployeeServe.",
    period: "Dec 2025 — Present",
    tags: [".NET 8 (C#)", "Angular 18", "SQL Server", "Microservices"],
    featured: true,
    kind: "Professional",
    detail: {
      logo: "/boardroom-logo.svg",
      client: "Boardroom Pty Limited",
      industry: "Financial Services · Share Registry & Equity Plan Technology",
      role: "Associate Software Developer — full-stack delivery across SREG Web, ClientOnline & EmployeeServe",
      exchanges: ["ASX", "SGX", "BURSA", "NYSE", "NZX", "LSE", "AIM", "NSXA", "CXA"],
      links: [
        { label: "Official site", href: "https://boardroomlimited.com.au" },
        { label: "Employee Share Plans", href: "https://boardroomlimited.com.au/corp/services/employee-plans/" },
        { label: "InvestorServe", href: "https://www.investorserve.com.au" },
        { label: "AdviserServe", href: "https://www.adviserserve.com.au" },
      ],
      overview:
        "Boardroom is one of Australia's leading corporate services providers — 30+ years of experience, 500+ clients, and 350+ AGMs managed annually, from private companies to ASX20 organisations. It administers share registries and employee equity plans for listed companies across nine stock exchanges. Following its December 2024 acquisition of Solium Capital's Australian ESP operations from Morgan Stanley, Boardroom became one of the largest employee share plan administrators in the market. Our team partnered with Boardroom across a multi-release engagement to modernize the Employee Share Plan capabilities, delivering five interconnected enhancements that closed compliance gaps, removed operational bottlenecks, and fixed employee-experience shortfalls that had accumulated as the platform scaled.",
      problem: [
        {
          title: "Blackout periods were a compliance headache",
          body: "The system could only enforce one locked period at a time, configured per transaction type. Overlapping blackouts for different employee groups were tracked manually in spreadsheets, and there was no way to auto-cancel open orders when a blackout started — a missed restriction meant a potential compliance breach.",
        },
        {
          title: "Vesting events were slow and error-prone",
          body: "Each employee's exercise preferences, bank details, and delivery instructions had to be configured one at a time. For an issuer with 500 employees vesting at once, this meant weeks of manual work. Employees couldn't see post-tax/fee payouts, so elections were delayed.",
        },
        {
          title: "International employees couldn't be paid correctly",
          body: "With employees across AU, SG, UK, and US, there was no way to override bank details or route proceeds to a centralized currency account. Currency routing was handled manually — slow, error-prone, and impossible to audit.",
        },
        {
          title: "Dividend choices were stuck in the past",
          body: "Employees could only take cash or reinvest. There was no hold-in-Boardroom, payroll routing, or partial reinvestment, no plan-level rules, no election history, and no migration logic when configurations changed.",
        },
        {
          title: "Employees had no idea where their money was going",
          body: "In salary-sacrifice plans, payroll deducted money monthly, but employees couldn't see deductions in EmployeeServe until a purchase happened — months later. No record, no confirmation, no balance: real anxiety and eroded trust.",
        },
      ],
      delivered: [
        {
          title: "Centralized Trade Restrictions",
          body: "Replaced the single locked-period model with a blackout engine. Admins create multiple overlapping restrictions from one screen — by plan, investor group, designated persons, or bulk upload — and open orders auto-cancel when a restriction starts. Restricted transactions are greyed out for employees, with the stricter rule always applied alongside the legacy locked period.",
        },
        {
          title: "Scalable Pre-Election & Bulk Exercise",
          body: "Built an end-to-end vesting workflow with six exercise methods and two delivery options, configurable at issuer, plan, or investor-group level. Employees elect via EmployeeServe with indicative post-tax/brokerage/fee calculations; admins process elections in bulk with exclusions and scheduled reporting. Non-electors fall back to the plan default automatically.",
        },
        {
          title: "Multi-Currency Payment Routing",
          body: "A priority-based currency control framework lets admins override employee bank details and reroute proceeds to a centralized account, scoped by plan, investor group, domicile, or tax domicile — applied only to employee proceeds. Every transaction screen shows a clear alert, and four SREG reports reflect overridden details for full audit coverage.",
        },
        {
          title: "Expanded Dividend Elections",
          body: "Grew dividend options from two to four — DRP, Bank Account, Hold Cash within Boardroom, and Payroll — with per-plan control, bulk updates, and partial reinvestment by percentage or units. Existing elections are preserved through migration, with every change timestamped for audit.",
        },
        {
          title: "Pre-Purchase Contribution Visibility",
          body: "Closed the months-long visibility gap with a real-time view of salary-sacrifice deductions. A three-stage admin workflow imports, validates, and generates purchase files; employees see Pending Contributions, Contribution History, and Completed Purchases with total accumulated value. ClientOnline mirrors the same views for admins.",
        },
      ],
      beforeAfter: [
        { before: "One locked period per facility, tracked in spreadsheets", after: "Multiple overlapping restrictions with automated order cancellation" },
        { before: "Each employee configured individually for vesting events", after: "Bulk processing with default seeding and six exercise methods" },
        { before: "Currency routing managed manually outside the system", after: "Priority-based rules reroute payments automatically with full audit trail" },
        { before: "Two dividend options (Cash or Share)", after: "Four methods with per-plan control, bulk update, and partial DRP" },
        { before: "Employees blind to payroll deductions for months", after: "Real-time contribution visibility in the EmployeeServe dashboard" },
      ],
      metrics: [
        { value: "5", label: "Major features across 3 platforms" },
        { value: "9", label: "Stock exchanges supported" },
        { value: "6+2", label: "Exercise methods + delivery options" },
        { value: "4", label: "Dividend election methods" },
        { value: "~100%", label: "Reduction in manual blackout tracking" },
        { value: "0", label: "Months of contribution invisibility" },
      ],
      tech: [
        { category: "Backend", details: ".NET 8, C#" },
        { category: "Frontend", details: "Angular 18, TypeScript, RxJS" },
        { category: "Mobile", details: "Xamarin (Android / iOS)" },
        { category: "Architecture", details: "N-Tier Monolith — 182 C# projects, 15 Angular apps" },
        { category: "Database", details: "SQL Server (primary), Oracle; 5,895+ migration scripts" },
        { category: "Scheduler", details: "Custom Boardroom.Scheduler" },
        { category: "Integrations", details: "Twilio, SendFx, Calastone, Proxymity, SimpleKYC, CHESS" },
        { category: "Testing", details: "MSTest, Jasmine, Playwright (3 E2E suites)" },
        { category: "CI/CD", details: "GitLab CI with custom Brd CLI orchestrator" },
      ],
      quote: {
        text: "What used to take our team days now takes minutes. Our employees finally have visibility into their share plans, and our compliance team sleeps better at night.",
        author: "Boardroom ESP Operations",
      },
      closing:
        "Boardroom's Employee Share Plan platform was transformed from a registry-centric system into a modern equity plan administration platform. The five capabilities work together as a connected system — a blackout restriction blocks affected employees in EmployeeServe, a currency rule overrides payment routing during an exercise, a contribution import surfaces instantly in the dashboard. Nothing falls through the cracks, positioning Boardroom to compete with global equity plan administrators across the nine exchanges it now supports.",
    },
  },
  {
    slug: "promptsdk",
    name: "PromptSDK",
    blurb: "Enterprise AI orchestration platform",
    description:
      "Gives enterprises visibility and control over how AI is used across teams. A multi-tenant microservices backend with RBAC, RabbitMQ, and Redis built to scale.",
    period: "Dec 2025",
    tags: ["Node.js", "Microservices", "RabbitMQ", "Redis", "RBAC"],
    featured: true,
    kind: "Personal",
    detail: {
      role: "Backend Engineer — architecture, services, and governance workflows",
      overview:
        "PromptSDK is an enterprise AI orchestration platform that gives organisations visibility and control over how AI is adopted internally — tracking usage, enforcing governance, and monitoring adoption across teams. The backend is built as a multi-tenant microservices system designed to scale horizontally while keeping tenants fully isolated.",
      delivered: [
        { title: "Multi-tenant microservices", body: "Designed a service-oriented architecture with strict tenant isolation and role-based access control (RBAC) for fine-grained permissions." },
        { title: "Distributed communication", body: "Integrated RabbitMQ for reliable event-driven messaging between services and Redis for low-latency caching and shared state." },
        { title: "Governance & monitoring", body: "Built workflows providing enterprise visibility — usage tracking, adoption metrics, and governance controls over AI consumption." },
      ],
      tech: [
        { category: "Backend", details: "Node.js, Express.js" },
        { category: "Messaging", details: "RabbitMQ (event-driven)" },
        { category: "Caching", details: "Redis" },
        { category: "Security", details: "RBAC, multi-tenant isolation" },
      ],
    },
  },
  {
    slug: "social-media-backend",
    name: "Social Media Backend",
    blurb: "Scalable microservices backend",
    description:
      "A scalable microservices-based backend for a social media platform, built with Node.js, Docker, and RabbitMQ for reliable inter-service communication.",
    period: "2024",
    tags: ["Node.js", "Docker", "RabbitMQ", "Microservices"],
    github: "https://github.com/sharmajeet/Social-Media-Backned",
    featured: false,
    kind: "Personal",
    detail: {
      role: "Backend Engineer — services, containerization, messaging",
      overview:
        "A microservices-based backend for a social media platform, decomposed into independently deployable services that communicate asynchronously. The system is containerized with Docker and uses RabbitMQ to keep services loosely coupled and resilient.",
      delivered: [
        { title: "Service decomposition", body: "Split core domains into independent Node.js services with their own data boundaries for independent scaling and deployment." },
        { title: "Event-driven messaging", body: "Used RabbitMQ for reliable inter-service communication, decoupling producers from consumers." },
        { title: "Containerized delivery", body: "Dockerized each service for consistent local development and reproducible deployments." },
      ],
      tech: [
        { category: "Backend", details: "Node.js, Express.js" },
        { category: "Messaging", details: "RabbitMQ" },
        { category: "Infrastructure", details: "Docker" },
      ],
    },
  },
  {
    slug: "studynotion",
    name: "StudyNotion",
    blurb: "E-learning marketplace",
    description:
      "A full-stack e-learning marketplace where students buy courses and join live lectures, and instructors manage their content. Built with Next.js, Node.js, MongoDB, and Razorpay.",
    period: "Dec 2023 — Mar 2024",
    tags: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
    github: "https://github.com/sharmajeet/study-notion",
    live: "https://study-notion-drab.vercel.app",
    featured: true,
    kind: "Academic",
    detail: {
      role: "Full-Stack Developer — end-to-end build (B.Tech Semester 6 project)",
      overview:
        "StudyNotion is a responsive e-learning marketplace where students discover and purchase courses and join live lectures, while instructors manage and organise their content. It was built end to end as a full-stack application with secure payments.",
      delivered: [
        { title: "Course marketplace", body: "Course discovery, purchase flow, and live lecture participation with a responsive UI." },
        { title: "Dual dashboards", body: "Instructor and student dashboards for course management, scheduling, and content organisation." },
        { title: "Payments", body: "Integrated Razorpay for secure course purchases." },
      ],
      tech: [
        { category: "Frontend", details: "Next.js, JavaScript, HTML, CSS" },
        { category: "Backend", details: "Node.js" },
        { category: "Database", details: "MongoDB" },
        { category: "Payments", details: "Razorpay" },
      ],
    },
  },
  {
    slug: "tournament",
    name: "Tournament",
    blurb: "Full-stack tournament platform",
    description:
      "A full-stack platform for running tournaments — split into admin, frontend, and backend modules for managing tournaments, participants, and results. Deployed live on Vercel.",
    period: "2024",
    tags: ["React", "Node.js", "JavaScript", "Vercel"],
    github: "https://github.com/sharmajeet/Tournament",
    live: "https://tournament-nine-lyart.vercel.app",
    featured: true,
    kind: "Personal",
    detail: {
      role: "Full-Stack Developer",
      overview:
        "Tournament is a full-stack tournament management platform organised into three modules — an admin panel, a user-facing frontend, and a backend API — for creating tournaments, managing participants, and tracking results. It is deployed live on Vercel.",
      delivered: [
        { title: "Admin panel", body: "Dashboard to create and manage tournaments, participants, and fixtures." },
        { title: "Participant frontend", body: "Responsive UI for browsing tournaments and viewing live results." },
        { title: "Backend API", body: "Services powering tournament data, participants, and results." },
      ],
      tech: [
        { category: "Frontend", details: "React, JavaScript" },
        { category: "Backend", details: "Node.js" },
        { category: "Deployment", details: "Vercel" },
      ],
    },
  },
  {
    slug: "checkdin",
    name: "Checkdin",
    blurb: "Gamified professional network",
    description:
      "A professional network with gamified engagement. I built the backend — auth, referrals, leaderboards, and push/email/SMS notifications.",
    period: "Jul 2025 — Dec 2025",
    tags: ["Node.js", "Express.js", "JavaScript"],
    featured: true,
    kind: "Professional",
    detail: {
      role: "Backend Developer at TurningPoint",
      overview:
        "Checkdin is a professional networking platform with gamified engagement. I designed the backend workflows and APIs that power authentication, referrals, leaderboards, and user-engagement features, collaborating closely with the team to ship to spec.",
      delivered: [
        { title: "Core APIs", body: "Authentication, referrals, and leaderboard services built in Node.js." },
        { title: "Engagement features", body: "Gamified user-engagement workflows to drive retention." },
        { title: "Notifications", body: "Multi-channel notification services across push, email, and SMS." },
      ],
      tech: [
        { category: "Backend", details: "Node.js, Express.js, JavaScript" },
        { category: "Notifications", details: "Push, Email, SMS integration" },
      ],
    },
  },
  {
    slug: "jotion",
    name: "Jotion",
    blurb: "Collaborative note-taking app",
    description:
      "A collaborative note-taking and timetable management utility with real-time editing and a clean, modern interface.",
    period: "2024",
    tags: ["TypeScript", "React"],
    github: "https://github.com/sharmajeet/Jotion",
    featured: true,
    kind: "Personal",
    detail: {
      role: "Full-Stack Developer",
      overview:
        "Jotion is a collaborative note-taking and timetable management utility with a clean, modern interface focused on fast, distraction-free editing.",
      delivered: [
        { title: "Collaborative notes", body: "Real-time note editing with a minimal, modern document UI." },
        { title: "Timetable management", body: "Organise schedules alongside notes in one workspace." },
      ],
      tech: [
        { category: "Frontend", details: "TypeScript, React" },
      ],
    },
  },
];

export const projectsBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
