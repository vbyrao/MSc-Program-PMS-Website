import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added an error message state
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const emailFromData = new URLSearchParams();
    emailFromData.append("email", email);

    try {
      const response = await axios.post("/login.php", formData);

      if (response.data.success) {
        localStorage.setItem("userEmail", response.data.email);
        setEmail("");
        setPassword("");

        const role = await axios.post("/getUserRole.php", emailFromData);
        if (response.data.success) {
          localStorage.setItem("userRole", role.data.role);
        }

        navigate("/");
      } else {
        setErrorMessage(response.data.message); // Set error message if login fails
      }
    } catch (e) {
      setErrorMessage("Server error. Please try again later."); // General error handling
    }
  };

  return (
    <main className="container">
      <h1>Login</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
        </div>
        <div className="flex justify-between align-center">
          <button type="submit">Login</button>
          <Link to="/forgot">Forgot Password?</Link>
        </div>
        <div className="text-left mt-1">
          Don't have an account?&nbsp;
          <Link to="/register">Create Account</Link>
        </div>
      </form>
    </main>
  );
}

export default Login;
