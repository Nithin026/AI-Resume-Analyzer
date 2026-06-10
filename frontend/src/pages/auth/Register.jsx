import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      localStorage.setItem("full_name", formData.full_name);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>AI Resume Analyzer</h1>

          <p>Create Your Account</p>

          <span>Start your journey towards a better career</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Account</button>

          <p className="auth-footer">
            Already have an account?
            <span onClick={() => navigate("/login")}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
