import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function QAPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openDialog = () => {
    //...
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.post("/getQAPolicies.php");
        if (response.data.success) {
          setPolicies(response.data.policies);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const deletePolicy = async (policyId) => {
    try {
      const formData = new URLSearchParams();
      formData.append("policyId", policyId);
      const response = await axios.post("/removeQAPolicy.php", formData);
      if (response.data.success) {
        // Remove the deleted policy from the state
        setPolicies((prevPolicies) =>
          prevPolicies.filter((policy) => policy.id !== policyId)
        );
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <div className="flex justify-between">
          <h1>Policies</h1>
          <Link to="/qa/QAAddPolicy">
            <button className="add-button">Add Policy</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.id}</td>
                <td>{policy.title}</td>
                <td className="flex">
                  <button
                    className="delete-button ml-1"
                    onClick={() => deletePolicy(policy.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QAPolicies;
