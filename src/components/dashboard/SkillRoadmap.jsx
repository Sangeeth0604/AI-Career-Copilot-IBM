import { useState } from "react";

export default function SkillRoadmap({
  missingSkills = [],
  companyReadiness = [],
  targetRole = "",
}) {
  const [activeWeek, setActiveWeek] = useState(1);

  // Collect unique missing skills
  const missingFromReadiness = (companyReadiness || [])
    .filter((item) => item.status === "Missing" || item.status === "missing")
    .map((item) => item.skill);

  const combinedMissing = [
    ...new Set([...(missingSkills || []), ...missingFromReadiness]),
  ];

  const displaySkills =
    combinedMissing.length > 0
      ? combinedMissing
      : ["System Design", "Cloud Infrastructure", "Unit Testing & CI/CD"];

  const primarySkillFocus = displaySkills.slice(0, 2).join(" & ");
  const secondarySkillFocus = displaySkills.slice(2, 4).join(" & ") || displaySkills[0];

  const roadmapWeeks = [
    {
      week: 1,
      title: "Week 1: Core Architecture & Fundamentals",
      phase: "Phase 1: Foundation",
      targetSkills: primarySkillFocus,
      focus: "Master core syntax, architectural mechanics, and runtime models.",
      milestone: "Complete foundational theory notes and environment setup.",
      tasks: [
        `Study architectural fundamentals and standard design patterns for ${primarySkillFocus}.`,
        "Review official documentation and core API specifications.",
        "Set up local development sandbox and run basic sample implementations.",
      ],
      estimatedHours: "6-8 Hours",
      status: "In Progress",
    },
    {
      week: 2,
      title: "Week 2: Interactive Labs & Guided Exercises",
      phase: "Phase 2: Application",
      targetSkills: secondarySkillFocus,
      focus: "Build confidence through structured coding labs and credential courses.",
      milestone: "Earn relevant IBM SkillsBuild foundational badge.",
      tasks: [
        `Complete hands-on exercise modules on IBM SkillsBuild aligned with ${displaySkills.slice(0, 3).join(", ")}.`,
        "Implement small isolated utilities to solidify state management, error handling, and data flow.",
        "Write unit tests to validate edge-case behaviors.",
      ],
      estimatedHours: "8-10 Hours",
      status: "Upcoming",
    },
    {
      week: 3,
      title: "Week 3: Production Portfolio Project",
      phase: "Phase 3: Synthesis",
      targetSkills: displaySkills.slice(0, 3).join(", "),
      focus: "Synthesize learnings into a real-world verifiable project.",
      milestone: "Working GitHub repo with comprehensive README and live demo.",
      tasks: [
        `Build an end-to-end mini project solving a concrete use-case using ${primarySkillFocus}.`,
        "Integrate REST endpoints, input validation, and responsive UI components.",
        "Document architecture, setup steps, and design trade-offs in GitHub README.",
      ],
      estimatedHours: "10-12 Hours",
      status: "Upcoming",
    },
    {
      week: 4,
      title: "Week 4: Mock Interviews & Final Polish",
      phase: "Phase 4: Readiness",
      targetSkills: targetRole || "Target Placement Role",
      focus: "Articulate design choices, discuss tradeoffs, and pass technical screens.",
      milestone: "Achieve 85%+ score on AI Mock Interview simulation.",
      tasks: [
        "Practice scenario-based interview questions using the AI Career Copilot Mock Interviewer.",
        "Refine resume bullet points with quantified impact metrics and new project links.",
        "Conduct peer review and prepare technical explanations for key architectural decisions.",
      ],
      estimatedHours: "6-8 Hours",
      status: "Upcoming",
    },
  ];

  const currentPlan = roadmapWeeks.find((w) => w.week === activeWeek) || roadmapWeeks[0];

  return (
    <div className="card roadmap-card">
      <div className="section-title-row">
        <div>
          <span className="eyebrow-tag">Actionable Upskilling</span>
          <h2>Skill Gap Closing Roadmap</h2>
          <p className="section-subtext">
            A structured 4-week milestone plan specifically tailored to bridge your detected skill gaps for{" "}
            <strong>{targetRole || "your target role"}</strong>.
          </p>
        </div>

        <div className="roadmap-skills-pill">
          <span>Priority Gap:</span>
          <strong>{displaySkills.slice(0, 3).join(", ")}</strong>
        </div>
      </div>

      {/* Week Step Selector */}
      <div className="roadmap-stepper">
        {roadmapWeeks.map((item) => (
          <button
            key={item.week}
            type="button"
            className={`roadmap-step-btn ${activeWeek === item.week ? "active" : ""}`}
            onClick={() => setActiveWeek(item.week)}
          >
            <span className="step-number">0{item.week}</span>
            <span className="step-phase">{item.phase}</span>
            <strong className="step-title">{item.title.split(":")[1]}</strong>
          </button>
        ))}
      </div>

      {/* Active Week Details */}
      <div className="roadmap-detail-panel">
        <div className="roadmap-detail-header">
          <div>
            <span className="roadmap-week-badge">Week {currentPlan.week} Focus</span>
            <h3>{currentPlan.title}</h3>
            <p className="roadmap-focus-desc">{currentPlan.focus}</p>
          </div>

          <div className="roadmap-meta-badge">
            <span>Estimated Time</span>
            <strong>{currentPlan.estimatedHours}</strong>
          </div>
        </div>

        <div className="roadmap-task-list">
          <h4>Action Items:</h4>
          <ul>
            {currentPlan.tasks.map((task, idx) => (
              <li key={idx}>
                <span className="task-bullet">✓</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="roadmap-milestone-box">
          <strong>Key Milestone:</strong> {currentPlan.milestone}
        </div>
      </div>
    </div>
  );
}
