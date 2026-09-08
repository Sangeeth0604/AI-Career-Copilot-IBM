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
import CareerReadinessBadge from "../components/dashboard/CareerReadinessBadge";
import CareerPathCard from "../components/dashboard/CareerPathCard";
import SkillRoadmap from "../components/dashboard/SkillRoadmap";
import Recommendations from "../components/dashboard/Recommendations";
import MockInterview from "../components/interview/MockInterview";
import GitHubAnalysisCard from "../components/dashboard/GitHubAnalysisCard";
import useAnalysis from "../hooks/useAnalysis";
import { DEMO_FORM_DATA } from "../data/demoData";

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
    githubUrl: "",
  });

  // Custom Hook
  const {
    analyze,
    loading,
    analysis,
    error,
    githubData,
    githubLoading,
    githubError,
    loadDemoProfile,
    isDemoMode,
  } = useAnalysis();

  // Analyze Resume
  function handleAnalyze() {
    if (!resumeFile) {
      alert("Please upload a Resume PDF.");
      return;
    }

    analyze(formData, resumeFile);
  }

  // Explicit Load Demo Profile action
  function handleLoadDemo() {
    setFormData(DEMO_FORM_DATA);
    loadDemoProfile();
  }

  return (
    <div className="home">

      {/* Placement Details */}
      <PlacementForm
        formData={formData}
        setFormData={setFormData}
        onLoadDemo={handleLoadDemo}
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

      {/* Error / Fallback Option */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button
            type="button"
            className="btn-error-fallback"
            onClick={handleLoadDemo}
          >
            ⚡ Load Demo Profile Instead
          </button>
        </div>
      )}

      {analysis && (
        <div className="dashboard">
          {/* Demo Profile Indicator Banner (Requirement 8) */}
          {(isDemoMode || analysis.isDemo) && (
            <div className="demo-profile-banner">
              <div className="demo-badge">DEMO PROFILE</div>
              <div className="demo-text">
                <strong>Hackathon Demo Mode Active:</strong> Displaying simulated candidate assessment data. All interactive features (Readiness Index, Skill Roadmap, IBM SkillsBuild Recommendations, Mock Interview & Feedback) are fully active and testable.
              </div>
            </div>
          )}

          {/* P0.7: Unified Career Readiness Score */}
          <CareerReadinessBadge
            resumeEngine={analysis.resumeEngine}
            placementEngine={analysis.placementEngine}
            evidenceEngine={analysis.evidenceEngine}
            resumeCompleteness={analysis.resumeCompleteness}
          />

          {/* Candidate Profile Details */}
          <CandidateCard candidate={analysis.candidate} />

          {/* GitHub Developer Profile & Skill Cross-Reference */}
          <GitHubAnalysisCard
            githubData={githubData}
            loading={githubLoading}
            error={githubError}
            resumeSkills={analysis.resumeEngine?.skills}
            requiredSkills={formData.requiredSkills}
          />

          {/* Core Score Cards */}
          <ScoreCards
            resumeEngine={analysis.resumeEngine}
            placementEngine={analysis.placementEngine}
          />

          {/* P0.2: Career Path Recommendations */}
          <CareerPathCard
            skills={analysis.resumeEngine?.skills}
            role={analysis.candidate?.role}
            customPaths={analysis.careerPaths}
          />

          {/* Verified Skills Chart */}
          <SkillChart skills={analysis.resumeEngine?.skills} />

          {/* Company Skill Matrix */}
          <CompanyMatrix readiness={analysis.ruleEngine?.companyReadiness} />

          {/* P0.3: Skill Gap Closing Roadmap */}
          <SkillRoadmap
            missingSkills={analysis.resumeEngine?.missingTechnicalSkills}
            companyReadiness={analysis.ruleEngine?.companyReadiness}
            targetRole={analysis.candidate?.role}
          />

          {/* P0.4: IBM SkillsBuild Course Recommendations */}
          <Recommendations
            missingSkills={analysis.resumeEngine?.missingTechnicalSkills}
            targetRole={analysis.candidate?.role}
          />

          {/* P0.5 & P0.6: Interactive AI Mock Interview & Feedback */}
          <MockInterview
            interviewTopics={analysis.placementEngine?.interviewTopics}
            role={analysis.candidate?.role}
            preparationTips={analysis.placementEngine?.preparationTips}
          />

          {/* Explainable Evidence Viewer */}
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

          {/* Resume Completeness Checklist */}
          <ResumeCompletenessCard data={analysis.resumeCompleteness} />

          {/* Detailed Resume Strengths & Weaknesses */}
          <ResumeAnalysis resumeEngine={analysis.resumeEngine} />

          {/* Placement Interview Guidance */}
          <PlacementAnalysis placementEngine={analysis.placementEngine} />
        </div>
      )}

    </div>
  );
}