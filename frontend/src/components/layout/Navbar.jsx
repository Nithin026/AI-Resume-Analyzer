import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LogoIcon = () => (
  <svg
    width="28"
    height="28"
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

function Navbar() {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        <LogoIcon />

        <span>AI Resume Analyzer</span>
      </div>

      <button
        className="auth-btn"
        onClick={handleAuthAction}
      >
        {isAuthenticated ? "Logout" : "Sign In"}
      </button>
    </nav>
  );
}

export default Navbar;