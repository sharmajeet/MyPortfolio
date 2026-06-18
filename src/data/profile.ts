// Update this to your actual career start; the "Years experience" stat is computed
// from it and auto-updates over time. (month is 0-indexed: 11 = December)
const EXPERIENCE_START = new Date(2024, 11, 1);

function yearsOfExperience(): string {
  const now = new Date();
  const months = Math.max(
    0,
    (now.getFullYear() - EXPERIENCE_START.getFullYear()) * 12 + (now.getMonth() - EXPERIENCE_START.getMonth()),
  );
  return (months / 12).toFixed(1);
}

export const profile = {
  name: "Jeet Sharma",
  role: "Software Developer",
  roles: [
    "Node.js & Backend Developer",
    "Cloud & DevOps · AWS · Azure",
    ".NET Engineer (C#)",
    "Distributed Systems",
  ],
  tagline: "I build scalable full-stack systems",
  location: "Ahmedabad, India",
  availability: "Open to opportunities · Across India",
  email: "jeetsharma2003.dev@gmail.com",
  phone: "+91-6355388151",
  github: "https://github.com/sharmajeet",
  linkedin: "https://www.linkedin.com/in/sharma-jeet/",
  resumeUrl: "/Jeet_Sharma_Resume.pdf",
  summary:
    "I'm a backend developer focused on scale. In just over a year, I've shipped features for Boardroom — an enterprise equity platform used by listed companies across nine stock exchanges — and built distributed microservice backends end to end with Node.js and .NET.",
  stats: [
    { value: yearsOfExperience(), label: "Years experience" },
    { value: "8.3", label: "B.Tech CGPA" },
    { value: "10+", label: "Projects shipped" },
  ],
};
