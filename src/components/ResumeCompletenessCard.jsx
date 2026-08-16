import "./ResumeCompletenessCard.css";

function ResumeCompletenessCard({ data }) {

    if (!data) return null;

    return (
        <div className="resume-completeness-card">

            <h2>Resume Completeness</h2>

            <div className="overall-score">
                <span>{data.overall}%</span>
                <p>Overall Completeness</p>
            </div>

            <div className="section-list">

                {data.sections.map(section => (

                    <div
                        key={section.title}
                        className="section-row"
                    >

                        <span>

                            {section.present ? "✔" : "✖"}

                            {" "}

                            {section.title}

                        </span>

                        <span>

                            {section.score}/{section.maxScore}

                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ResumeCompletenessCard;