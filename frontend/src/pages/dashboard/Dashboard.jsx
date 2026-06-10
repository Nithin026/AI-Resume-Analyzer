import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import { getDashboardStats } from "../../services/dashboardService";

import "./Dashboard.css";

const fullName = localStorage.getItem("full_name");

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_resumes: 0,
    total_analyses: 0,
    total_interviews: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats({
          total_resumes: data.total_resumes || 0,
          total_analyses: data.total_analyses || 0,
          total_interviews: data.total_interviews || 0,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="dashboard">
      <Topbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          {/* Welcome */}
          <section className="welcome-section">
            <div className="welcome-text">
              <h1>👋 Welcome Back!</h1>
              <p>Track and improve your resume with AI-powered insights.</p>
            </div>
          </section>

          {/* Stats */}
          <section className="stats-section">
            <div className="stat-card stat-card--purple">
              <div className="stat-icon stat-icon--purple">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3>Total Resumes</h3>
              <h2>{stats.total_resumes}</h2>
              <span className="stat-sub">uploaded</span>
            </div>

            <div className="stat-card stat-card--blue">
              <div className="stat-icon stat-icon--blue">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3>ATS Analyses</h3>
              <h2>{stats.total_analyses}</h2>
              <span className="stat-sub">completed</span>
            </div>

            <div className="stat-card stat-card--teal">
              <div className="stat-icon stat-icon--teal">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <h3>Interviews</h3>
              <h2>{stats.total_interviews}</h2>
              <span className="stat-sub">sessions</span>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions">
            <div className="section-header">
              <h2>Quick Actions</h2>
              <p>Jump straight into your workflow</p>
            </div>

            <div className="action-grid">
              <div
                className="action-card action-card--purple"
                onClick={() => navigate("/upload-resume")}
              >
                <div className="action-icon action-icon--purple">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <h3>Upload Resume</h3>
                <p>Upload PDF or DOCX files</p>
                <span className="action-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              <div
                className="action-card action-card--blue"
                onClick={() => navigate("/analysis")}
              >
                <div className="action-icon action-icon--blue">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <h3>ATS Analysis</h3>
                <p>Analyze resume ATS score</p>
                <span className="action-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              <div
                className="action-card action-card--teal"
                onClick={() => navigate("/interview")}
              >
                <div className="action-icon action-icon--teal">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3>Interview Prep</h3>
                <p>Generate AI questions</p>
                <span className="action-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="activity-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
              <p>Your latest actions</p>
            </div>

            <div className="activity-list">
              <div className="activity-item activity-item--green">
                <div className="activity-dot activity-dot--green">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="activity-content">
                  <span className="activity-label">
                    Resume uploaded successfully
                  </span>
                </div>
                <span className="activity-badge activity-badge--green">
                  Success
                </span>
              </div>

              <div className="activity-item activity-item--blue">
                <div className="activity-dot activity-dot--blue">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div className="activity-content">
                  <span className="activity-label">ATS analysis completed</span>
                </div>
                <span className="activity-badge activity-badge--blue">
                  Score Generated
                </span>
              </div>

              <div className="activity-item activity-item--purple">
                <div className="activity-dot activity-dot--purple">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="activity-content">
                  <span className="activity-label">
                    Interview questions generated
                  </span>
                </div>
                <span className="activity-badge activity-badge--purple">
                  Question Generated
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
