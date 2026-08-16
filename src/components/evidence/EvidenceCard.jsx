function getStatusClass(status = "") {
  const value = status.toLowerCase();

  if (value.includes("strong")) return "evidence-strong";
  if (value.includes("moderate")) return "evidence-moderate";
  if (value.includes("limited")) return "evidence-limited";

  return "evidence-none";
}

export default function EvidenceCard({ item, onClick }) {
  if (!item) return null;

  const confidence = Number(item.confidence || 0);

  return (
    <button
      type="button"
      className="evidence-card"
      onClick={() => {
        console.log("Evidence card clicked:", item);
        onClick(item);
      }}
    >
      <div className="evidence-card-header">
        <h3>{item.skill || "Unknown Skill"}</h3>

        <span className={`evidence-status ${getStatusClass(item.status)}`}>
          {item.status || "No Evidence"}
        </span>
      </div>

      <div className="evidence-confidence-row">
        <span>Evidence Confidence</span>
        <strong>{confidence}%</strong>
      </div>

      <div className="evidence-progress">
        <div
          className="evidence-progress-fill"
          style={{ width: `${Math.min(confidence, 100)}%` }}
        />
      </div>

      <div className="evidence-card-footer">
        <span>
          Mentions: {item.occurrences?.total ?? 0}
        </span>

        <span>View Evidence</span>
      </div>
    </button>
  );
}