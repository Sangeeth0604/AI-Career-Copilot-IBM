export default function ScoreCards({ resumeEngine = {}, placementEngine = {} }) {
  const cards = [
    {
      title: "ATS Score",
      value: resumeEngine?.atsScore ?? 0,
    },
    {
      title: "Technical Score",
      value: resumeEngine?.technicalScore ?? 0,
    },
    {
      title: "Match Score",
      value: placementEngine?.matchScore ?? 0,
    },
    {
      title: "Overall Rating",
      value: resumeEngine?.overallRating ?? 0,
    },
  ];

  return (
    <div className="score-grid">
      {cards.map((card) => (
        <div className="score-card" key={card.title}>
          <h4>{card.title}</h4>
          <div className="score-number">{card.value}</div>
        </div>
      ))}
    </div>
  );
}