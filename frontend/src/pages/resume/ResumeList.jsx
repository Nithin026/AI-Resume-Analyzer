import { useEffect } from "react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";

import Topbar from "../../components/dashboard/Topbar";

import { getUserResumes } from "../../services/resumeService";

import "./ResumeList.css";

import { deleteResume } from "../../services/resumeService";

function ResumeList() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await getUserResumes();

      setResumes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredResumes = resumes.filter((resume) =>
    resume.file_name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (resumeId) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    try {
      await deleteResume(resumeId);

      loadResumes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="resume-layout">
      <Topbar />

      <div className="resume-body">
        <Sidebar />

        <main className="resume-main">
          <h1>Resume Library</h1>

          <p>Manage all your uploaded resumes.</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search resumes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="resume-list">
            {filteredResumes.map((resume) => (
              <div className="resume-card" key={resume.id}>
                <div>
                  <h3>📄 {resume.file_name}</h3>

                  <p>
                    Uploaded: {new Date(resume.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="resume-actions">
                  <button
                    onClick={() =>
                      window.open(
                        `http://127.0.0.1:8000/api/resumes/view/${resume.id}`,

                        "_blank",
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/analysis?resumeId=${resume.id}`)}
                  >
                    Analyze
                  </button>
                  <button onClick={() => handleDelete(resume.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ResumeList;
