import { useState } from "react";

import PlacementForm from "../components/upload/PlacementForm";
import ResumeUpload from "../components/upload/ResumeUpload";
import CandidateCard from "../components/dashboard/CandidateCard";
import ScoreCards from "../components/dashboard/ScoreCards";
import SkillChart from "../components/dashboard/SkillChart";
import CompanyMatrix from "../components/dashboard/CompanyMatrix";
import EvidenceViewer from "../components/evidence/EvidenceViewer";
import ResumeAnalysis from "../components/dashboard/ResumeAnalysis";
import PlacementAnalysis from "../components/dashboard/PlacementAnalysis";
import ResumeCompletenessCard from "../components/ResumeCompletenessCard";
import useAnalysis from "../hooks/useAnalysis";

export default function Home() {
  // Resume File
  const [resumeFile, setResumeFile] = useState(null);

  // Placement Form Data
  const [formData, setFormData] = useState({
    studentName: "",
    company: "",
    role: "",
    package: "",
    requiredSkills: "",
    eligibility: "",
    deadline: "",
  });

  // Custom Hook
  const { analyze, loading, analysis, error } = useAnalysis();

  // Analyze Resume
  function handleAnalyze() {
    if (!resumeFile) {
      alert("Please upload a Resume PDF.");
      return;
    }

    analyze(formData, resumeFile);
  }

  return (
    <div className="home">

      {/* Placement Details */}
      <PlacementForm
        formData={formData}
        setFormData={setFormData}
      />

      {/* Resume Upload */}
      <ResumeUpload
        resumeFile={resumeFile}
        setResumeFile={setResumeFile}
      />

      {/* Analyze Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
          {error}
        </div>
      )}

      {analysis && (
        <div className="dashboard">
          <CandidateCard candidate={analysis.candidate} />
          <ScoreCards
            resumeEngine={analysis.resumeEngine}
            placementEngine={analysis.placementEngine}
          />
          <SkillChart skills={analysis.resumeEngine.skills} />
          <CompanyMatrix readiness={analysis.ruleEngine.companyReadiness} />
          <EvidenceViewer
            requiredSkills={
              analysis.evidenceEngine?.requiredSkillEvidence || []
            }
            additionalSkills={
              analysis.evidenceEngine?.additionalSkillEvidence || []
            }
            requiredSkillsEvidenceScore={
              analysis.evidenceEngine?.requiredSkillsEvidenceScore || 0
            }
            confidenceDefinition={
              analysis.evidenceEngine?.confidenceDefinition || ""
            }
          />
          <ResumeCompletenessCard data={analysis.resumeCompleteness} />
          <ResumeAnalysis resumeEngine={analysis.resumeEngine} />
          <PlacementAnalysis placementEngine={analysis.placementEngine} />
        </div>
      )}

    </div>
  );
}