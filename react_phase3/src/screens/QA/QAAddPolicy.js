import React, { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function QAAddPolicy() {
  const [policyName, setPolicyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handlePolicyAdd = async (event) => {
    event.preventDefault();

    if (!policyName.trim()) {
      setErrorMessage("Policy name cannot be empty.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("policyName", policyName);

    try {
      const response = await axios.post("/addPolicy.php", formData);

      if (response.data.success) {
        setPolicyName(""); // Clear the input after successful addition
        navigate("/qa/policies");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (e) {
      setErrorMessage(
        e.response?.data?.message || "Error during policy addition"
      );
    }
  };

  return (
    <main className="container">
      <h1>Add Policy</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handlePolicyAdd} method="POST">
        <div className="form-group">
          <label htmlFor="policyName">Policy Name:</label>
          <input
            type="text"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            id="policyName"
            name="policyName"
            required
          />
        </div>
        <button type="submit">Add Policy</button>
      </form>
    </main>
  );
}

export default QAAddPolicy;
