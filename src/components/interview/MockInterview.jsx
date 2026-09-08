import { useState, useId } from "react";

export default function MockInterview({
  interviewTopics = [],
  role = "",
  preparationTips = [],
}) {
  const answerInputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Generate 3 questions based on existing interviewTopics
  const activeTopics = (interviewTopics && interviewTopics.length > 0)
    ? interviewTopics.slice(0, 3)
    : [
        "REST API Architecture & State Management",
        "Database Indexing & Query Optimization",
        "Error Handling & Production Debugging",
      ];

  const questions = activeTopics.map((topic, index) => {
    return {
      id: index + 1,
      topic,
      role: role || "Software Engineer",
      prompt: generateQuestionPrompt(topic, role),
      keywords: extractKeywords(topic),
      modelAnswer: generateModelAnswer(topic),
    };
  });

  const currentQ = questions[currentIndex] || questions[0];
  const currentAnswer = answers[currentQ.id] || "";
  const currentFeedback = feedbacks[currentQ.id];

  function handleAnswerChange(e) {
    setAnswers({
      ...answers,
      [currentQ.id]: e.target.value,
    });
  }

  function evaluateAnswer() {
    if (!currentAnswer.trim() || currentAnswer.trim().length < 15) {
      alert("Please enter a more detailed response before requesting feedback (at least a few sentences).");
      return;
    }

    setIsEvaluating(true);

    // Evaluate answer against topic keywords and depth
    setTimeout(() => {
      const text = currentAnswer.toLowerCase();
      const words = currentAnswer.trim().split(/\s+/).length;
      const matchedKeywords = currentQ.keywords.filter((kw) =>
        text.includes(kw.toLowerCase())
      );

      let score = 5;
      const strengths = [];
      const improvements = [];

      // Length scoring
      if (words >= 40) {
        score += 2;
        strengths.push("Good response length and structured explanation.");
      } else if (words >= 20) {
        score += 1;
        strengths.push("Direct and concise initial thoughts.");
      } else {
        improvements.push("Elaborate further with specific architectural or code-level examples.");
      }

      // Keyword & Technical Depth scoring
      if (matchedKeywords.length >= 2) {
        score += 2.5;
        strengths.push(`Strong technical vocabulary used (e.g. ${matchedKeywords.join(", ")}).`);
      } else if (matchedKeywords.length === 1) {
        score += 1.5;
        strengths.push(`Referenced core concept: ${matchedKeywords[0]}.`);
        improvements.push(`Consider mentioning additional related concepts such as ${currentQ.keywords.filter(k => !matchedKeywords.includes(k)).slice(0, 2).join(", ")}.`);
      } else {
        improvements.push(`Incorporate key domain terminology such as ${currentQ.keywords.slice(0, 3).join(", ")}.`);
      }

      // Structure check
      if (text.includes("for example") || text.includes("because") || text.includes("trade-off") || text.includes("first")) {
        score += 1;
        strengths.push("Demonstrated clear reasoning and cause-and-effect thinking.");
      } else {
        improvements.push("Structure your answer using concrete scenarios, trade-offs, or the STAR format.");
      }

      const finalScore = Math.min(10, Math.max(4, Math.round(score * 10) / 10));

      const evaluation = {
        score: finalScore,
        strengths,
        improvements: improvements.length ? improvements : ["Solid answer. Practice delivering this fluently within a 90-second window."],
        modelAnswer: currentQ.modelAnswer,
      };

      setFeedbacks({
        ...feedbacks,
        [currentQ.id]: evaluation,
      });

      setIsEvaluating(false);
    }, 600);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsComplete(false);
    }
  }

  function calculateAggregateScore() {
    const scoredList = Object.values(feedbacks).map((f) => f.score);
    if (!scoredList.length) return 0;
    const avg = scoredList.reduce((a, b) => a + b, 0) / scoredList.length;
    return Math.round(avg * 10) / 10;
  }

  return (
    <div className="card mock-interview-container">
      <div className="section-title-row">
        <div>
          <span className="eyebrow-tag">AI Interactive Simulation</span>
          <h2>AI Technical Mock Interview</h2>
          <p className="section-subtext">
            Practice answering role-tailored technical questions generated from your placement requirements with instant AI feedback.
          </p>
        </div>

        <button
          type="button"
          className="interview-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Collapse Interview" : "Launch Mock Interview Session"}
        </button>
      </div>

      {isOpen && (
        <div className="interview-body">
          {!isComplete ? (
            <>
              {/* Question Progress Header */}
              <div className="interview-nav-header">
                <div className="interview-step-pill">
                  Question {currentIndex + 1} of {questions.length}
                </div>
                <div className="interview-topic-tag">
                  Topic: <strong>{currentQ.topic}</strong>
                </div>
              </div>

              {/* Question Card */}
              <div className="interview-question-box">
                <span className="q-label">Interview Question:</span>
                <p className="q-prompt">{currentQ.prompt}</p>
              </div>

              {/* Answer Input */}
              <div className="interview-input-box">
                <label htmlFor={answerInputId} className="input-label">
                  Your Answer:
                  <span className="input-hint">
                    (Structure clearly with technical rationale and practical experience)
                  </span>
                </label>
                <textarea
                  id={answerInputId}
                  className="interview-textarea"
                  rows={6}
                  placeholder="Explain your approach, key considerations, and how you would implement this in a production system..."
                  value={currentAnswer}
                  onChange={handleAnswerChange}
                />
                <div className="textarea-footer">
                  <span>Word count: {currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0} words</span>
                  <button
                    type="button"
                    className="submit-feedback-btn"
                    onClick={evaluateAnswer}
                    disabled={isEvaluating || !currentAnswer.trim()}
                  >
                    {isEvaluating ? "Analyzing Answer..." : "Submit for AI Feedback"}
                  </button>
                </div>
              </div>

              {/* Feedback Display */}
              {currentFeedback && (
                <div className="feedback-result-panel">
                  <div className="feedback-header">
                    <div>
                      <span className="feedback-eyebrow">AI Evaluation</span>
                      <h3>Answer Assessment</h3>
                    </div>
                    <div className="feedback-score-badge">
                      <span className="score-label">Score</span>
                      <strong className="score-val">{currentFeedback.score} / 10</strong>
                    </div>
                  </div>

                  <div className="feedback-columns">
                    <div className="feedback-col strengths">
                      <h4>✔ Strong Points</h4>
                      <ul>
                        {currentFeedback.strengths.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="feedback-col improvements">
                      <h4>⚠ Opportunities to Improve</h4>
                      <ul>
                        {currentFeedback.improvements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="model-answer-box">
                    <strong>Industry Model Answer:</strong>
                    <p>{currentFeedback.modelAnswer}</p>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="interview-actions-row">
                <button
                  type="button"
                  className="interview-nav-btn"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  ← Previous Question
                </button>

                <button
                  type="button"
                  className="interview-nav-btn primary"
                  onClick={handleNext}
                >
                  {currentIndex === questions.length - 1
                    ? "Complete Session →"
                    : "Next Question →"}
                </button>
              </div>
            </>
          ) : (
            /* Interview Complete Summary */
            <div className="interview-summary-card">
              <div className="summary-score-circle">
                <strong>{calculateAggregateScore()}</strong>
                <span>Avg / 10</span>
              </div>
              <h3>Mock Interview Completed!</h3>
              <p>
                You successfully completed practice responses for <strong>{questions.length}</strong> core topics.
              </p>

              {preparationTips.length > 0 && (
                <div className="interview-tips-box">
                  <h4>Key Preparation Guidance from Analysis:</h4>
                  <ul>
                    {preparationTips.slice(0, 3).map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="restart-interview-btn"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsComplete(false);
                }}
              >
                Review & Retry Questions
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helpers to dynamically generate contextual questions & model answers from topics
function generateQuestionPrompt(topic = "", role = "") {
  const t = String(topic).toLowerCase();
  if (t.includes("api") || t.includes("rest")) {
    return `In a production ${role || "web"} environment, how do you design RESTful APIs to ensure idempotency, graceful error handling, and backwards compatibility?`;
  }
  if (t.includes("database") || t.includes("sql") || t.includes("index")) {
    return `Explain how database indexes work under the hood. What are the performance trade-offs of adding indexes on high-write tables, and how do you diagnose slow queries?`;
  }
  if (t.includes("docker") || t.includes("container") || t.includes("devops")) {
    return `How do you containerize a multi-service application with Docker? What strategies do you use for multi-stage builds to optimize image size and security?`;
  }
  if (t.includes("async") || t.includes("concurrency") || t.includes("thread")) {
    return `How does asynchronous execution work in modern web runtimes? Walk through how you avoid race conditions and handle unhandled promise rejections.`;
  }
  if (t.includes("system") || t.includes("design") || t.includes("scale")) {
    return `Walk us through how you would architect a high-availability notification or caching system handling 50,000 requests per minute. What trade-offs would you evaluate?`;
  }
  return `How have you applied ${topic} in your previous projects? Discuss an architectural challenge you encountered with it and how you resolved it.`;
}

function extractKeywords(topic = "") {
  const clean = String(topic).replace(/[^a-zA-Z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 3);
  return clean.concat(["latency", "scalability", "architecture", "error handling", "performance"]);
}

function generateModelAnswer(topic = "") {
  const t = String(topic).toLowerCase();
  if (t.includes("api") || t.includes("rest")) {
    return "A senior response begins by defining HTTP status semantics (200, 201, 400, 404, 500) and using Idempotency-Keys for non-safe methods (POST). Versioning is handled cleanly via URL prefixes (/v1) or Accept headers. Input validation is decoupled via schemas, and errors follow RFC 7807 problem details with actionable error codes.";
  }
  if (t.includes("database") || t.includes("sql") || t.includes("index")) {
    return "An exemplary response highlights B-Tree data structures, where indexes provide O(log N) lookups but introduce write overhead on INSERT/UPDATE due to index maintenance. Diagnosis begins with EXPLAIN ANALYZE to identify sequential scans and missing composite index coverage on multi-column filter queries.";
  }
  if (t.includes("docker") || t.includes("container")) {
    return "The ideal response emphasizes multi-stage builds (separating compile tooling from minimal distroless/alpine runtime images), avoiding running containers as root, configuring health checks, and utilizing docker-compose for deterministic multi-service networking.";
  }
  return `An exemplary answer frames the problem, explains the structural mechanics of ${topic}, articulates two architectural trade-offs considered (e.g. latency vs consistency, complexity vs maintainability), and concludes with production monitoring and validation metrics.`;
}
