export default function PlacementForm({ formData, setFormData, onLoadDemo }) {
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <div className="form-header-row">
        <h2>Placement Details</h2>
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

      <input
        name="studentName"
        placeholder="Student Name"
        value={formData.studentName}
        onChange={handleChange}
      />

      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />

      <input
        name="package"
        placeholder="Package"
        value={formData.package}
        onChange={handleChange}
      />

      <input
        name="requiredSkills"
        placeholder="Required Skills"
        value={formData.requiredSkills}
        onChange={handleChange}
      />

      <input
        name="eligibility"
        placeholder="Eligibility"
        value={formData.eligibility}
        onChange={handleChange}
      />

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
      />

      <input
        name="githubUrl"
        placeholder="GitHub Profile URL (e.g. https://github.com/username)"
        value={formData.githubUrl || ""}
        onChange={handleChange}
      />
    </div>
  );
}