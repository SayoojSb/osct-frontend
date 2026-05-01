# 🎨 OSCT Frontend

> Modern, responsive React UI for Open Source Contribution Tracker - Built with React, Vite, and Tailwind CSS

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify)](https://open-source-contribution-tracker.netlify.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**OSCT Frontend** is a modern, user-friendly React application that helps beginners navigate their open-source contribution journey. It provides:

✅ Intuitive dashboard for tracking contributions  
✅ Step-by-step learning guides for GitHub workflows  
✅ Repository discovery and exploration  
✅ Contribution management (CRUD operations)  
✅ Advanced search, filter, and sort capabilities  
✅ Beautiful, responsive design  
✅ Secure authentication (JWT & GitHub OAuth)  

**Backend Repository:** [osct-backend](https://github.com/SayoojSb/osct-backend)

---

## ✨ Features

### 🎓 Learning Path
- **Learn Section** - Step-by-step guides for:
  - Forking repositories
  - Cloning locally
  - Creating branches
  - Making changes
  - Committing code
  - Opening pull requests
- **Interactive Tutorials** with screenshots
- **Common Mistakes** section for each step
- **Knowledge Check** quizzes

### 🔐 Authentication
- **Email & Password Login** with JWT
- **GitHub OAuth Integration** for quick sign-up
- **Protected Routes** for secure access
- **Session Management** with token storage

### 📊 Dashboard
- **Contribution Overview** with statistics
- **Quick Actions** for adding contributions
- **Recent Activity** feed
- **Status Distribution** visualization

### 📝 Contribution Management
- **Add Contribution** with full details
- **View All** contributions with pagination
- **Search** by title or repository
- **Filter** by status or difficulty
- **Sort** by date or name
- **Edit** contribution details
- **Delete** contributions
- **Update** PR status

### 🌐 Repository Discovery
- **Browse Organizations** on GitHub
- **Explore Repositories** with details
- **View Issues** by difficulty level
- **Filter** beginner-friendly projects
- **Direct Links** to GitHub

### 📱 Responsive Design
- **Mobile-First** approach
- **Tablet Optimized** layouts
- **Desktop** full experience
- **Touch-Friendly** interactions

---

## 🛠️ Tech Stack

```
Framework:      React 19.2.0
Build Tool:     Vite 7.2.2
Routing:        React Router DOM 7.9.6
HTTP Client:    Axios 1.13.2
Styling:        Tailwind CSS 4.1.17
CSS Processing: PostCSS 8.5.6
Linting:        ESLint 9.39.1
```

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see [osct-backend](https://github.com/SayoojSb/osct-backend))

### Clone & Setup

```bash
# Clone repository
git clone https://github.com/SayoojSb/osct-frontend.git
cd osct-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# GitHub OAuth (Optional)
VITE_GITHUB_CLIENT_ID=your_github_client_id

# App Configuration
VITE_APP_NAME=OSCT
VITE_APP_VERSION=1.0.0
```

### Getting Credentials

**GitHub OAuth Client ID:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL to `http://localhost:5173/auth/success`
4. Copy Client ID to `VITE_GITHUB_CLIENT_ID`

---

## 🚀 Usage

### Starting the Application

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Accessing the App

```
Local:   http://localhost:5173
Network: http://your-ip:5173
```

### User Journey

1. **Landing Page** - Learn about OSCT
2. **Sign Up / Login** - Create account or login
3. **Dashboard** - View contributions overview
4. **Learn Section** - Follow step-by-step guides
5. **Add Contribution** - Track your PRs
6. **Manage** - Edit, delete, or update contributions
7. **Explore** - Discover repositories and issues

---

## 📁 Project Structure

```
osct-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation
│   │   ├── Navbar.jsx              # Mobile navigation
│   │   ├── Sidebar.jsx             # Dashboard sidebar
│   │   ├── DashboardLayout.jsx     # Layout wrapper
│   │   └── *.test.jsx              # Component tests
│   │
│   ├── pages/
│   │   ├── Landing.jsx             # Home page
│   │   ├── Login.jsx               # Login page
│   │   ├── Signup.jsx              # Sign up page
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   ├── LearnOverview.jsx       # Learning hub
│   │   ├── LearnStep.jsx           # Individual lessons
│   │   ├── AddContribution.jsx     # Add PR form
│   │   ├── EditContribution.jsx    # Edit PR form
│   │   ├── ViewContributions.jsx   # All PRs list
│   │   ├── OrgRepos.jsx            # Organization repos
│   │   ├── RepoIssues.jsx          # Repository issues
│   │   ├── Profile.jsx             # User profile
│   │   ├── AuthSuccess.jsx         # OAuth callback
│   │   └── *.test.jsx              # Page tests
│   │
│   ├── services/
│   │   └── github.service.js       # GitHub API calls
│   │
│   ├── styles/
│   │   ├── components/             # Component styles
│   │   ├── pages/                  # Page styles
│   │   ├── design-system/          # Design tokens
│   │   │   ├── tokens.css          # Color, spacing, etc.
│   │   │   ├── components.css      # Component classes
│   │   │   ├── layout.css          # Layout utilities
│   │   │   ├── accessibility.css   # A11y styles
│   │   │   └── utilities.css       # Utility classes
│   │   └── global.css              # Global styles
│   │
│   ├── App.jsx                     # Main app component
│   ├── ProtectedRoute.jsx          # Route protection
│   ├── api.js                      # API instance
│   └── main.jsx                    # Entry point
│
├── public/
│   ├── learn/                      # Learning screenshots
│   │   ├── fork/                   # Fork step images
│   │   ├── clone/                  # Clone step images
│   │   └── pr/                     # PR step images
│   └── vite.svg
│
├── .env                            # Environment variables
├── .env.example                    # Example env file
├── .gitignore
├── package.json
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # ESLint configuration
└── README.md
```

---

## 🗺️ Pages & Routes

| Route | Component | Auth | Purpose |
|-------|-----------|------|---------|
| `/` | Landing | ❌ | Home page |
| `/login` | Login | ❌ | User login |
| `/signup` | Signup | ❌ | User registration |
| `/auth/success` | AuthSuccess | ❌ | OAuth callback |
| `/dashboard` | Dashboard | ✅ | Main dashboard |
| `/learn` | LearnOverview | ✅ | Learning hub |
| `/learn/:stepId` | LearnStep | ✅ | Individual lesson |
| `/contributions` | ViewContributions | ✅ | All contributions |
| `/contributions/add` | AddContribution | ✅ | Add new PR |
| `/contributions/:id/edit` | EditContribution | ✅ | Edit PR |
| `/org-repos` | OrgRepos | ✅ | Organization repos |
| `/repo-issues/:owner/:repo` | RepoIssues | ✅ | Repository issues |
| `/profile` | Profile | ✅ | User profile |

---

## 🧩 Components

### Layout Components
- **Header** - Top navigation bar
- **Navbar** - Mobile navigation
- **Sidebar** - Dashboard sidebar
- **DashboardLayout** - Main layout wrapper

### Feature Components
- **ContributionCard** - Individual contribution display
- **ContributionForm** - Add/edit contribution form
- **SearchBar** - Search contributions
- **FilterPanel** - Filter options
- **PaginationControls** - Page navigation
- **RepositoryCard** - Repository display
- **IssueCard** - GitHub issue display

### Utility Components
- **ProtectedRoute** - Route protection wrapper
- **LoadingSpinner** - Loading indicator
- **ErrorMessage** - Error display
- **SuccessMessage** - Success notification

---

## 🎨 Design System

### Color Palette (Nocturnal Atelier)
```css
Primary:        #8ED5FF (Cyan)
Primary Dark:   #0D1B2A (Navy)
Surface:        #0F1419 (Dark)
Surface Light:  #1A2332 (Lighter)
Success:        #4CAF50 (Green)
Warning:        #FF9800 (Orange)
Error:          #F44336 (Red)
```

### Typography
```css
Display XL:     48px, 800 weight
Display LG:     40px, 700 weight
Headline SM:    24px, 600 weight
Body LG:        18px, 400 weight
Body MD:        16px, 400 weight
Label MD:       14px, 600 weight
```

### Spacing Scale
```css
xs:  4px
sm:  8px
md:  12px
lg:  16px
xl:  24px
2xl: 32px
3xl: 48px
```

---

## 🚀 Deployment

### Deploy to Netlify

#### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Set Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add `VITE_API_URL` pointing to backend
   - Add `VITE_GITHUB_CLIENT_ID` if using OAuth

4. **Deploy**
   - Netlify auto-deploys on push to main
   - Monitor deployment logs

#### Option 2: Manual Deploy

```bash
# Build production bundle
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Live URL:** https://open-source-contribution-tracker.netlify.app

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Files
- `src/components/*.test.jsx` - Component tests
- `src/pages/*.test.jsx` - Page tests

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'feat: add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns
- Test before submitting PR
- Keep components small and focused

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

- **Sayooj SB** - Frontend Developer
  - GitHub: [@SayoojSb](https://github.com/SayoojSb)

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/SayoojSb/osct-frontend/issues)
- **Backend Repo:** [osct-backend](https://github.com/SayoojSb/osct-backend)
- **Main Project:** [OSCT](https://github.com/SayoojSb/osct)

---

<div align="center">

**Made with ❤️ by developers, for developers**

[⬆ Back to Top](#-osct-frontend)

</div>
