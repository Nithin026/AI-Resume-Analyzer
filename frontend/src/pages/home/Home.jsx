import "./Home.css";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="home">

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            AI-Powered Resume Intelligence
          </div>
          <h1>Improve Your Resume With AI</h1>
          <p>Get ATS Score, Resume Analysis, and AI Interview Preparation</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleGetStarted}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Get Started
            </button>
            <button className="secondary-btn" onClick={handleLearnMore}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">94%</span>
              <span className="hero-stat-label">ATS pass rate</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-num">50+</span>
              <span className="hero-stat-label">Resumes analyzed</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-num">3×</span>
              <span className="hero-stat-label">More interviews</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features">
          <div className="section-eyebrow">Features</div>
          <h2>Everything you need to stand out</h2>
          <p className="section-sub">Three powerful tools to take your resume from good to hire-ready.</p>
          <div className="feature-cards">

            <div className="card card--purple">
              <div className="card-icon card-icon--purple">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Resume Upload</h3>
                <p>Upload your resume securely in PDF or DOCX format. Our parser extracts every detail instantly.</p>
              </div>
              <div className="card-footer">
                <span className="card-tag">PDF · DOCX</span>
                {/* <svg className="card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> */}
              </div>
            </div>

            <div className="card card--blue card--featured">
              <div className="card-featured-badge">Most popular</div>
              <div className="card-icon card-icon--blue">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>ATS Analysis</h3>
                <p>Get your ATS score and a detailed keyword analysis to see exactly how recruiters' bots rank your resume.</p>
              </div>
              <div className="card-footer">
                <span className="card-tag">Keyword match</span>
                {/* <svg className="card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> */}
              </div>
            </div>

            <div className="card card--teal">
              <div className="card-icon card-icon--teal">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Interview Preparation</h3>
                <p>Practice with AI-generated interview questions tailored to your role and experience level.</p>
              </div>
              <div className="card-footer">
                <span className="card-tag">AI-powered</span>
                {/* <svg className="card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> */}
              </div>
            </div>

          </div>
        </section>

        {/* How It Works */}
        <section className="workflow">
          <div className="section-eyebrow">Process</div>
          <h2>How It Works</h2>
          <p className="section-sub">From upload to interview-ready in four simple steps.</p>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              Upload Resume
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
              </div>
              AI Analysis
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              ATS Score
            </div>
            <div className="arrow">→</div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              Interview Questions
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Ready to Improve Your Resume?</h2>
          <p className="cta-sub">Join thousands of job seekers who've boosted their interview rate.</p>
          <button className="primary-btn" onClick={handleGetStarted}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Start Now
          </button>
        </section>

        {/* Footer */}
        <footer>© 2026 AI Resume Analyzer</footer>
      </div>
    </>
  );
}

export default Home;