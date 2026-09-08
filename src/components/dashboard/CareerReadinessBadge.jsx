export default function CareerReadinessBadge({
  resumeEngine = {},
  placementEngine = {},
  evidenceEngine = {},
  resumeCompleteness = {},
}) {
  const ats = Number(resumeEngine?.atsScore ?? 0);
  const technical = Number(resumeEngine?.technicalScore ?? 0);
  const match = Number(placementEngine?.matchScore ?? 0);
  const evidence = Number(evidenceEngine?.requiredSkillsEvidenceScore ?? 0);
  const completeness = Number(resumeCompleteness?.overall ?? 0);

  // Unified Career Readiness Score (Weighted)
  const readinessScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ats * 0.2 +
        technical * 0.25 +
        match * 0.25 +
        evidence * 0.15 +
        completeness * 0.15
      )
    )
  );

  let tier = {
    label: "Foundational Phase",
    className: "readiness-developing",
    advice: "Follow the 4-week structured skill roadmap and complete foundational IBM SkillsBuild credentials to build competitive readiness.",
  };

  if (readinessScore >= 80) {
    tier = {
      label: "Industry & Placement Ready",
      className: "readiness-ready",
      advice: "Your profile demonstrates strong alignment with technical demands and verifiable skills. Focus on mock interview preparation.",
    };
  } else if (readinessScore >= 60) {
    tier = {
      label: "Nearly Ready — Targeted Upskilling Needed",
      className: "readiness-moderate",
      advice: "Solid technical core detected. Close remaining skill gaps using the recommended IBM SkillsBuild courses below.",
    };
  }

  return (
    <div className="card readiness-banner">
      <div className="readiness-main">
        <div className="readiness-score-ring">
          <div className="readiness-value">{readinessScore}%</div>
          <span className="readiness-label">Readiness Index</span>
        </div>

        <div className="readiness-info">
          <div className="readiness-header-row">
            <span className="readiness-eyebrow">IBM Career Copilot Synthesis</span>
            <span className={`readiness-badge ${tier.className}`}>
              {tier.label}
            </span>
          </div>

          <h2>Job & Career Readiness Score</h2>
          <p className="readiness-advice">{tier.advice}</p>

          <div className="readiness-breakdown">
            <div className="breakdown-pill">
              <span>ATS Score</span>
              <strong>{ats}%</strong>
            </div>
            <div className="breakdown-pill">
              <span>Technical Depth</span>
              <strong>{technical}%</strong>
            </div>
            <div className="breakdown-pill">
              <span>Role Match</span>
              <strong>{match}%</strong>
            </div>
            <div className="breakdown-pill">
              <span>Verified Evidence</span>
              <strong>{evidence}%</strong>
            </div>
            <div className="breakdown-pill">
              <span>Resume Completeness</span>
              <strong>{completeness}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
