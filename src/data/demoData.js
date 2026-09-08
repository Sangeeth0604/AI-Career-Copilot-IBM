/**
 * Realistic demo profile data for IBM SkillsBuild SkillUp Hackathon demonstration.
 * Mirrors the exact response schema expected by all dashboard components.
 */

export const DEMO_FORM_DATA = {
  studentName: "Priya Sharma",
  company: "IBM Cloud & AI Systems",
  role: "Cloud Full Stack Developer",
  package: "14 LPA",
  requiredSkills: "React, Node.js, Cloud Computing, Docker, Python, REST APIs",
  eligibility: "7.5 CGPA / B.Tech Computer Science",
  deadline: "2026-10-30",
  githubUrl: "https://github.com/priyasharma-dev",
};

export const DEMO_ANALYSIS = {
  isDemo: true,
  candidate: {
    name: "Priya Sharma",
    company: "IBM Cloud & AI Systems",
    role: "Cloud Full Stack Developer",
    package: "14 LPA",
    eligibility: "7.5 CGPA / B.Tech Computer Science",
    deadline: "2026-10-30",
  },
  resumeEngine: {
    atsScore: 88,
    technicalScore: 84,
    overallRating: 8.6,
    skills: [
      { name: "React", score: 90 },
      { name: "Node.js", score: 85 },
      { name: "JavaScript", score: 92 },
      { name: "Python", score: 80 },
      { name: "REST APIs", score: 88 },
      { name: "SQL", score: 78 },
      { name: "Git", score: 85 },
    ],
    strengths: [
      "Strong full-stack architectural design with React 18 and Node.js REST services",
      "Demonstrated hands-on database management and relational data modeling in PostgreSQL",
      "Clean modular code structure and consistent GitHub version control practices",
    ],
    weaknesses: [
      "Limited evidence of containerized cloud deployments (Docker, Kubernetes)",
      "Missing automated CI/CD pipeline integration and comprehensive unit test coverage",
    ],
    missingTechnicalSkills: ["Docker", "Cloud Computing", "Kubernetes", "CI/CD"],
    improvementSuggestions: [
      "Earn foundational cloud computing credentials through IBM SkillsBuild",
      "Containerize full-stack projects using Docker multi-stage builds",
      "Deploy sample microservices to a public cloud environment and configure automated CI/CD",
    ],
  },
  placementEngine: {
    matchScore: 82,
    requiredSkillsExplanation: [
      "React & Node.js: Highly matched with verified projects and clean component hierarchy.",
      "Python & REST APIs: Strong match supported by multiple backend service endpoints.",
      "Docker & Cloud Computing: Identified gap — prioritized for targeted upskilling.",
    ],
    preparationTips: [
      "Focus on system design fundamentals: caching, rate limiting, and API idempotency.",
      "Review container networking and multi-stage Docker build optimizations.",
      "Be prepared to explain database query indexing and ACID transaction isolation levels.",
    ],
    interviewTopics: [
      "REST API Architecture & State Management",
      "Docker Containerization & Multi-stage Builds",
      "Database Indexing & Query Optimization",
    ],
    finalRecommendation:
      "Candidate demonstrates high hireability with 82% direct role match. Closing the Docker and Cloud Computing skill gap will elevate candidate to top-tier placement readiness.",
  },
  ruleEngine: {
    companyReadiness: [
      { skill: "React", status: "Ready", score: 90 },
      { skill: "Node.js", status: "Ready", score: 85 },
      { skill: "JavaScript", status: "Ready", score: 92 },
      { skill: "Python", status: "Ready", score: 80 },
      { skill: "REST APIs", status: "Ready", score: 88 },
      { skill: "Docker", status: "Missing", score: 35 },
      { skill: "Cloud Computing", status: "Missing", score: 30 },
    ],
  },
  evidenceEngine: {
    requiredSkillsEvidenceScore: 85,
    confidenceDefinition:
      "Confidence rating reflects keyword frequency, project descriptions, and verifiable line-level citations.",
    requiredSkillEvidence: [
      {
        skill: "React",
        status: "Strong",
        confidence: 92,
        occurrences: { total: 5, skills: 1, projects: 4 },
        foundIn: ["Skills", "Projects"],
        weightBreakdown: [
          { section: "Skills", found: true, awarded: 30, weight: 30 },
          { section: "Projects", found: true, awarded: 62, weight: 70 },
        ],
        evidence: [
          {
            section: "Projects",
            project: "E-Commerce Micro-Frontend",
            lineNumber: 18,
            text: "Engineered single-page application using React 18, custom hooks, and Tailwind CSS.",
          },
          {
            section: "Projects",
            project: "Campus Placement Portal",
            lineNumber: 26,
            text: "Built student dashboard with real-time state management and accessible UI components.",
          },
        ],
        explanation: "Repeated project implementation evidence with advanced hooks and state management.",
      },
      {
        skill: "Node.js",
        status: "Strong",
        confidence: 86,
        occurrences: { total: 3, skills: 1, projects: 2 },
        foundIn: ["Skills", "Projects"],
        weightBreakdown: [
          { section: "Skills", found: true, awarded: 30, weight: 30 },
          { section: "Projects", found: true, awarded: 56, weight: 70 },
        ],
        evidence: [
          {
            section: "Projects",
            project: "Campus Placement Portal",
            lineNumber: 29,
            text: "Developed high-throughput Express REST API server with JWT authentication and middleware.",
          },
        ],
        explanation: "Backend REST service development demonstrated in multiple project contexts.",
      },
    ],
    additionalSkillEvidence: [
      {
        skill: "SQL",
        status: "Moderate",
        confidence: 78,
        occurrences: { total: 2, skills: 1, projects: 1 },
        foundIn: ["Skills", "Projects"],
        weightBreakdown: [
          { section: "Skills", found: true, awarded: 30, weight: 30 },
          { section: "Projects", found: true, awarded: 48, weight: 70 },
        ],
        evidence: [
          {
            section: "Projects",
            project: "Inventory Database",
            lineNumber: 34,
            text: "Designed normalized PostgreSQL relational schema with foreign key constraints and indexes.",
          },
        ],
        explanation: "Practical database schema design and querying demonstrated in coursework project.",
      },
    ],
  },
  resumeCompleteness: {
    overall: 92,
    sections: [
      { title: "Contact Information", present: true, score: 20, maxScore: 20 },
      { title: "Technical Skills", present: true, score: 20, maxScore: 20 },
      { title: "Projects & Portfolio", present: true, score: 30, maxScore: 30 },
      { title: "Education & Certifications", present: true, score: 22, maxScore: 30 },
    ],
  },
};

export const DEMO_GITHUB_DATA = {
  username: "priyasharma-dev",
  name: "Priya Sharma",
  avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
  profileUrl: "https://github.com",
  bio: "Full Stack & Cloud Developer | Open Source Enthusiast | Building web services with React & Node.js",
  publicRepos: 12,
  followers: 34,
  totalStars: 47,
  totalForks: 19,
  topLanguages: [
    { name: "JavaScript", count: 6, percent: 50 },
    { name: "Python", count: 3, percent: 25 },
    { name: "TypeScript", count: 2, percent: 17 },
    { name: "HTML", count: 1, percent: 8 },
  ],
  detectedSkills: ["JavaScript", "Python", "TypeScript", "React", "Node.js", "Express", "HTML", "CSS", "Git"],
  recentRepos: [
    {
      name: "placement-portal-react",
      description: "Campus recruitment dashboard built with React, Redux, and Express.",
      language: "JavaScript",
      stars: 18,
      forks: 7,
      url: "https://github.com",
      updatedAt: "2026-08-20T10:00:00Z",
    },
    {
      name: "cloud-api-gateway",
      description: "Lightweight API gateway with rate limiting and JWT auth.",
      language: "JavaScript",
      stars: 14,
      forks: 5,
      url: "https://github.com",
      updatedAt: "2026-08-15T10:00:00Z",
    },
    {
      name: "python-data-automation",
      description: "Automation scripts for aggregating resume metrics and PDF parsing.",
      language: "Python",
      stars: 9,
      forks: 4,
      url: "https://github.com",
      updatedAt: "2026-07-28T10:00:00Z",
    },
    {
      name: "microservice-auth",
      description: "Authentication service with refresh token rotation.",
      language: "TypeScript",
      stars: 6,
      forks: 3,
      url: "https://github.com",
      updatedAt: "2026-07-10T10:00:00Z",
    },
  ],
};
