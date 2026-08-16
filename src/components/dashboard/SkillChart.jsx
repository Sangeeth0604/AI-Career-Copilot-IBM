export default function SkillChart({ skills = [] }) {
  if (!skills.length) return null;

  return (
    <div className="card">
      <h2>Skill Analysis</h2>

      <div className="skill-list">
        {skills.map((skill) => (
          <div className="skill-row" key={skill.name}>
            <div className="skill-info">
              <span>{skill.name}</span>
              <strong>{skill.score}%</strong>
            </div>

            <div className="skill-bar">
              <div
                className="skill-fill"
                style={{ width: `${skill.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}