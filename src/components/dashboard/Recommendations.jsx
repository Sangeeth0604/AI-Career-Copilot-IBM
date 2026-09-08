import { getRecommendedCourses } from "../../data/ibmCourses";

export default function Recommendations({ missingSkills = [], targetRole = "" }) {
  const recommendedCourses = getRecommendedCourses(missingSkills, targetRole);

  if (!recommendedCourses.length) return null;

  return (
    <div className="card ibm-recommendations-card">
      <div className="section-title-row">
        <div>
          <span className="eyebrow-tag ibm-tag">IBM SkillsBuild Alignment</span>
          <h2>IBM SkillsBuild Learning Recommendations</h2>
          <p className="section-subtext">
            Bridge your specific skill gaps with industry-recognized learning pathways and credentials from IBM SkillsBuild.
          </p>
        </div>

        <div className="ibm-badge-pill">
          <span>Platform:</span>
          <strong>IBM SkillsBuild</strong>
        </div>
      </div>

      <div className="ibm-courses-grid">
        {recommendedCourses.map((course) => (
          <div className="ibm-course-card" key={course.id}>
            <div className="ibm-course-top">
              <span className="ibm-course-category">{course.category}</span>
              {course.duration && (
                <span className="ibm-course-duration">{course.duration}</span>
              )}
            </div>

            <h3 className="ibm-course-title">{course.title}</h3>
            <p className="ibm-course-desc">{course.description}</p>

            {course.badge && (
              <div className="ibm-course-meta">
                <span className="ibm-badge-label">
                  Credential: <strong>{course.badge}</strong>
                </span>
              </div>
            )}

            {course.matchedSkills && course.matchedSkills.length > 0 && (
              <div className="ibm-gap-target">
                <span>Targets Your Gaps:</span>
                <div className="ibm-skill-tags">
                  {course.matchedSkills.map((s) => (
                    <span className="ibm-skill-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="ibm-course-action">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ibm-enroll-btn"
              >
                Enroll on IBM SkillsBuild ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
