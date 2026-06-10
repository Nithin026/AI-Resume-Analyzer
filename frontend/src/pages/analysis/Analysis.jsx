import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import { getUserResumes } from "../../services/resumeService";
import { runAnalysis } from "../../services/analysisService";

import Loading from "../../components/common/Loading";

import "./Analysis.css";

function Analysis() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const resumeId = searchParams.get("resumeId");

  const [resumes, setResumes] = useState([]);

  const [selectedResume, setSelectedResume] = useState(resumeId || "");

  const [jobDescription, setJobDescription] = useState("");

  const [error, setError] = useState("");

  const [loading,
    setLoading] =
    useState(false);

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

  const handleAnalysis =
async () => {

    if(!selectedResume){

        alert(
            "Please select a resume."
        );

        return;
    }

    if(
        !jobDescription.trim()
    ){

        alert(
            "Please enter a job description."
        );

        return;
    }

    try {

        setLoading(true);

        const response =
            await runAnalysis({

                resume_id:
                    selectedResume,

                job_description:
                    jobDescription
            });

        navigate(

            `/analysis-result/${response.analysis_id}`

        );

    }

    catch(error){

        setLoading(false);

        alert(
            "Failed to analyze resume."
        );
    }
};

  return (
    <div className="analysis-layout">
         {
            loading &&

            <Loading />
        }

      <Topbar />

      <div className="analysis-body">
        <Sidebar />

        <main className="analysis-main">
          <h1>Resume Analysis</h1>

          <p>
            Compare your resume with a job description and receive ATS feedback
            powered by AI.
          </p>

          <label>Resume</label>

          <select
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
          >
            <option value="">Select Resume</option>

            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.file_name}
              </option>
            ))}
          </select>

          <label>Job Description</label>

          <textarea
            rows="8"
            placeholder="Paste Job Description Here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}

          <button onClick={handleAnalysis}>Analyze Resume</button>
        </main>
      </div>
    </div>
  );
}

export default Analysis;
