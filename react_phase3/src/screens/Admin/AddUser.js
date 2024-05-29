import React, { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "../../components/Utils/PhoneComponent";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [phone, setPhone] = useState("");

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

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!/^([0-9]{3}-[0-9]{3}-[0-9]{4})$/.test(phone)) {
      setErrorMessage("Invalid USA phone number format.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== password_confirmation) {
      setErrorMessage("Password and Confirm Password must match.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("phone", phone);

    try {
      const response = await axios.post("/register.php", formData);

      if (response.data.success) {
        setEmail("");
        setName("");
        setPassword("");
        setPasswordConfirmation("");
        setRole("Student");
        navigate("/admin/users");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      setErrorMessage(e.response?.data?.message || "Error during registration");
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

      const response = await axios.post("/sendOTP.php", params);
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

  // const testHelloWorld = async () => {
  //   try {
  //     const data = new URLSearchParams();
  //     data.append("data", "tset");

  //     const response = await axios.post("/helloworld.php", data);
  //     if (response.data === "helloworld") {
  //       console.log("Received the correct response!");
  //     } else {
  //       console.log("Unexpected response:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error making request to helloworld.php", error);
  //   }
  // };

  return (
    <main className="container">
      <h1>Add User</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleRegister} method="POST">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            required
          />
        </div>

        <div className="form-group email-group">
          <label htmlFor="email">Email:</label>
          <div className="email-input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              required
            />
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

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="role"
            name="role"
            required
          >
            <option value="Student">Student</option>
            <option value="ProgramCoordinator">Program Coordinator</option>
            <option value="QualityAssurance">Quality Assurance</option>
            <option value="Instructor">Instructor</option>
          </select>
        </div>

        <PhoneInput phone={phone} setPhone={setPhone} />

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            id="confirm-password"
            name="confirm-password"
            required
          />
        </div>

        <button type="submit">Add User</button>
      </form>
    </main>
  );
}

export default AddUser;
