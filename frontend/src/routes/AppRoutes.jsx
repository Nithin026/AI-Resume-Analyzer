import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import UploadResume from "../pages/resume/UploadResume";

import ResumeList from "../pages/resume/ResumeList";

import Analysis from "../pages/analysis/Analysis";

import AnalysisHistory from "../pages/analysis/AnalysisHistory";

import AnalysisResult from "../pages/analysis/AnalysisResult";

import InterviewSetup from "../pages/interview/InterviewSetup";

import InterviewQuestions from "../pages/interview/InterviewQuestions";

import InterviewHistory from "../pages/interview/InterviewHistory";

import Profile from "../pages/Profile/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-library"
          element={
            <ProtectedRoute>
              <ResumeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis-history"
          element={
            <ProtectedRoute>
              <AnalysisHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis-result/:analysisId"
          element={
            <ProtectedRoute>
              <AnalysisResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-questions/:sessionId"
          element={
            <ProtectedRoute>
              <InterviewQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-history"
          element={
            <ProtectedRoute>
              <InterviewHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
