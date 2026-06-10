import { useEffect } from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import { getInterviewSession } from "../../services/interviewService";

import "./InterviewQuestions.css";

function InterviewQuestions() {
  const { sessionId } = useParams();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadQuestions();
    
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getInterviewSession(sessionId);

      setQuestions(
    data.interview?.questions || []
);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="questions-layout">
      <Topbar />

      <div className="questions-body">
        <Sidebar />

        <main className="questions-main">
          <h1>Interview Questions</h1>

          <p>Review your generated interview questions.</p>

          {questions?.map((question) => (
            <div className="question-card" key={question.id}>
              <h2>Question {question.id}</h2>

              <p className="question-text">{question.question}</p>

              <h3>Answer</h3>

              <p>{question.answer}</p>

              <h3>Explanation</h3>

              <p>{question.explanation}</p>

              <h3>Key Points</h3>

              <ul>
                {question.key_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default InterviewQuestions;
