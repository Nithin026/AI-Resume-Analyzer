import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import { getCurrentUser } from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  if (!user) {
    return <div className="profile-loading2">Loading...</div>;
  }

  return (
    <div className="profile-layout2">
      <Topbar />

      <div className="profile-body2">
        <Sidebar />

        <main className="profile-main2">
          <h1>Profile</h1>

          <div className="profile-card2">
            <div className="profile-item2">
              <label>Full Name</label>

              <p>{user.full_name}</p>
            </div>

            <div className="profile-item2">
              <label>Email</label>

              <p>{user.email}</p>
            </div>

            <div className="profile-item2"></div>

            <div className="profile-item2">
              <label>Account Status</label>

              <p>Active</p>
            </div>

            <button className="logout-btn2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
