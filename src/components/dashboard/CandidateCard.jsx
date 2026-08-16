export default function CandidateCard({ candidate }) {
  if (!candidate) return null;

  return (
    <div className="card candidate-card">
      <h2>{candidate.name}</h2>

      <div className="candidate-grid">
        <div>
          <span>Company</span>
          <strong>{candidate.company}</strong>
        </div>

        <div>
          <span>Role</span>
          <strong>{candidate.role}</strong>
        </div>

        <div>
          <span>Package</span>
          <strong>{candidate.package}</strong>
        </div>

        <div>
          <span>Eligibility</span>
          <strong>{candidate.eligibility}</strong>
        </div>

        <div>
          <span>Deadline</span>
          <strong>{candidate.deadline}</strong>
        </div>
      </div>
    </div>
  );
}