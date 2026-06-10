import { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import {
  getInterviewHistory,
  deleteInterview,
} from "../../services/interviewService";

import "./InterviewHistory.css";

function InterviewHistory() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const data = await getInterviewHistory();

      setInterviews(data.interviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (sessionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?",
    );

    if (!confirmDelete) return;

    try {
      await deleteInterview(sessionId);

      loadInterviews();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredInterviews = interviews.filter((item) =>
    item.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="history-layout">
      <Topbar />

      <div className="history-body">
        <Sidebar />

        <main className="history-main">
          <h1>Interview History</h1>

          <p>View all generated interview sessions.</p>

          <input
            type="text"
            placeholder="Search Role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box1"
          />

          {filteredInterviews.length === 0 ? (
            <div className="empty-state">
              <h3>No interviews found.</h3>
            </div>
          ) : (
            filteredInterviews.map((item) => (
              <div className="history-card" key={item._id}>
                <h3>{item.role}</h3>

                <p>Type: {item.interview_type}</p>

                <p>Difficulty: {item.difficulty}</p>

                <p>Questions: {item.questions.length}</p>

                <p>Date: {new Date(item.created_at).toLocaleDateString()}</p>

                <button
                  onClick={() => navigate(`/interview-questions/${item._id}`)}
                >
                  View Questions
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default InterviewHistory;
