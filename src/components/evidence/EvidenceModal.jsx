function formatLabel(value = "") {
  return String(value)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

export default function EvidenceModal({ item, onClose }) {
  if (!item) return null;

  const occurrences = item.occurrences || {};
  const evidence = Array.isArray(item.evidence) ? item.evidence : [];
  const weightBreakdown = Array.isArray(item.weightBreakdown)
    ? item.weightBreakdown
    : [];

  return (
    <div className="evidence-modal-backdrop" onClick={onClose}>
      <div
        className="evidence-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="evidence-modal-header">
          <div>
            <p className="evidence-modal-label">Skill Evidence</p>
            <h2>{item.skill}</h2>
          </div>

          <button
            type="button"
            className="evidence-close-button"
            onClick={onClose}
            aria-label="Close evidence viewer"
          >
            ×
          </button>
        </div>

        <div className="evidence-modal-summary">
          <div>
            <span>Evidence Confidence</span>
            <strong>{item.confidence ?? 0}%</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{item.status || "No Evidence"}</strong>
          </div>

          <div>
            <span>Total Mentions</span>
            <strong>{occurrences.total ?? 0}</strong>
          </div>
        </div>

        <section className="evidence-modal-section">
          <h3>Where It Was Found</h3>

          <div className="evidence-tag-list">
            {(item.foundIn || []).length ? (
              item.foundIn.map((section) => (
                <span className="evidence-tag" key={section}>
                  {section}
                </span>
              ))
            ) : (
              <p className="evidence-empty">No section evidence found.</p>
            )}
          </div>
        </section>

        <section className="evidence-modal-section">
          <h3>Occurrence Breakdown</h3>

          <div className="occurrence-grid">
            {Object.entries(occurrences)
              .filter(([key]) => key !== "total")
              .map(([key, value]) => (
                <div className="occurrence-item" key={key}>
                  <span>{formatLabel(key)}</span>
                  <strong>{value}</strong>
                </div>
              ))}
          </div>
        </section>

        <section className="evidence-modal-section">
          <h3>Confidence Breakdown</h3>

          <div className="weight-list">
            {weightBreakdown.map((entry) => (
              <div className="weight-row" key={entry.section}>
                <div>
                  <strong>{entry.section}</strong>
                  <span>
                    {entry.found ? "Evidence found" : "No evidence found"}
                  </span>
                </div>

                <strong>
                  {entry.awarded}/{entry.weight}
                </strong>
              </div>
            ))}
          </div>
        </section>

        <section className="evidence-modal-section">
          <h3>Evidence Snippets</h3>

          <div className="evidence-snippet-list">
            {evidence.length ? (
              evidence.map((entry, index) => (
                <article
                  className="evidence-snippet"
                  key={`${entry.lineNumber}-${index}`}
                >
                  <div className="evidence-snippet-meta">
                    <span>{entry.section}</span>

                    {entry.project && <span>{entry.project}</span>}

                    {entry.lineNumber && (
                      <span>Line {entry.lineNumber}</span>
                    )}
                  </div>

                  <p>{entry.text}</p>
                </article>
              ))
            ) : (
              <p className="evidence-empty">
                No direct evidence snippet was found.
              </p>
            )}
          </div>
        </section>

        <section className="evidence-modal-section">
          <h3>Explanation</h3>
          <p className="evidence-explanation">
            {item.explanation || "No explanation available."}
          </p>
        </section>
      </div>
    </div>
  );
}