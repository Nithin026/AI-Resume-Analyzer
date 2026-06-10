import { useEffect } from "react";

import { useState } from "react";

import { useParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";

import Topbar from "../../components/dashboard/Topbar";

import {
    getAnalysisById
}
from "../../services/analysisService";

import "./AnalysisResult.css";

function AnalysisResult() {

    const {
        analysisId
    } = useParams();

    const [result,
        setResult] =
        useState(null);

    useEffect(() => {

        loadAnalysis();

    }, []);

    const loadAnalysis =
    async () => {

        try {

            const data =
                await getAnalysisById(
                    analysisId
                );

            setResult(data);

        }

        catch(error) {

            console.log(error);
        }
    };

    if (!result) {

        return (

            <div>
                Loading...
            </div>
        );
    }

    return (

        <div className="result-layout">

            <Topbar />

            <div className="result-body">

                <Sidebar />

                <main className="result-main">

                    <h1>
                        Analysis Report
                    </h1>

                    <p>
                        Detailed ATS analysis results.
                    </p>

                    {/* Score Cards */}

                    <div className="score-section">

                        <div className="score-card">

                            <h3>
                                ATS Score
                            </h3>

                            <h1>
                                {
                                    result.ats_score
                                }
                                /100
                            </h1>

                        </div>

                        <div className="score-card">

                            <h3>
                                Keyword Match
                            </h3>

                            <h1>
                                {
                                    result.keyword_match_pct
                                }
                                %
                            </h1>

                        </div>

                    </div>

                    {/* Matched */}

                    <div className="result-section">

                        <h2>
                            Matched Keywords
                        </h2>

                        <div className="keywords">

                            {
                                result
                                .matched_keywords
                                .map(
                                    (
                                        keyword,
                                        index
                                    ) => (

                                        <span
                                            key={index}
                                            className="matched"
                                        >

                                            ✓ {keyword}

                                        </span>
                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* Missing */}

                    <div className="result-section">

                        <h2>
                            Missing Keywords
                        </h2>

                        <div className="keywords">

                            {
                                result
                                .missing_keywords
                                .map(
                                    (
                                        keyword,
                                        index
                                    ) => (

                                        <span
                                            key={index}
                                            className="missing"
                                        >

                                            ✗ {keyword}

                                        </span>
                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* Feedback */}

                    <div className="result-section">

                        <h2>
                            Section Feedback
                        </h2>

                        <div className="feedback-box">

                            <p>

                                <strong>
                                    Summary:
                                </strong>

                                {" "}

                                {
                                    result
                                    .section_feedback
                                    .summary
                                }

                            </p>

                            <p>

                                <strong>
                                    Experience:
                                </strong>

                                {" "}

                                {
                                    result
                                    .section_feedback
                                    .experience
                                }

                            </p>

                            <p>

                                <strong>
                                    Skills:
                                </strong>

                                {" "}

                                {
                                    result
                                    .section_feedback
                                    .skills
                                }

                            </p>

                            <p>

                                <strong>
                                    Education:
                                </strong>

                                {" "}

                                {
                                    result
                                    .section_feedback
                                    .education
                                }

                            </p>

                        </div>

                    </div>

                    {/* Suggestions */}

                    <div className="result-section">

                        <h2>
                            Suggestions
                        </h2>

                        <ul
                            className="suggestions"
                        >

                            {
                                result
                                .suggestions
                                .map(
                                    (
                                        suggestion,
                                        index
                                    ) => (

                                        <li
                                            key={index}
                                        >

                                            {
                                                suggestion
                                            }

                                        </li>
                                    )
                                )
                            }

                        </ul>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default AnalysisResult;