import { crossReferenceSkills } from "../../services/github";

export default function GitHubAnalysisCard({
  githubData,
  loading = false,
  error = null,
  resumeSkills = [],
  requiredSkills = "",
}) {
  // If loading GitHub profile
  if (loading) {
    return (
      <div className="card github-analysis-card">
        <div className="section-title-row">
          <div>
            <span className="eyebrow-tag github-tag">Public GitHub Analysis</span>
            <h2>GitHub Developer Activity</h2>
            <p className="section-subtext">Fetching public repositories and language statistics...</p>
          </div>
        </div>
        <div className="github-loading-state">
          <p>Connecting to GitHub Public REST API...</p>
        </div>
      </div>
    );
  }

  // If there was an error fetching GitHub data
  if (error) {
    return (
      <div className="card github-analysis-card github-card-error">
        <div className="section-title-row">
          <div>
            <span className="eyebrow-tag github-tag">Public GitHub Analysis</span>
            <h2>GitHub Developer Activity</h2>
          </div>
          <span className="github-status-pill error">Notice</span>
        </div>
        <div className="github-error-box">
          <p className="github-error-msg">{error}</p>
          <span className="github-fallback-note">
            Note: Resume analysis remains unaffected. You can verify the username or re-analyze.
          </span>
        </div>
      </div>
    );
  }

  // If no GitHub URL was provided or no data yet
  if (!githubData) {
    return null;
  }

  const {
    username,
    name,
    avatarUrl,
    profileUrl,
    bio,
    publicRepos,
    totalStars,
    totalForks,
    topLanguages = [],
    detectedSkills = [],
    recentRepos = [],
  } = githubData;

  // Cross-reference with resume skills
  const crossRef = crossReferenceSkills(resumeSkills, detectedSkills, requiredSkills);

  return (
    <div className="card github-analysis-card">
      <div className="section-title-row">
        <div>
          <span className="eyebrow-tag github-tag">Public GitHub Analysis</span>
          <h2>GitHub Developer Activity</h2>
          <p className="section-subtext">
            Deterministic code metrics derived directly from GitHub Public REST API.
          </p>
        </div>

        <div className="github-source-badge">
          <span>Data Source:</span>
          <strong>GitHub Public REST API</strong>
        </div>
      </div>

      {/* GitHub Profile Banner */}
      <div className="github-profile-row">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${username} avatar`}
            className="github-avatar"
          />
        )}
        <div className="github-profile-info">
          <div className="github-name-line">
            <h3>{name}</h3>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-handle"
            >
              @{username} ↗
            </a>
          </div>
          {bio && <p className="github-bio">{bio}</p>}
        </div>

        {/* Quick Stats Grid */}
        <div className="github-stat-pill-grid">
          <div className="github-stat-pill">
            <span>Repositories</span>
            <strong>{publicRepos}</strong>
          </div>
          <div className="github-stat-pill">
            <span>Total Stars</span>
            <strong>★ {totalStars}</strong>
          </div>
          <div className="github-stat-pill">
            <span>Total Forks</span>
            <strong>⑂ {totalForks}</strong>
          </div>
        </div>
      </div>

      {/* Top Languages Section */}
      <div className="github-sub-section">
        <h3>Primary Repository Languages</h3>
        {topLanguages.length > 0 ? (
          <div className="github-lang-list">
            {topLanguages.map((lang) => (
              <div className="github-lang-row" key={lang.name}>
                <div className="github-lang-info">
                  <span>{lang.name}</span>
                  <strong>{lang.count} {lang.count === 1 ? "repo" : "repos"} ({lang.percent}%)</strong>
                </div>
                <div className="github-lang-bar">
                  <div
                    className="github-lang-fill"
                    style={{ width: `${Math.min(100, Math.max(8, lang.percent))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="github-empty-text">No primary languages detected in public repositories.</p>
        )}
      </div>

      {/* Cross-Referenced Skills Section (Requirement 7) */}
      <div className="github-sub-section">
        <div className="github-crossref-header">
          <h3>Resume & GitHub Skill Cross-Reference</h3>
          <span className="github-truth-label">Dual-Source Verification</span>
        </div>

        <div className="github-crossref-grid">
          {/* 1. Verified by Resume + GitHub */}
          <div className="crossref-card verified">
            <div className="crossref-card-title">
              <span className="crossref-badge-icon">✔</span>
              <div>
                <strong>Verified by Resume + GitHub</strong>
                <span>Highest confidence: Claimed & Proven in Code</span>
              </div>
            </div>
            <div className="crossref-tags">
              {crossRef.verified.length > 0 ? (
                crossRef.verified.map((s) => (
                  <span className="crossref-tag tag-verified" key={s}>
                    {s}
                  </span>
                ))
              ) : (
                <span className="crossref-empty">No overlapping skills found.</span>
              )}
            </div>
          </div>

          {/* 2. Found on Resume Only */}
          <div className="crossref-card resume-only">
            <div className="crossref-card-title">
              <span className="crossref-badge-icon">📄</span>
              <div>
                <strong>Found on Resume</strong>
                <span>Stated on resume without public repo code</span>
              </div>
            </div>
            <div className="crossref-tags">
              {crossRef.resumeOnly.length > 0 ? (
                crossRef.resumeOnly.map((s) => (
                  <span className="crossref-tag tag-resume" key={s}>
                    {s}
                  </span>
                ))
              ) : (
                <span className="crossref-empty">None</span>
              )}
            </div>
          </div>

          {/* 3. Found on GitHub Only */}
          <div className="crossref-card github-only">
            <div className="crossref-card-title">
              <span className="crossref-badge-icon">💻</span>
              <div>
                <strong>Found on GitHub</strong>
                <span>Active code detected but omitted from resume</span>
              </div>
            </div>
            <div className="crossref-tags">
              {crossRef.githubOnly.length > 0 ? (
                crossRef.githubOnly.map((s) => (
                  <span className="crossref-tag tag-github" key={s}>
                    {s}
                  </span>
                ))
              ) : (
                <span className="crossref-empty">None</span>
              )}
            </div>
          </div>

          {/* 4. Missing Skills */}
          {crossRef.missing.length > 0 && (
            <div className="crossref-card missing-all">
              <div className="crossref-card-title">
                <span className="crossref-badge-icon">✖</span>
                <div>
                  <strong>Missing Required Skills</strong>
                  <span>Required by target role, absent from both</span>
                </div>
              </div>
              <div className="crossref-tags">
                {crossRef.missing.map((s) => (
                  <span className="crossref-tag tag-missing" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Public Repositories */}
      <div className="github-sub-section">
        <h3>Recent Public Repositories</h3>
        {recentRepos.length > 0 ? (
          <div className="github-repo-grid">
            {recentRepos.map((repo) => (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-card"
                key={repo.name}
              >
                <div className="github-repo-header">
                  <span className="github-repo-name">{repo.name}</span>
                  <span className="github-repo-stars">★ {repo.stars}</span>
                </div>
                <p className="github-repo-desc">{repo.description}</p>
                <div className="github-repo-footer">
                  <span className="github-repo-lang">{repo.language}</span>
                  {repo.forks > 0 && <span>⑂ {repo.forks}</span>}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="github-empty-text">No public repositories found for this account.</p>
        )}
      </div>

      {/* Explicit Non-AI Attribution Disclaimer (Requirement 8) */}
      <div className="github-disclaimer-box">
        <strong>GitHub Verification Standard:</strong> All GitHub statistics and repositories displayed here are extracted directly from the GitHub Public API and are NOT generated by an AI/LLM.
      </div>
    </div>
  );
}
