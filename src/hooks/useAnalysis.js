import { useState } from "react";
import api from "../services/api";
import { fetchGitHubData } from "../services/github";
import { DEMO_ANALYSIS, DEMO_GITHUB_DATA } from "../data/demoData";

export default function useAnalysis() {

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(false);

  // GitHub Analysis State
  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState("");

  function loadDemoProfile() {
    setIsDemoMode(true);
    setError("");
    setLoading(false);
    setGithubLoading(false);
    setGithubError("");
    setGithubData(DEMO_GITHUB_DATA);
    setAnalysis(DEMO_ANALYSIS);
  }

  async function analyze(formData, resumeFile) {

    try {

      setIsDemoMode(false);
      setLoading(true);
      setError("");

      // Trigger GitHub Analysis in parallel if githubUrl is provided
      if (formData.githubUrl && formData.githubUrl.trim()) {
        setGithubLoading(true);
        setGithubError("");
        fetchGitHubData(formData.githubUrl)
          .then((result) => {
            if (result.success) {
              setGithubData(result.data);
              setGithubError("");
            } else {
              setGithubData(null);
              setGithubError(result.error || "Failed to analyze GitHub profile.");
            }
          })
          .catch((err) => {
            console.error("GitHub fetch error:", err);
            setGithubData(null);
            setGithubError("Failed to fetch GitHub profile.");
          })
          .finally(() => {
            setGithubLoading(false);
          });
      } else {
        setGithubData(null);
        setGithubError("");
      }

      const data = new FormData();

      data.append("studentName", formData.studentName);
      data.append("company", formData.company);
      data.append("role", formData.role);
      data.append("package", formData.package);
      data.append("requiredSkills", formData.requiredSkills);
      data.append("eligibility", formData.eligibility);
      data.append("deadline", formData.deadline);
      data.append("githubUrl", formData.githubUrl || "");

      data.append("Upload_Resume__PDF_", resumeFile);

      const response = await api.post(
        "/webhook/ai-career-copilot-ibm",
        data
      );

      console.log("========== AXIOS RESPONSE ==========");
      console.log(response);

      console.log("========== RESPONSE.DATA ==========");
      console.log(response.data);

      setAnalysis(response.data);

    } catch (err) {

      console.error(err);

      if (err.code === "ERR_NETWORK" || err.message?.includes("Network Error") || err.code === "ECONNREFUSED") {
        setError("n8n workflow is currently offline (localhost:5678). You can start your local n8n instance or click 'Load Demo Profile' to test the full Career Copilot dashboard.");
      } else {
        setError(err.response?.data?.message || "Failed to analyze resume. Check n8n service or use Demo Mode.");
      }

    } finally {

      setLoading(false);

    }

  }

  return {

    analyze,
    loading,
    analysis,
    error,
    githubData,
    githubLoading,
    githubError,
    loadDemoProfile,
    isDemoMode,

  };

}