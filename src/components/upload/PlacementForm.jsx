export default function PlacementForm({ formData, setFormData, onLoadDemo }) {
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="card placement-form-card">
      <div className="form-header-row">
        <div>
          <h2>Placement Details</h2>
          <p className="form-subtitle">Enter candidate target parameters or load a verified demo profile</p>
        </div>
        {onLoadDemo && (
          <button
            type="button"
            className="btn-load-demo"
            onClick={onLoadDemo}
            title="Load demo candidate profile for hackathon demonstration"
          >
            ⚡ Load Demo Profile
          </button>
        )}
      </div>

      <div className="placement-form-grid">
        <div className="form-group">
          <label htmlFor="pf-studentName" className="form-label">Student Name</label>
          <input
            id="pf-studentName"
            name="studentName"
            className="form-input"
            placeholder="e.g. Priya Sharma"
            value={formData.studentName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-company" className="form-label">Target Company</label>
          <input
            id="pf-company"
            name="company"
            className="form-input"
            placeholder="e.g. IBM Cloud & AI Systems"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-role" className="form-label">Target Role</label>
          <input
            id="pf-role"
            name="role"
            className="form-input"
            placeholder="e.g. Cloud Full Stack Developer"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-package" className="form-label">Target Package / CTC</label>
          <input
            id="pf-package"
            name="package"
            className="form-input"
            placeholder="e.g. 14 LPA"
            value={formData.package}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-span-full">
          <label htmlFor="pf-requiredSkills" className="form-label">Required Skills</label>
          <input
            id="pf-requiredSkills"
            name="requiredSkills"
            className="form-input"
            placeholder="e.g. React, Node.js, Cloud Computing, Docker, Python"
            value={formData.requiredSkills}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-eligibility" className="form-label">Eligibility Criteria</label>
          <input
            id="pf-eligibility"
            name="eligibility"
            className="form-input"
            placeholder="e.g. 7.5 CGPA / B.Tech Computer Science"
            value={formData.eligibility}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pf-deadline" className="form-label">Application Deadline</label>
          <input
            id="pf-deadline"
            type="date"
            name="deadline"
            className="form-input form-date-input"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-span-full">
          <label htmlFor="pf-githubUrl" className="form-label">GitHub Profile URL (Live Repository Verification)</label>
          <input
            id="pf-githubUrl"
            name="githubUrl"
            className="form-input"
            placeholder="GitHub Profile URL (e.g. https://github.com/username)"
            value={formData.githubUrl || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}