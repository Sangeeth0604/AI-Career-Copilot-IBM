const CAREER_TRACKS = [
  {
    title: "Cloud & DevOps Engineer",
    category: "Infrastructure & Automation",
    description: "Designs scalable cloud environments, CI/CD pipelines, and manages containerized microservices.",
    coreSkills: ["Cloud", "Docker", "Linux", "Kubernetes", "CI/CD", "AWS", "Python", "Git"],
  },
  {
    title: "Full Stack Application Developer",
    category: "Software Engineering",
    description: "Builds responsive client-facing interfaces and robust RESTful API backend architectures.",
    coreSkills: ["React", "JavaScript", "Node.js", "REST", "SQL", "HTML", "CSS", "TypeScript", "Git"],
  },
  {
    title: "Data & AI Systems Engineer",
    category: "Data Science & Intelligence",
    description: "Develops data pipelines, applies predictive machine learning models, and integrates AI capabilities.",
    coreSkills: ["Python", "SQL", "Machine Learning", "Data Analysis", "Pandas", "AI", "Databases"],
  },
  {
    title: "Backend Platform Engineer",
    category: "Distributed Systems",
    description: "Engineers high-throughput microservices, database schemas, and secure authentication systems.",
    coreSkills: ["Node.js", "Python", "SQL", "REST", "Databases", "Authentication", "Docker", "Microservices"],
  },
];

export default function CareerPathCard({ skills = [], role = "", customPaths = null }) {
  // If provided directly by n8n, use customPaths
  if (Array.isArray(customPaths) && customPaths.length > 0) {
    return (
      <div className="card career-paths-card">
        <div className="section-title-row">
          <div>
            <span className="eyebrow-tag">Career Trajectory</span>
            <h2>Recommended Career Pathways</h2>
            <p className="section-subtext">Alternative and aligned roles based on your verified skill profile.</p>
          </div>
        </div>

        <div className="career-grid">
          {customPaths.map((path) => (
            <div className="career-card" key={path.title}>
              <div className="career-card-top">
                <span className="career-category">{path.category || "Technology"}</span>
                <span className="career-score">{path.matchScore || path.match}% Match</span>
              </div>
              <h3>{path.title}</h3>
              <p>{path.description || path.reasoning}</p>
              {path.missingSkills?.length > 0 && (
                <div className="career-skills-gap">
                  <span>Skills to gain:</span>
                  <div className="career-tags">
                    {path.missingSkills.map((s) => (
                      <span className="career-tag missing" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Derive intelligently from candidate's extracted skills
  const candidateSkillNames = (skills || []).map((s) => String(s.name || s).toLowerCase());

  const scoredTracks = CAREER_TRACKS.map((track) => {
    const matched = [];
    const missing = [];

    track.coreSkills.forEach((skill) => {
      const lower = skill.toLowerCase();
      const isMatch = candidateSkillNames.some(
        (cs) => cs.includes(lower) || lower.includes(cs)
      );
      if (isMatch) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const baseScore = Math.round((matched.length / track.coreSkills.length) * 100);
    // Role similarity bonus if applicable
    const roleMatchBonus = track.title.toLowerCase().includes(String(role).toLowerCase()) ? 10 : 0;
    const finalScore = Math.min(96, Math.max(45, baseScore + roleMatchBonus));

    return {
      ...track,
      matchScore: finalScore,
      matchedSkills: matched,
      missingSkills: missing.slice(0, 3),
    };
  });

  scoredTracks.sort((a, b) => b.matchScore - a.matchScore);
  const topTracks = scoredTracks.slice(0, 3);

  return (
    <div className="card career-paths-card">
      <div className="section-title-row">
        <div>
          <span className="eyebrow-tag">Career Trajectory</span>
          <h2>Recommended Career Pathways</h2>
          <p className="section-subtext">
            Based on your verified skills and target ambitions, here are the top 3 high-alignment career tracks.
          </p>
        </div>
      </div>

      <div className="career-grid">
        {topTracks.map((track) => (
          <div className="career-card" key={track.title}>
            <div className="career-card-top">
              <span className="career-category">{track.category}</span>
              <span className="career-score">{track.matchScore}% Match</span>
            </div>

            <h3>{track.title}</h3>
            <p>{track.description}</p>

            <div className="career-skills-section">
              <span className="career-section-label">Matched Skills:</span>
              <div className="career-tags">
                {track.matchedSkills.length > 0 ? (
                  track.matchedSkills.map((s) => (
                    <span className="career-tag matched" key={s}>
                      ✔ {s}
                    </span>
                  ))
                ) : (
                  <span className="career-tag neutral">Foundational</span>
                )}
              </div>
            </div>

            <div className="career-skills-section">
              <span className="career-section-label">High-Impact Skills to Gain:</span>
              <div className="career-tags">
                {track.missingSkills.map((s) => (
                  <span className="career-tag to-gain" key={s}>
                    + {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
