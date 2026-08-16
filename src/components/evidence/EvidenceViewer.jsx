import { useState } from "react";
import EvidenceCard from "./EvidenceCard";
import EvidenceModal from "./EvidenceModal";

export default function EvidenceViewer({
  requiredSkills = [],
  additionalSkills = [],
  requiredSkillsEvidenceScore = 0,
  confidenceDefinition = "",
}) {
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const hasRequiredSkills = requiredSkills.length > 0;
  const hasAdditionalSkills = additionalSkills.length > 0;

  console.log("Selected evidence:", selectedEvidence);

  if (!hasRequiredSkills && !hasAdditionalSkills) {
    return null;
  }

  return (
    <>
      <section className="card evidence-viewer">
        <div className="evidence-viewer-header">
          <div>
            <p className="evidence-eyebrow">Explainable Analysis</p>
            <h2>Required Skills Evidence</h2>
            <p>
              Resume evidence supporting each skill required by the company.
            </p>
          </div>

          <div className="required-evidence-score">
            <span>Required Skills Evidence Score</span>
            <strong>{requiredSkillsEvidenceScore}%</strong>
          </div>
        </div>

        {hasRequiredSkills ? (
          <div className="evidence-grid">
            {requiredSkills.map((item) => (
              <EvidenceCard
                key={`required-${item.normalizedSkill || item.skill}`}
                item={item}
                onClick={setSelectedEvidence}
              />
            ))}
          </div>
        ) : (
          <p className="evidence-empty">
            No required skill evidence is available.
          </p>
        )}

        {hasAdditionalSkills && (
          <div className="additional-evidence-section">
            <div className="evidence-section-heading">
              <h2>Additional Resume Skills</h2>
              <p>
                Skills found in the resume that were not listed as job requirements.
              </p>
            </div>

            <div className="evidence-grid">
              {additionalSkills.map((item) => (
                <EvidenceCard
                  key={`additional-${item.normalizedSkill || item.skill}`}
                  item={item}
                  onClick={setSelectedEvidence}
                />
              ))}
            </div>
          </div>
        )}

        {confidenceDefinition && (
          <div className="evidence-disclaimer">
            <strong>How to read this:</strong> {confidenceDefinition}
          </div>
        )}
      </section>

      <EvidenceModal
        item={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />
    </>
  );
}