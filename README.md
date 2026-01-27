<!-- v0 -->
# osct-frontend

🌐 Open Source Contribution Tracker (OSCT)

A full-stack MERN application designed to help users track their open-source contributions, organize PR details, monitor statuses, and analyse progress through filters, search, and sorting.

🗂️ Backend Repository

The backend for this project is hosted in a separate GitHub repository:

👉 https://github.com/SayoojSb/osct-backend

It contains:
Express.js server
MongoDB model
JWT auth
CRUD APIs
Pagination, search, sorting, filtering logic

🚀 Live Demo Links
🔹 Frontend (Netlify):

👉 https://open-source-contribution-tracker.netlify.app

🔹 Backend (Render):

👉 https://osct-backend-1.onrender.com

🔐 Test Credentials
email: sa@mail.com
password: letsgo123

📌 Features
🔑 Authentication (JWT)

Signup

Login

Protected Routes (Dashboard, CRUD pages)

🧩 Contribution CRUD
Feature	Done
➕ Add Contribution	✅
📄 View All (with pagination)	✅
🔍 Get Single Contribution	✅
✏️ Edit Contribution	✅
❌ Delete Contribution	✅
🔁 Update PR Status (PATCH)	✅
🔎 Advanced Backend Features
Functionality	Status
Pagination	✅
Search (title + repo)	✅
Filtering (status, difficulty)	✅
Sorting (latest, oldest, title A-Z, Z-A)	✅
Organization Repositories (GitHub API)	✅
Ownership Security	Only creator can edit/delete
🧰 Tech Stack
Frontend

React (Vite)

TailwindCSS

Axios

React Router DOM

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

📡 API Endpoints (Backend)
AUTH ROUTES → /api/auth
Method	Endpoint	Description
POST	/auth/signup	Create a new user
POST	/auth/login	Login user + get JWT
CONTRIBUTION ROUTES → /api/contributions
Method	Endpoint	Description
POST	/api/contributions/	Add a new contribution
GET	/api/contributions/	Get all contributions
GET	/api/contributions/:id	Get single contribution
PUT	/api/contributions/:id	Edit full contribution
PATCH	/api/contributions/status/:id	Update status only
DELETE	/api/contributions/:id	Delete contribution
📝 Project Setup
1️⃣ Clone repo
git clone <repo-url>
cd osct-frontend

2️⃣ Install dependencies
npm install

3️⃣ Create .env in backend
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret
PORT=3000

4️⃣ Start backend
npm start

5️⃣ Start frontend
npm run dev

📄 Problem Statement

Developers often work on multiple open-source repositories and pull requests.
However, tracking this activity is difficult because:

PRs exist across multiple repos

Status changes ("open", "closed", "merged")

No central dashboard to track all contributions

Difficult to recall difficulty level or repo details later

Solution:
OSCT provides a central dashboard for developers to manage their complete open-source contribution journey.

🎯 Evaluation Checklist
Requirement	Status
2 CREATE	✅ createContribution
2 READ	✅ getAll + getSingle
2 UPDATE	✅ updateContribution + updateStatus
2 DELETE	✅ deleteContribution
Pagination	✅
Search	✅
Filters	✅
Sorting	✅
Hosted Frontend	✅
Hosted Backend	✅
Hosted Backend	✅
README with proposal	✅

🧠 Frontend Features Explained

Ever wondered how we help you find the *safest* repositories to contribute to?

🛡️ Safety Score (The Beginner-Friendly Metric)
Since the GitHub API doesn't tell us "how nice is this community?", we calculate a **Safety Score (0-100)** on the fly!

*   **Base Score:** Everyone starts at **50**.
*   **Popuarity:** +1 point for every 100 stars (Max +30).
*   **Liveness:** +20 if updated in last 30 days, +10 if in last 90 days.
*   **Documentation:** +5 if it has a good description.
*   **Issues:** -1 for every 100 open issues (Max -20).

🟢 **90+**: Super Safe & Active
🔵 **75+**: Good for Beginners
🟡 **60+**: Moderate
🔴 **<60**: Approach with Caution

📅 Recently Updated (UpdatedAt)
We show "Updated X days ago" based on the `updated_at` field. This tracks **any** activity (commits, issue comments, PRs), ensuring the project isn't a "ghost town."

📝 Project Proposal (FINAL)
Project Title:

Open Source Contribution Tracker (OSCT)

1. Problem Background

Students and developers frequently contribute to open-source projects across multiple repositories.
However, they face several challenges:

PRs get scattered across many Github repositories

Hard to remember which PR is open, merged or closed

No centralized dashboard to track all work

Unable to categorize contributions by difficulty or importance

Hard to monitor monthly or weekly progress

This results in poor organization, loss of contribution history, and difficulty preparing portfolios or resumes.

2. Proposed Solution

The Open Source Contribution Tracker solves this by providing a centralized web dashboard where users can:

⭐ Track every contribution

Title

Repository name

PR link

Description

Status (open/closed/merged)

Difficulty (easy/medium/hard)

⭐ Manage contributions

Add

Edit

Delete

View all

View single

Update PR status

⭐ Analyze contributions

Search by title or repo

Filter by status

Filter by difficulty

Sort by latest/oldest/title

Full pagination support

3. Target Users

Students preparing for open-source programs

Hackathon teams

Developers contributing to multiple repositories

Anyone building a GitHub-based portfolio

4. Why This Project Is Useful

Helps maintain clean history of PRs

Useful during interviews (quick access to PR links)

Helps developers track contribution patterns

Encourages consistency in open-source involvement

Solves a real pain point many developers face

5. Tech Stack

Frontend: React + Tailwind

Backend: Node + Express

Database: MongoDB

Auth: JWT

6. Scope

The project covers:

Complete MERN CRUD functionality

Auth + Protected Routes

Pagination, Sorting, Filtering, Searching

Fully hosted frontend and backend

7. Future Enhancements

GitHub OAuth login

Auto-fetch PRs using GitHub API

Contribution analytics charts

Streaks calendar like GitHub


<!-- v1 -->
🔐 Authentication Flow (OSCT)

OSCT supports two authentication methods:

Email & Password (JWT)

GitHub OAuth (JWT)

Both flows ultimately result in a JWT stored on the client, enabling access to protected routes.

🟢 1️⃣ Email / Password Login Flow
User
 ↓
Login Page (/login)
 ↓  (POST /api/auth/login)
Backend (JWT issued)
 ↓
Token stored in localStorage
 ↓
Redirect to /dashboard
 ↓
Access protected routes


Key points:

JWT is returned directly from backend

No external redirects

Fast, local authentication

🔵 2️⃣ GitHub OAuth Login Flow (Environment-Aware)
User
 ↓
Login Page (/login)
 ↓  (redirect)
Backend → /api/auth/github
 ↓
GitHub Authorization Page
 ↓
GitHub redirects back
 ↓
Backend → /api/auth/github/callback
 ↓
JWT generated
 ↓
Redirect to frontend (/auth/success?token=...)
 ↓
Token stored in localStorage
 ↓
Redirect to /dashboard


Important design decisions:

Frontend passes its origin (redirect_uri) to backend

Backend preserves origin using a signed cookie

Same backend works for:

Local development

Production (Netlify)

/auth/success is a transition route (not user-visible)

🔒 Protected Route Logic
Route accessed
 ↓
ProtectedRoute checks token
 ↓
Token exists? ── Yes → Render page
        │
        └── No → Redirect to /login


Protected routes include:

/dashboard

/learn

/repo-issues

/org-repos

Contribution CRUD pages

🧠 Why This Design?

Stateless authentication (JWT)

Clean separation of frontend & backend

Secure OAuth (CSRF-protected via state)

Environment-safe redirects

Production-grade auth behavior