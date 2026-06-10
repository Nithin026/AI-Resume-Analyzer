import "./Topbar.css";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

/* AI Logo */
const LogoIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

function Topbar() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const [profileMenu,
    setProfileMenu] =
    useState(false);

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) return;

    logout();

    navigate("/");
  };

  return (
    <>
      <header className="topbar">

        <div
          className="topbar-logo"
          onClick={() =>
            navigate("/")
          }
        >
          <LogoIcon />

          <span>
            AI Resume Analyzer
          </span>
        </div>

        <div className="topbar-actions">

          <button
            className="profile-box1"
            onClick={() =>
              setProfileMenu(
                !profileMenu
              )
            }
          >
            <FaUserCircle
              className="profile-icon1"
            />
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {
        profileMenu && (

          <div className="profile-menu">

            <button
              onClick={() => {

                navigate("/dashboard");

                setProfileMenu(false);
              }}
            >
              Dashboard
            </button>

            <button
              onClick={() => {

                navigate("/upload-resume");

                setProfileMenu(false);
              }}
            >
              Upload Resume
            </button>

            <button
              onClick={() => {

                navigate("/resume-library")

                setProfileMenu(false);
              }}
            >
              Resume Library
            </button>

            <button
              onClick={() => {

                navigate("/analysis");

                setProfileMenu(false);
              }}
            >
              Analysis
            </button>

            <button
              onClick={() => {

                navigate("/analysis-history");

                setProfileMenu(false);
              }}
            >
              Analysis History
            </button>

            <button
              onClick={() => {

                navigate("/interview");

                setProfileMenu(false);
              }}
            >
              Interview
            </button>

            <button
              onClick={() => {

                navigate("/interview-history");

                setProfileMenu(false);
              }}
            >
              Interview History
            </button>

            <button
              onClick={() => {

                navigate("/Profile");

                setProfileMenu(false);
              }}
            >
              Profile
            </button>

            <button
              onClick={() => {

                setProfileMenu(false);

                handleLogout();
              }}
            >
              Logout
            </button>

          </div>
        )
      }
    </>
  );
}

export default Topbar;