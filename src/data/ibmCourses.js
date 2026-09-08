// Verified catalog of official IBM SkillsBuild learning resources mapped to key technical skill domains
export const IBM_SKILLSBUILD_COURSES = [
  {
    id: "ibm-ai-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    provider: "IBM SkillsBuild",
    badge: "Artificial Intelligence Fundamentals",
    category: "Artificial Intelligence",
    duration: "10 Hours",
    skills: [
      "AI",
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Neural Networks",
      "AI Ethics",
      "Python",
      "Data Science",
    ],
    description:
      "Learn foundational concepts of artificial intelligence, including machine learning, deep learning, natural language processing, computer vision, and AI ethics.",
    url: "https://skillsbuild.org/",
  },
  {
    id: "ibm-exploring-cloud-computing",
    title: "Exploring Cloud Computing",
    provider: "IBM SkillsBuild",
    badge: "Exploring Cloud Computing",
    category: "Cloud Computing",
    duration: "4 Hours",
    skills: [
      "Cloud",
      "Cloud Computing",
      "Infrastructure",
      "IaaS",
      "PaaS",
      "SaaS",
      "Docker",
      "DevOps",
      "Virtualization",
      "AWS",
      "Azure",
      "Microservices",
    ],
    description:
      "Explore core concepts of cloud computing, deployment models, cloud architecture, and how cloud technologies transform data storage and accessibility.",
    url: "https://skillsbuild.org/",
  },
  {
    id: "ibm-cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    provider: "IBM SkillsBuild",
    badge: "Cybersecurity Fundamentals",
    category: "Cybersecurity",
    duration: "6 Hours",
    skills: [
      "Cybersecurity",
      "Security",
      "Network Security",
      "Cryptography",
      "Authentication",
      "Threat Intelligence",
      "Compliance",
      "Linux",
      "OWASP",
    ],
    description:
      "Understand fundamental concepts of cybersecurity, common cyber threats, defense mechanisms, cryptography, and security operations.",
    url: "https://skillsbuild.org/",
  },
  {
    id: "ibm-web-development-basics",
    title: "Web Development Basics",
    provider: "IBM SkillsBuild",
    badge: "Web Development Basics",
    category: "Web Development",
    duration: "6 Hours",
    skills: [
      "Web Development",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Frontend",
      "REST",
      "API",
      "Web Design",
    ],
    description:
      "Learn foundational building blocks to develop, test, and deploy websites, gaining familiarity with core languages including HTML, CSS, and JavaScript.",
    url: "https://skillsbuild.org/",
  },
  {
    id: "ibm-agile-explorer",
    title: "Agile Explorer",
    provider: "IBM SkillsBuild",
    badge: "Agile Explorer",
    category: "Professional Skills",
    duration: "7 Hours",
    skills: [
      "Agile",
      "Scrum",
      "Kanban",
      "Sprint Planning",
      "Collaboration",
      "Project Management",
      "Teamwork",
      "Git",
      "CI/CD",
    ],
    description:
      "Discover Agile principles, values, and practices to foster collaboration, rapid feedback loops, and continuous improvement in project delivery.",
    url: "https://skillsbuild.org/",
  },
];

/**
 * Returns IBM SkillsBuild courses matched to candidate's missing skills and target role.
 */
export function getRecommendedCourses(missingSkills = [], targetRole = "") {
  const normalizedMissing = (missingSkills || []).map((s) =>
    String(s).toLowerCase().trim()
  );
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
