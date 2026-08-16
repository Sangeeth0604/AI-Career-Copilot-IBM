export default function ResumeAnalysis({ resumeEngine = {} }) {
  return (
    <div className="analysis-grid">
      <div className="card">
        <h2>Resume Strengths</h2>
        <ul>
          {(resumeEngine.strengths || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Resume Weaknesses</h2>
        <ul>
          {(resumeEngine.weaknesses || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Missing Technical Skills</h2>
        <ul>
          {(resumeEngine.missingTechnicalSkills || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Improvement Suggestions</h2>
        <ul>
          {(resumeEngine.improvementSuggestions || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}