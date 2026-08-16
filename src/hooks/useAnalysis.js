import { useState } from "react";
import api from "../services/api";

export default function useAnalysis() {

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  async function analyze(formData, resumeFile) {

    try {

      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("studentName", formData.studentName);
      data.append("company", formData.company);
      data.append("role", formData.role);
      data.append("package", formData.package);
      data.append("requiredSkills", formData.requiredSkills);
      data.append("eligibility", formData.eligibility);
      data.append("deadline", formData.deadline);

      data.append("Upload_Resume__PDF_", resumeFile);

      const response = await api.post(
        "/webhook/ai-placement-assistant",
        data
      );

      console.log("========== AXIOS RESPONSE ==========");
      console.log(response);

      console.log("========== RESPONSE.DATA ==========");
      console.log(response.data);

      setAnalysis(response.data);

    } catch (err) {

      console.error(err);

      setError("Failed to analyze resume.");

    } finally {

      setLoading(false);

    }

  }

  return {

    analyze,
    loading,
    analysis,
    error

  };

}