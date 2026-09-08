import axios from "axios";

/**
 * Validates a GitHub profile URL or username and extracts the username.
 * Supports:
 * - https://github.com/username
 * - http://github.com/username/
 * - github.com/username
 * - username
 */
export function extractGitHubUsername(input = "") {
  if (!input || typeof input !== "string") {
    return { valid: false, username: null, error: "GitHub URL or username is required." };
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, username: null, error: "GitHub URL or username cannot be empty." };
  }

  // Check URL pattern
  const urlMatch = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})\/?$/i);
  if (urlMatch && urlMatch[1]) {
    return { valid: true, username: urlMatch[1], error: null };
  }

  // Check standalone username pattern (GitHub allows alphanumeric and single hyphens, max 39 chars)
  const usernameMatch = trimmed.match(/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/);
  if (usernameMatch) {
    return { valid: true, username: trimmed, error: null };
  }

  return {
    valid: false,
    username: null,
    error: "Invalid GitHub URL format. Example: https://github.com/username",
  };
}

/**
 * Fetches public GitHub profile and repository information via public REST API.
 * Does NOT require authentication/token.
 */
export async function fetchGitHubData(urlOrUsername) {
  const { valid, username, error } = extractGitHubUsername(urlOrUsername);
  if (!valid) {
    return { success: false, error, data: null };
  }

  try {
    // 1. Fetch user profile
    const userRes = await axios.get(`https://api.github.com/users/${username}`, {
      timeout: 10000,
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    const user = userRes.data;

    // 2. Fetch public repositories (up to 30 most recently updated)
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      {
        timeout: 10000,
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    );

    const rawRepos = Array.isArray(reposRes.data) ? reposRes.data : [];

    // Aggregate statistics
    let totalStars = 0;
    let totalForks = 0;
    const languageCounts = {};
    const detectedSkillsSet = new Set();

    rawRepos.forEach((repo) => {
      totalStars += Number(repo.stargazers_count || 0);
      totalForks += Number(repo.forks_count || 0);

      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        detectedSkillsSet.add(repo.language);
      }

      // Check topics
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((t) => {
          if (t && t.length > 1) {
            detectedSkillsSet.add(t.charAt(0).toUpperCase() + t.slice(1));
          }
        });
      }
    });

    // Calculate top languages with count and percentage
    const totalReposWithLang = Object.values(languageCounts).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        count,
        percent: totalReposWithLang > 0 ? Math.round((count / totalReposWithLang) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Format top 6 recent repositories
    const recentRepos = rawRepos.slice(0, 6).map((r) => ({
      name: r.name,
      description: r.description || "No description provided.",
      language: r.language || "Plain Text",
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      url: r.html_url,
      updatedAt: r.updated_at,
    }));

    return {
      success: true,
      error: null,
      data: {
        username: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        bio: user.bio || "",
        publicRepos: user.public_repos ?? rawRepos.length,
        followers: user.followers ?? 0,
        totalStars,
        totalForks,
        topLanguages,
        detectedSkills: Array.from(detectedSkillsSet),
        recentRepos,
      },
    };
  } catch (err) {
    console.error("GitHub API error:", err);

    if (err.response) {
      if (err.response.status === 404) {
        return {
          success: false,
          error: `GitHub user "${username}" was not found. Please verify the username.`,
          data: null,
        };
      }
      if (err.response.status === 403) {
        return {
          success: false,
          error: "GitHub API rate limit exceeded (60 requests/hour for public API). Please try again shortly.",
          data: null,
        };
      }
      return {
        success: false,
        error: `GitHub API error (${err.response.status}): ${err.response.data?.message || "Failed to fetch profile."}`,
        data: null,
      };
    }

    if (err.code === "ECONNABORTED") {
      return {
        success: false,
        error: "GitHub API request timed out. Please check your network connection.",
        data: null,
      };
    }

    return {
      success: false,
      error: "Unable to reach GitHub API. Please check your internet connection.",
      data: null,
    };
  }
}

/**
 * Cross-references GitHub-derived skills with resume-extracted skills and required job skills.
 * Categories:
 * 1. Verified by Resume + GitHub (Strongest evidence)
 * 2. Found on Resume (Only)
 * 3. Found on GitHub (Only - hidden skills)
 * 4. Missing (Required by job but absent from both)
 */
export function crossReferenceSkills(resumeSkills = [], githubSkills = [], requiredSkillsInput = "") {
  const normalizedResume = (resumeSkills || []).map((s) => {
    const name = typeof s === "object" ? s.name : String(s);
    return name.trim();
  });

  const normalizedGithub = (githubSkills || []).map((s) => String(s).trim());

  // Parse required skills from comma/space separated input
  const requiredList = String(requiredSkillsInput || "")
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const verified = [];
  const resumeOnly = [];
  const githubOnly = [];
  const missing = [];

  const checkMatch = (skillA, skillB) => {
    const a = skillA.toLowerCase();
    const b = skillB.toLowerCase();
    return a === b || a.includes(b) || b.includes(a);
  };

  // 1. Check resume skills against GitHub
  normalizedResume.forEach((rSkill) => {
    const inGithub = normalizedGithub.some((gSkill) => checkMatch(rSkill, gSkill));
    if (inGithub) {
      if (!verified.includes(rSkill)) verified.push(rSkill);
    } else {
      if (!resumeOnly.includes(rSkill)) resumeOnly.push(rSkill);
    }
  });

  // 2. Check GitHub skills not in resume
  normalizedGithub.forEach((gSkill) => {
    const inResume = normalizedResume.some((rSkill) => checkMatch(gSkill, rSkill));
    if (!inResume && !verified.some((v) => checkMatch(v, gSkill))) {
      if (!githubOnly.includes(gSkill)) githubOnly.push(gSkill);
    }
  });

  // 3. Check required skills
  requiredList.forEach((req) => {
    const inResume = normalizedResume.some((r) => checkMatch(r, req));
    const inGithub = normalizedGithub.some((g) => checkMatch(g, req));
    if (!inResume && !inGithub) {
      if (!missing.includes(req)) missing.push(req);
    }
  });

  return {
    verified,
    resumeOnly,
    githubOnly: githubOnly.slice(0, 8),
    missing,
  };
}
