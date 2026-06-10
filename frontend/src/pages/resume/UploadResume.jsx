import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadResume.css";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { uploadResume } from "../../services/resumeService";

function UploadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }
    try {
      setLoading(true);
      await uploadResume(file);
      alert("Resume uploaded successfully");
      navigate("/resume-library");
    } catch (error) {
      alert(error.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-layout">
      <Topbar />
      <div className="upload-body">
        <Sidebar />
        <main className="upload-main">
          <div className="upload-container">

            {/* Page header */}
            <div className="upload-header">
              <div className="upload-header-icon">
                {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg> */}
              </div>
              <div>
                <h1>Upload Resume</h1>
                <p>Upload your resume in PDF or DOCX format for ATS analysis and interview preparation.</p>
              </div>
            </div>

            {/* Drop zone */}
            <label className="dropzone">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
              />

              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="12" x2="12" y2="18"/>
                  <polyline points="9 15 12 12 15 15"/>
                </svg>
              </div>

              <h3>Drag &amp; Drop Resume Here</h3>
              <span>or click to browse files</span>
              <small>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Supported formats: PDF, DOC, DOCX · Max 5MB
              </small>
            </label>

            {/* Selected file preview */}
            {file && (
              <div className="selected-file">
                <div className="selected-file-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="selected-file-info">
                  <span className="selected-file-name">{file.name}</span>
                  <span className="selected-file-size">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
                <div className="selected-file-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Upload button */}
            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="upload-btn-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Resume
                </>
              )}
            </button>

            {/* Format guide cards */}
            <div className="format-guide">
              <div className="format-card">
                <div className="format-card-icon format-card-icon--purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div>
                  <div className="format-card-label">ATS Analysis</div>
                  <div className="format-card-sub">Get your resume scored against job descriptions</div>
                </div>
              </div>
              <div className="format-card">
                <div className="format-card-icon format-card-icon--blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div>
                  <div className="format-card-label">Keyword Match</div>
                  <div className="format-card-sub">See which keywords are missing from your resume</div>
                </div>
              </div>
              <div className="format-card">
                <div className="format-card-icon format-card-icon--teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <div className="format-card-label">Interview Prep</div>
                  <div className="format-card-sub">Generate tailored AI interview questions</div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default UploadResume;