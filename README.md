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
README with proposal	✅
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