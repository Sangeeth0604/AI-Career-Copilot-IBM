# IBM AI Career Copilot

**An Intelligent Placement Assistant & SkillsBuild Pathway Navigator**  
*Built for the IBM SkillsBuild SkillUp Hackathon — Student AI Track*

---

## Overview

**IBM AI Career Copilot** is an intelligent, multidimensional career readiness platform designed to empower students transitioning from academic studies into competitive technical careers. 

The application helps students:
* **Analyze resumes** against target role requirements and Applicant Tracking System (ATS) standards.
* **Assess career readiness** through a unified, weighted readiness index combining ATS scoring, technical depth, and verified GitHub project activity.
* **Validate skills using GitHub** by cross-referencing self-reported resume skills against empirical repository statistics and programming language volume.
* **Identify career paths** by highlighting primary, secondary, and stretch trajectory options with market demand and salary expectations.
* **Generate skill-gap roadmaps** structured into achievable 30-day, 60-day, and 90-day learning milestones with capstone project recommendations.
* **Recommend verified IBM SkillsBuild learning resources** mapped directly to detected technical deficiencies.
* **Practice mock interviews** with dynamic, role-tailored technical and behavioral interview questions.
* **Receive interview feedback** featuring instant scoring, model answers, and targeted improvement strategies.

---

## 1. Problem

Graduating engineering and computer science students face substantial barriers during campus placements and job searches:
* **ATS Keyword Pitfalls:** Over 70% of resumes are filtered out by automated screening software before a recruiter ever reviews them due to poor keyword alignment and formatting issues.
* **The "Unverified Skills" Dilemma:** Self-reported resume bullet points fail to demonstrate authentic coding competence to technical hiring managers.
* **Overwhelming Skill Deficits:** Students recognize they lack competencies (e.g., cloud fundamentals, testing, CI/CD) but lack a prioritized timeline to bridge those gaps.
* **Interview Anxiety & Lack of Practice:** Generic interview guides fail to provide realistic, role-specific simulations with structured, actionable feedback.

---

## 2. Solution

The **IBM AI Career Copilot** acts as a personal AI career mentor and placement accelerator. By synthesizing multi-source data—student resumes, target job descriptions, live GitHub repositories, and official **IBM SkillsBuild** curriculum—the platform provides an actionable, end-to-end preparation roadmap.

Students receive immediate diagnostic insight into where they stand, verifiable proof of their practical capabilities, and a structured curriculum to reach placement readiness.

---

## 3. Key Features

| Feature | Description |
| :--- | :--- |
| **Unified Career Readiness Score** | A weighted index synthesizing ATS Match (35%), Technical Score (35%), and GitHub Code Verification (30%) with clear placement readiness tiers. |
| **GitHub Empirical Verification** | Live repository audit tracking total repositories, stars, forks, commit velocity, and language distribution, cross-referenced against claimed resume skills. |
| **Career Pathways Explorer** | Dynamic trajectory recommendations (Primary, Secondary, Stretch) showing target role requirements, market demand, and compensation trends. |
| **30-60-90 Day Skill Roadmap** | Prioritized milestone progression breaking down high-priority skills, weekly time investment, and verifiable capstone projects. |
| **IBM SkillsBuild Recommendations** | Direct mapping of detected skill gaps to official, verified foundational courses on the IBM SkillsBuild platform. |
| **Interactive AI Mock Interview** | Role-tailored behavioral and technical interview simulation with integrated timer, answer submission, and detailed rubrics. |
| **Interview Coaching & Feedback** | Granular response evaluation outlining strengths, areas for improvement, model answer guidance, and confidence indicators. |
| **High-Availability Demo Mode** | Instant offline fallback allowing complete, deterministic demonstration of all copilot features without external workflow dependencies. |

---

## 4. How It Works

1. **Input Job Target & Resume:** The student specifies their target company, role, package expectations, and uploads their resume (PDF/DOCX) or inputs their profile details.
2. **GitHub Profile Connection:** The student provides their GitHub username for empirical repository analysis.
3. **Multidimensional Assessment:**
   * In **Live Mode**, the application transmits the resume and JD to an n8n AI workflow for deep natural language analysis.
   * In **Demo Mode**, the application instantly loads a comprehensive candidate profile (*Priya Sharma*) with deterministic analysis data.
4. **Skills Verification:** The platform queries the GitHub REST API, calculates code volume by language, and cross-references them with skills extracted from the resume.
5. **Dashboard Generation:** The user explores their Unified Readiness Score, Career Pathways, Skill-Gap Roadmap, verified IBM SkillsBuild courses, and initiates their personalized Mock Interview.

---

## 5. Architecture

The application follows a clean, decoupled architecture that clearly separates build-time development tools, client presentation, backend workflow orchestration, and external resources:

```
+-------------------------------------------------------------------------------+
|                       1. DEVELOPMENT / ENGINEERING                            |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   |                       IBM Bob Agentic AI Partner                      |   |
|   |   - Architectural planning & system decomposition                     |   |
|   |   - Component scaffolding & refactoring (React 19)                    |   |
|   |   - GitHub API cross-referencing algorithm generation                 |   |
|   |   - Deterministic offline demo mode & fallback engineering            |   |
|   |   - IBM SkillsBuild catalog verification & skill-matching logic       |   |
|   +-----------------------------------------------------------------------+   |
+---------------------------------------+---------------------------------------+
                                        |
                                        v  (Build-Time Toolchain)
+-------------------------------------------------------------------------------+
|                     2. RUNTIME CLIENT APPLICATION                             |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   |                     React 19 + Vite + Tailwind CSS                    |   |
|   |   - Student Dashboard UI & Input Form                                 |   |
|   |   - Unified Career Readiness Score Engine                             |   |
|   |   - Career Pathways & Skill Roadmap Visualizers                       |   |
|   |   - Verified IBM SkillsBuild Recommendation Cards                     |   |
|   |   - Interactive Mock Interview & Coaching Interface                   |   |
|   +-----------------------------------+-----------------------------------+   |
+---------------------------------------|---------------------------------------+
                                        |
         +------------------------------+------------------------------+
         |                                                             |
         v (If n8n service online)                                     v (If offline or "Load Demo")
+-----------------------------------+         +-------------------------------------+
|         Live AI Analysis          |         |         Demo Fallback Engine        |
|                                   |         |                                     |
|  - n8n Local Workflow Engine      |         |  - Built-in Deterministic Dataset   |
|  - Multi-agent Resume Analysis    |         |  - Standalone Offline Resilience    |
|  - Gemini / watsonx Integrations  |         |  - Zero Network Dependency          |
+-----------------------------------+         +-------------------------------------+
         |                                                             |
         +------------------------------+------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                         3. EXTERNAL DATA INTEGRATIONS                         |
|                                                                               |
|   - GitHub Public REST API (Live repository metrics & language verification)  |
|   - Official IBM SkillsBuild Catalog (Verified courses & direct credentials)  |
+-------------------------------------------------------------------------------+
```

> **Important Architecture Note:** IBM Bob serves as the **build-time development and engineering partner** that scaffolded and built this application. It is **not** a runtime API or client-side dependency in the deployed web application.

---

## 6. Technology Stack

* **Frontend Framework:** React 19, Vite 8.1
* **Styling & UI:** Tailwind CSS, Custom Glassmorphic Styles, React Icons
* **Charts & Visualizations:** Recharts (Radar charts, skill bars, progress meters)
* **Client Architecture:** Custom React Hooks (`useAnalysis.js`), Axios for REST requests
* **Development & Engineering Tool:** **IBM Bob** (Agentic AI Developer Partner)
* **Static Analysis & Bundling:** Oxlint, Vite Rollup Engine
* **Live Workflow Orchestrator:** n8n Workflow Automation (Multi-agent resume parsing)
* **External APIs:** GitHub REST API v3, Official IBM SkillsBuild verified catalog

---

## 7. IBM SkillsBuild Integration

The application bridges identified student skill gaps with verified learning resources from the **IBM SkillsBuild** platform.

### Verified Course Catalog
To guarantee credibility and ensure students earn real credentials, the application maps gaps to official foundational IBM SkillsBuild courses:

1. **Artificial Intelligence Fundamentals**  
   *Topics:* AI concepts, machine learning, deep learning, ethics, NLP  
   *Target Gaps:* AI, Machine Learning, Python, Data Science
2. **Exploring Cloud Computing**  
   *Topics:* Cloud deployment models, IaaS/PaaS/SaaS, microservices, cloud security  
   *Target Gaps:* Cloud Computing, AWS, Azure, DevOps, Docker
3. **Cybersecurity Fundamentals**  
   *Topics:* Network security, encryption, threat analysis, incident response  
   *Target Gaps:* Cybersecurity, Network Security, Ethical Hacking, Information Security
4. **Web Development Basics**  
   *Topics:* Modern web development, HTML5, CSS3, JavaScript, web standards  
   *Target Gaps:* Web Development, Frontend, React, JavaScript, HTML/CSS
5. **Agile Explorer**  
   *Topics:* Agile manifesto, Scrum, Kanban, iterative development  
   *Target Gaps:* Agile, Scrum, Project Management, Software Engineering Practices

Each course recommendation features an official description, skill mappings, estimated completion duration, and a direct URL to start learning on the official IBM SkillsBuild platform.

---

## 8. IBM Bob Development Process

In alignment with the hackathon's Student AI Track requirements, **IBM Bob** was utilized as our primary **agentic AI development partner** throughout the software development lifecycle:

* **Architectural Decomposition:** IBM Bob helped plan the transition from a simple placement tool into a full Career Copilot, establishing modular boundaries between live workflow calls and offline fallbacks.
* **Component Scaffolding:** Bob generated and structured the React 19 components for the `UnifiedScoreCard`, `CareerPathCard`, `SkillRoadmap`, `GitHubAnalysisCard`, and `MockInterview`.
* **Cross-Referencing Algorithms:** Bob engineered the verification logic in `src/services/github.js` that compares empirical repository language distributions against resume bullet points.
* **Offline Resilience Engineering:** Bob assisted in designing `demoData.js` and configuring graceful fallback handlers in `useAnalysis.js`, enabling reliable offline demonstrations when external services are unavailable.
* **Verification & Linting:** Bob guided code refactoring to achieve zero warnings under `oxlint` and zero errors during `vite build`.

For a complete record of the development journey, prompts, and architectural decisions, see [IBM_BOB_DEV_LOG.md](IBM_BOB_DEV_LOG.md).

---

## 9. GitHub Integration

Self-reported skills on resumes are often inflated or outdated. The Copilot integrates with the **GitHub Public REST API** to validate practical implementation:

1. **Repository Audit:** Retrieves the candidate's public repositories, star counts, fork metrics, and commit activity.
2. **Language Frequency Analysis:** Aggregates byte-level programming language usage across repositories.
3. **Cross-Referencing Matrix:**
   * **Verified:** Skill appears in resume and is backed by substantial GitHub repositories.
   * **Unverified:** Skill claimed in resume but has no public code backing.
   * **Additional Strengths:** Technologies actively used in GitHub repositories that the candidate forgot to list on their resume.
4. **Practical Score Contribution:** Contributes 30% to the overall Unified Career Readiness Score.

---

## 10. Live Mode and Demo Mode

The application provides a resilient dual-mode architecture:

### Live Mode (n8n Workflow Connected)
* Operates when the local or hosted n8n service is running at `http://localhost:5678`.
* Transmits candidate resume text and target job specifications to an n8n webhook.
* Executes multi-agent AI resume parsing, ATS scoring, and contextual placement analysis.

### Demo Mode (Offline Fallback)
* Accessible via the prominent **"Load Demo Profile"** button on the placement form.
* Automatically engaged as a graceful fallback if n8n is offline or unreachable, displaying a clear amber banner informing the user that Demo Mode is active.
* Loads a deterministic candidate profile (*Priya Sharma*, Target: *Frontend Developer* at *TCS / Infosys*, Package: *7.5 LPA*).
* Populates all dashboard visualizers, GitHub empirical metrics, IBM SkillsBuild courses, and mock interview questions with zero external network dependencies.
* **Integrity Guarantee:** Demo Mode is explicitly labeled as a deterministic demonstration fallback and is never misrepresented as live AI output.

---

## 11. Local Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Sangeeth0604/AI-Career-Copilot-IBM.git
   cd AI-Career-Copilot-IBM
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173/`.

4. *(Optional) Start n8n for Live Mode:*
   If you wish to test live resume parsing via n8n:
   ```bash
   npx n8n
   ```
   Import the placement analysis workflow and ensure the webhook listens on `http://localhost:5678/webhook/analyze-resume`.  
   *Note: If n8n is not running, simply click "Load Demo Profile" to evaluate all features instantly.*

---

## 12. Project Structure

```
AI-Career-Copilot-IBM/
├── public/                       # Static public assets and SVG icons
├── src/
│   ├── assets/                   # Images and branding assets
│   ├── components/
│   │   ├── common/               # Loader and Error notification components
│   │   ├── dashboard/            # Core Copilot visualizers
│   │   │   ├── CandidateCard.jsx         # Candidate profile & target company info
│   │   │   ├── CareerPathCard.jsx        # Primary, secondary & stretch career pathways
│   │   │   ├── CareerReadinessBadge.jsx  # Unified Career Readiness Score badge
│   │   │   ├── CompanyMatrix.jsx         # Target company eligibility & deadlines
│   │   │   ├── GitHubAnalysisCard.jsx    # GitHub empirical verification & cross-reference
│   │   │   ├── PlacementAnalysis.jsx     # Comprehensive placement summary
│   │   │   ├── Recommendations.jsx       # IBM SkillsBuild learning recommendations
│   │   │   ├── ResumeAnalysis.jsx        # Resume strengths & improvement points
│   │   │   ├── ScoreCards.jsx            # Disaggregate ATS & technical score cards
│   │   │   ├── SkillChart.jsx            # Skill breakdown chart
│   │   │   └── SkillRoadmap.jsx          # 30-60-90 day milestone roadmap
│   │   ├── evidence/             # Resume evidence extraction & viewer modal
│   │   ├── interview/
│   │   │   └── MockInterview.jsx         # Interactive mock interview & AI coaching
│   │   ├── layout/               # Header navbar and footer
│   │   └── upload/
│   │       ├── PlacementForm.jsx         # Job target input & "Load Demo Profile" button
│   │       └── ResumeUpload.jsx          # File drag-and-drop resume parser
│   ├── data/
│   │   ├── demoData.js           # Deterministic candidate profile for Demo Mode
│   │   └── ibmCourses.js         # Verified IBM SkillsBuild course catalog & matcher
│   ├── hooks/
│   │   └── useAnalysis.js        # State management & dual-mode execution hook
│   ├── pages/
│   │   └── Home.jsx              # Main application page & fallback banner
│   ├── services/
│   │   ├── api.js                # Live n8n webhook API service
│   │   └── github.js             # GitHub REST API service & skill cross-referencer
│   ├── styles/
│   │   └── global.css            # Responsive layout & theme styles
│   ├── App.jsx                   # Root component
│   └── main.jsx                  # Application entry point
├── IBM_BOB_DEV_LOG.md            # Comprehensive IBM Bob engineering log
├── README.md                     # Project documentation
├── package.json                  # Dependencies & scripts
└── vite.config.js                # Vite build configuration
```

---

## 13. Testing

### Production Build Test
Verify that all assets bundle without errors:
```bash
npm run build
```

### Static Analysis & Lint Test
Verify code quality and clean syntax:
```bash
npm run lint
```

### Offline Fallback Test
1. Ensure no service is running on port 5678.
2. Launch the app (`npm run dev`) and visit `http://localhost:5173/`.
3. Click **"Load Demo Profile"**.
4. Confirm all cards, GitHub analysis, verified IBM SkillsBuild recommendations, and the mock interview are loaded immediately.

---

## 14. Future Improvements

* **Direct IBM SkillsBuild OAuth:** Enable students to log into their IBM SkillsBuild account to directly track completed badges and certificates.
* **Audio-Enabled Mock Interview:** Integrate Web Speech API for voice-driven mock interviews with speech-to-text transcription and vocal delivery analysis.
* **Dynamic GitHub Commit Velocity:** Deepen GitHub analysis by calculating weekly commit consistency over 12 months using GraphQL.
* **Automated ATS Resume Formatter:** Generate an optimized, ATS-compliant PDF resume directly from the dashboard incorporating suggested keyword enhancements.

---

## Acknowledgments & Attribution

* **Engineering Partner:** Scaffolded and engineered with **IBM Bob** (Agentic AI Developer Partner).
* **Learning Resources:** Powered by verified foundational courses from **IBM SkillsBuild**.
* **Developed for:** IBM SkillsBuild SkillUp Hackathon — Student AI Track.
