import React, { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    const storedOtp = localStorage.getItem("sentOTP");
    if (e.target.value === storedOtp) {
      setIsOtpVerified(true);
    } else {
      setIsOtpVerified(false);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("Password should be at least 8 characters long.");
      return;
    }

    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", newPassword);

    try {
      const response = await axios.post("/resetPassword.php", params);

      if (response.data.success) {
        setErrorMessage("Password updated successfully.");
        navigate("/Login");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again later.");
    }
  };

  const sendOTP = async () => {
    try {
      if (!email.trim()) {
        setErrorMessage("Email cannot be empty.");
        return;
      }

      const params = new URLSearchParams();
      params.append("email", email);

      let response = await axios.post("/verifyEmail.php", params);
      if (!response.data.exists) {
        setErrorMessage("Email does not exist in our records.");
        return;
      }

      response = await axios.post("/sendOTP.php", params);
      if (response.data.success) {
        localStorage.setItem("sentOTP", response.data.otp);
        setIsOTPSent(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to send OTP.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error sending OTP.");
    }
  };

  return (
    <main className="container">
      <h1>Forgot Password</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleReset} method="POST">
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <div className="email-input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              required
            />
            <button type="button" onClick={sendOTP} className="send-otp-btn">
              Send OTP
            </button>
          </div>
        </div>
        {isOTPSent && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              id="otp"
              name="otp"
              required
            />
          </div>
        )}
        {isOtpVerified && (
          <>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                name="newPassword"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </div>
          </>
        )}
        <button type="submit" disabled={!isOtpVerified}>
          Reset Password
        </button>
      </form>
    </main>
  );
}

export default ForgotPassword;
