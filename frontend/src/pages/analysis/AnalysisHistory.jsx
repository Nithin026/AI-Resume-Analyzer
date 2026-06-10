import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import {
  getAnalysisHistory,
  deleteAnalysis,
} from "../../services/analysisService";

import "./AnalysisHistory.css";

function AnalysisHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getAnalysisHistory();

      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (analysisId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?",
    );

    if (!confirmDelete) return;

    try {
      await deleteAnalysis(analysisId);

      loadHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredHistory = history.filter((item) =>
    item.ats_score.toString().includes(search),
  );

  return (
    <div className="history-layout">
      <Topbar />

      <div className="history-body">
        <Sidebar />

        <main className="history-main">
          <h1>Analysis History</h1>

          <p>
            View all your previous ATS reports and
            resume analyses.
          </p>

          <div className="history-search">
            <input
              type="text"
              placeholder="Search ATS Score..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {filteredHistory.length === 0 ? (
            <div className="empty-state">
              <h3>
                No analysis history found.
              </h3>

              <button
                onClick={() =>
                  navigate("/analysis")
                }
              >
                Analyze Resume
              </button>
            </div>
          ) : (
            <div className="history-list">
              {filteredHistory.map((item) => (
                <div
                  className="history-card"
                  key={item.id}
                >
                  <h3>
                    Analysis Report
                  </h3>
                  <p>
                    Resume Name:
                    {" "}
                    {item.file_name}
                  </p>

                  <p>
                    ATS Score:
                    {" "}
                    {item.ats_score}
                  </p>

                  <p>
                    Keyword Match:
                    {" "}
                    {item.keyword_match_pct}%
                  </p>

                  <p>
                    Date:
                    {" "}
                    {new Date(
                      item.created_at
                    ).toLocaleDateString()}
                  </p>

                  <div
                    className="history-actions"
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/analysis-result/${item.id}`
                        )
                      }
                    >
                      View Report
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AnalysisHistory;