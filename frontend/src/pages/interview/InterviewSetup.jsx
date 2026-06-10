import { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import { getUserResumes } from "../../services/resumeService";

import { generateInterview } from "../../services/interviewService";

import Loading from "../../components/common/Loading";


import "./InterviewSetup.css";

function InterviewSetup() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);

  const [formData, setFormData] = useState({
    resume_id: "",

    role: "",

    difficulty: "Easy",

    interview_type: "Technical",

    number_of_questions: 5,

    use_resume: true,
  });

  useEffect(() => {
    loadResumes();
  }, []);
  const [loading, setLoading] = useState(false);

  const loadResumes = async () => {
    try {
      const data = await getUserResumes();

      setResumes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.resume_id) {

        alert(
            "Please select a resume."
        );

        return;
    }

    if (!formData.role.trim()) {

        alert(
            "Please enter a role."
        );

        return;
    }

    if (formData.number_of_questions < 1) {

        alert(
            "Number of questions must be at least 1."
        );

        return;
    }

    try {

        setLoading(true);

        const response =
            await generateInterview(
                formData
            );

        navigate(
            `/interview-questions/${response.session_id}`
        );

    }

    catch (error) {

        setLoading(false);

        alert(
            error.response?.data?.detail ||
            "Failed to generate interview questions."
        );

        console.log(error);
    }

};

  return (
    <div className="interview-layout">
      {
            loading &&

            <Loading />
        }
      <Topbar />

      <div className="interview-body">
        <Sidebar />

        <main className="interview-main">
          <h1>Interview Preparation</h1>

          <p>
            Generate AI-powered interview questions based on your resume and
            target role.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Resume</label>

            <select
              name="resume_id"
              value={formData.resume_id}
              onChange={handleChange}
            >
              <option value="">Select Resume</option>

              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.file_name}
                </option>
              ))}
            </select>

            <label>Role</label>

            <input
              type="text"
              name="role"
              placeholder="Python Developer"
              value={formData.role}
              onChange={handleChange}
            />

            <label>Difficulty</label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>

              <option>Medium</option>

              <option>Hard</option>
            </select>

            <label>Interview Type</label>

            <select
              name="interview_type"
              value={formData.interview_type}
              onChange={handleChange}
            >
              <option>Technical</option>

              <option>HR</option>

              <option>Mixed</option>
            </select>

            <label>Number of Questions</label>

            <input
              type="number"
              name="number_of_questions"
              min="1"
              max="20"
              value={formData.number_of_questions}
              onChange={handleChange}
            />

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="use_resume"
                checked={formData.use_resume}
                onChange={handleChange}
              />

              <span>Use Resume</span>
            </div>

            <button type="submit">Generate Questions</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default InterviewSetup;
