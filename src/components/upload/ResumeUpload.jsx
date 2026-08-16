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
    <div>
      <h2>Upload Resume</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {resumeFile && (
        <p>Selected File: {resumeFile.name}</p>
      )}
    </div>
  );
}