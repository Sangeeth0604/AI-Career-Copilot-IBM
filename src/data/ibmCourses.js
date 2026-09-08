// Curated catalog of official IBM SkillsBuild courses mapped to key technical skill domains
export const IBM_SKILLSBUILD_COURSES = [
  {
    id: "ibm-cloud-foundations",
    title: "Getting Started with Cloud Computing",
    provider: "IBM SkillsBuild",
    badge: "Cloud Computing Fundamentals",
    category: "Cloud & DevOps",
    level: "Beginner",
    duration: "6 Hours",
    skills: ["Cloud", "AWS", "Azure", "Docker", "DevOps", "Infrastructure", "Microservices"],
    description: "Understand core cloud architecture concepts, deployment models (IaaS, PaaS, SaaS), and containerized application hosting.",
    url: "https://skillsbuild.org/students",
  },
  {
    id: "ibm-ai-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    provider: "IBM SkillsBuild",
    badge: "AI Foundations Credential",
    category: "Artificial Intelligence",
    level: "Beginner / Intermediate",
    duration: "10 Hours",
    skills: ["AI", "Machine Learning", "Python", "Data Science", "Deep Learning", "NLP", "LLM"],
    description: "Learn fundamental AI and machine learning principles, neural network concepts, ethical AI, and practical data modeling.",
    url: "https://skillsbuild.org/students",
  },
  {
    id: "ibm-data-sql",
    title: "Working with Data and SQL",
    provider: "IBM SkillsBuild",
    badge: "Data & SQL Specialist",
    category: "Data & Databases",
    level: "Beginner",
    duration: "8 Hours",
    skills: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Databases", "Data Analysis", "Database Design"],
    description: "Master relational database querying, relational schemas, indexing, joins, and aggregating data for real-world applications.",
    url: "https://skillsbuild.org/students",
  },
  {
    id: "ibm-cybersecurity-basics",
    title: "Cybersecurity Fundamentals",
    provider: "IBM SkillsBuild",
    badge: "Cybersecurity Explorer",
    category: "Security",
    level: "Beginner",
    duration: "8 Hours",
    skills: ["Security", "Cybersecurity", "Authentication", "Network", "Linux", "OWASP", "Encryption"],
    description: "Explore the threat landscape, secure coding basics, identity management, and network defense principles.",
    url: "https://skillsbuild.org/students",
  },
  {
    id: "ibm-web-development",
    title: "Web Development Core Concepts",
    provider: "IBM SkillsBuild",
    badge: "Web Development Foundations",
    category: "Software Development",
    level: "Intermediate",
    duration: "12 Hours",
    skills: ["React", "JavaScript", "HTML", "CSS", "Node.js", "Express", "REST", "API", "TypeScript", "Frontend"],
    description: "Build interactive modern web applications using modern JavaScript frameworks, responsive styling, and RESTful APIs.",
    url: "https://skillsbuild.org/students",
  },
  {
    id: "ibm-agile-practitioner",
    title: "Agile Methodology & Team Collaboration",
    provider: "IBM SkillsBuild",
    badge: "Agile Explorer Credential",
    category: "Professional Skills",
    level: "All Levels",
    duration: "5 Hours",
    skills: ["Agile", "Scrum", "Git", "Collaboration", "Project Management", "Jira", "CI/CD"],
    description: "Learn industry-standard agile rituals, sprint planning, backlog management, and collaborative software delivery practices.",
    url: "https://skillsbuild.org/students",
  },
  {
    id: "ibm-python-data-science",
    title: "Python for Applied Data & Automation",
    provider: "IBM SkillsBuild",
    badge: "Python Applied Credential",
    category: "Programming",
    level: "Beginner / Intermediate",
    duration: "10 Hours",
    skills: ["Python", "Pandas", "NumPy", "Automation", "Scripting", "Data Visualization"],
    description: "Gain hands-on experience using Python for automation, data manipulation, algorithm design, and API consumption.",
    url: "https://skillsbuild.org/students",
  },
];

/**
 * Returns IBM SkillsBuild courses matched to candidate's missing skills and target role.
 */
export function getRecommendedCourses(missingSkills = [], targetRole = "") {
  const normalizedMissing = (missingSkills || []).map((s) => String(s).toLowerCase().trim());
  const roleLower = String(targetRole || "").toLowerCase();

  const scored = IBM_SKILLSBUILD_COURSES.map((course) => {
    let matchCount = 0;
    const matchedSkills = [];

    course.skills.forEach((skill) => {
      const skillLower = skill.toLowerCase();
      const isMissing = normalizedMissing.some(
        (m) => m.includes(skillLower) || skillLower.includes(m)
      );
      if (isMissing) {
        matchCount += 3;
        matchedSkills.push(skill);
      } else if (roleLower.includes(skillLower)) {
        matchCount += 1;
      }
    });

    return {
      ...course,
      relevanceScore: matchCount,
      matchedSkills: [...new Set(matchedSkills)],
    };
  });

  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return scored.slice(0, 4);
}
