import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import {
    loginUser
}
from "../../services/authService";

import {
    useAuth
}
from "../../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate =
        useNavigate();

    const { login } =
        useAuth();

    const [formData,
        setFormData] =
        useState({

            email: "",
            password: ""
        });

    const handleChange =
    (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const response =
            await loginUser(
                formData
            );

            login(
                response.access_token
            );

            navigate(
                "/"
            );
        }

        catch (error) {

            alert(
                error.response?.data?.detail ||
                "Login Failed"
            );
        }
    };

    return (
    <div className="auth-container">

        <div className="auth-card">

            <div className="auth-header">
                <h1>AI Resume Analyzer</h1>
                <p>Welcome Back!</p>
                <span>
                    Sign in to continue your journey
                </span>
            </div>

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">
                    Login In
                </button>

                <p className="auth-footer">
                    Don't have an account?
                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create Account
                    </span>
                </p>

            </form>

        </div>

    </div>
);
}

export default Login;