<div align="center">

# 🤖 AI Resume Analyzer

### Optimize your resume. Ace your interview. Land the job.

AI Resume Analyzer is a full-stack SaaS application that analyzes resumes against job descriptions, calculates ATS compatibility scores, identifies keyword gaps, and generates personalized AI-powered interview questions — all powered by Google Gemini.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Workflow](#workflow)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Overview

Job seekers often struggle to pass Applicant Tracking Systems (ATS) before a human even reads their resume. **AI Resume Analyzer** solves this by:

- Parsing and scoring your resume against a real job description
- Identifying exactly which keywords are missing
- Providing section-wise improvement feedback via AI
- Generating custom interview questions based on your resume profile

Built as a **Final Year Major Project** by a B.Tech student, this project demonstrates end-to-end full-stack development, AI integration, and production-grade UI/UX design.

---

## Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication with protected routes
- Secure logout

### 📄 Resume Management
- Upload resumes in PDF or DOCX format
- Personal resume library with storage and retrieval
- View uploaded resumes directly in the browser

### 📊 ATS Resume Analysis
- **ATS Score** — percentage compatibility with the job description
- **Keyword Match** — matched vs. missing keywords highlighted
- **Section Feedback** — AI suggestions for Summary, Experience, Skills, Education
- **Improvement Suggestions** — actionable next steps
- **Analysis History** — all past reports saved and accessible

### 🎤 AI Interview Preparation
- Generate tailored interview questions from your resume
- Supports Easy, Medium, and Hard difficulty levels
- Technical and behavioral question types
- Interview history management

### 📈 Dashboard
- Overview stats: resumes, analyses, and interview sessions
- Quick-action navigation
- Recent activity feed
- Fully responsive design

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, React Router DOM, Axios, CSS3 |
| **Backend** | FastAPI, Python |
| **Database** | MongoDB |
| **AI** | Google Gemini API |
| **Auth** | JWT (JSON Web Tokens) |

---

## Architecture

```
┌─────────────────────────────┐
│     Frontend (React + Vite) │  http://localhost:5173
└────────────┬────────────────┘
             │ HTTP / Axios
┌────────────▼────────────────┐
│     Backend (FastAPI)       │  http://localhost:8000
└────────────┬────────────────┘
             │
      ┌──────┴──────┐
      │             │
┌─────▼─────┐  ┌────▼──────────┐
│  MongoDB  │  │  Gemini AI    │
│ (Database)│  │  (Analysis +  │
└───────────┘  │   Questions)  │
               └───────────────┘
```

---

## Project Structure

```
AI-Resume-Analyzer/
│
├── frontend/
│   └── src/
│       ├── components/        # Reusable UI components (Sidebar, Topbar, etc.)
│       ├── pages/             # Page-level components (Dashboard, Analysis, etc.)
│       ├── services/          # Axios API call functions
│       ├── routes/            # Protected and public route definitions
│       ├── context/           # Auth context and global state
│       └── assets/            # Static assets
│
├── backend/
│   └── app/
│       ├── api/               # Route handlers
│       ├── crud/              # Database operations
│       ├── models/            # MongoDB document models
│       ├── schemas/           # Pydantic request/response schemas
│       ├── services/          # Business logic and Gemini integration
│       └── database/          # MongoDB connection setup
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- MongoDB (local or Atlas)
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:5173`

### 3. Backend Setup

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs at: `http://127.0.0.1:8000`

### 4. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=ai_resume_analyzer
SECRET_KEY=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `GET` | `/api/auth/me` | Get current authenticated user |

### Resumes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/resumes/upload` | Upload a PDF or DOCX resume |
| `GET` | `/api/resumes` | Get all resumes for current user |
| `GET` | `/api/resumes/{id}` | Get a specific resume by ID |
| `DELETE` | `/api/resumes/{id}` | Delete a resume |

### Analysis

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyses` | Run ATS analysis on a resume |
| `GET` | `/api/analyses` | Get analysis history |
| `GET` | `/api/analyses/{id}` | Get a specific analysis result |
| `DELETE` | `/api/analyses/{id}` | Delete an analysis |

### Interview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/interviews/generate` | Generate interview questions |
| `GET` | `/api/interviews` | Get interview history |
| `GET` | `/api/interviews/{id}` | Get a specific interview session |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/stats` | Get dashboard stats (resumes, analyses, interviews) |

---

## Workflow

```
1. Register / Login
        ↓
2. Upload Resume (PDF / DOCX)
        ↓
3. Select Resume + Paste Job Description
        ↓
4. AI Analyzes Resume via Gemini
        ↓
5. View ATS Score, Keywords & Suggestions
        ↓
6. Generate Interview Questions
        ↓
7. Review History & Track Progress
```

---

## Roadmap

- [x] JWT Authentication
- [x] Resume Upload & Library
- [x] ATS Score Analysis
- [x] Keyword Match Detection
- [x] Section-Wise AI Feedback
- [x] AI Interview Question Generation
- [x] Analysis & Interview History
- [x] Responsive Dashboard
- [ ] Resume PDF Report Download
- [ ] Voice-Based Mock Interviews
- [ ] Resume Templates
- [ ] Job Recommendation System
- [ ] Dark Mode
- [ ] Email Notifications
- [ ] Multi-Language Resume Support

---

## Learning Outcomes

This project demonstrates practical implementation of:

- ⚙️ Full-stack web development (React + FastAPI)
- 🔑 JWT authentication and protected routes
- 🗄️ MongoDB database design and CRUD operations
- 🤖 AI integration using Google Gemini API
- 🎨 Responsive UI/UX design with CSS3
- 📡 REST API design and development
- ⚛️ React state management with Context API

---

## Author

<div align="center">

**Nithin**
B.Tech Final Year Student

*AI Resume Analyzer — Final Year Major Project, 2026*

</div>
