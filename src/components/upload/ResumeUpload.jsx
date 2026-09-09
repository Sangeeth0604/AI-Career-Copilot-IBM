export default function ResumeUpload({ resumeFile, setResumeFile }) {
  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
      return;
    }

    setResumeFile(file);
  }

  return (
    <div className="card resume-upload-card">
      <div className="section-header-compact">
        <h2>Upload Resume</h2>
        <p className="form-subtitle">Upload candidate resume (PDF format) for ATS scoring and skill extraction</p>
      </div>

      <div className="resume-upload-wrapper">
        <input
          type="file"
          id="resume-file-input"
          accept="application/pdf"
          onChange={handleFileChange}
          className="resume-file-input"
        />

        {resumeFile && (
          <div className="selected-file-pill">
            <span>📄</span>
            <span>Selected:</span>
            <strong className="file-name">{resumeFile.name}</strong>
          </div>
        )}
      </div>
    </div>
  );
}