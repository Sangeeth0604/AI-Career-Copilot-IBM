export default function PlacementForm({ formData, setFormData }) {
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h2>Placement Details</h2>

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
    </div>
  );
}