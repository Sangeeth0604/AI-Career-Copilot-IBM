export default function CompanyMatrix({ readiness = [] }) {
  if (!readiness.length) return null;

  return (
    <div className="card">
      <h2>Company Readiness Matrix</h2>

      <table className="matrix-table">
        <thead>
          <tr>
            <th>Skill</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {readiness.map((item) => (
            <tr key={item.skill}>
              <td>{item.skill}</td>
              <td className={item.status === "Ready" ? "ready" : "missing"}>
                {item.status}
              </td>
              <td>{item.score}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}