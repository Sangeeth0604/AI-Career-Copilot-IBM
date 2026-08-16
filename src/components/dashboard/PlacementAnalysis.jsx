export default function PlacementAnalysis({ placementEngine = {} }) {
  const requiredSkillsExplanation =
    placementEngine.requiredSkillsExplanation || [];

  const preparationTips =
    placementEngine.preparationTips || [];

  const interviewTopics =
    placementEngine.interviewTopics || [];

  const finalRecommendation =
    placementEngine.finalRecommendation || "No final recommendation available.";

  function renderList(items) {
    if (!items.length) {
      return <p className="empty-text">No data available.</p>;
    }

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="analysis-grid">
      <div className="card">
        <h2>Required Skills Explanation</h2>
        {renderList(requiredSkillsExplanation)}
      </div>

      <div className="card">
        <h2>Preparation Tips</h2>
        {renderList(preparationTips)}
      </div>

      <div className="card">
        <h2>Interview Topics</h2>
        {renderList(interviewTopics)}
      </div>

      <div className="card">
        <h2>Final Recommendation</h2>
        <p>{finalRecommendation}</p>
      </div>
    </div>
  );
}