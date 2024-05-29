import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function QARecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showTextField, setShowTextField] = useState(false);
  const [newRecommendationTitle, setNewRecommendationTitle] = useState("");

  const openDialog = () => {
    setShowTextField(true);
  };

  const handleCloseDialog = () => {
    setShowTextField(false);
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post("/getRecommendations.php");
      if (response.data.success) {
        setRecommendations(response.data.recommendations);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecommendation = async (id) => {
    const formData = new URLSearchParams();
    formData.append("id", id);

    try {
      const response = await axios.post("/deleteRecommendation.php", formData);
      if (response.data.success) {
        fetchRecommendations();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleAddRecommendation = async () => {
    const formData = new URLSearchParams();
    formData.append("title", newRecommendationTitle);

    try {
      const response = await axios.post("/AddRecommendation.php", formData);

      if (response.data.success) {
        fetchRecommendations();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setShowTextField(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <div className="flex justify-between">
          <h1>Recommendations</h1>
          <button className="add-button" onClick={openDialog}>
            Add New Recommendation
          </button>
        </div>
        {showTextField && (
          <div>
            <input
              type="text"
              value={newRecommendationTitle}
              onChange={(e) => setNewRecommendationTitle(e.target.value)}
              placeholder="Enter recommendation title"
            />
            <button onClick={handleAddRecommendation}>Submit</button>
            <button onClick={handleCloseDialog}>Cancel</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((recommendation) => (
              <tr key={recommendation.id}>
                <td>{recommendation.id}</td>
                <td>{recommendation.title}</td>
                <td className="flex">
                  <button
                    className="delete-button ml-1"
                    onClick={() =>
                      handleDeleteRecommendation(recommendation.id)
                    }
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

export default QARecommendations;
