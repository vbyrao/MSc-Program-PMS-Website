import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function ProgramCoordinatorStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(1);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.post("/getAllUsers.php");
        if (response.data.success) {
          const studentData = response.data.data.filter(
            (user) => user.role === "Student"
          );
          setStudents(studentData);
        } else {
          setError("Failed to fetch student data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const handleFeedbackClick = (studentId) => {
    console.log(`Feedback clicked for Student ID: ${studentId}`);
    setShowSlider(true);
  };

  const handleSliderSubmit = () => {
    console.log(`Rating for student: ${sliderValue}`);
    setShowSlider(false); // Hide the slider after submitting
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <h1>Students</h1>
        <table>
          {/* ... (rest of the code remains unchanged) */}
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td className="flex justify-between">
                  <button
                    className="delete-button"
                    onClick={() => handleFeedbackClick(student.id)}
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showSlider && (
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="10"
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
            />
            <span>Rating: {sliderValue}</span>
            <button onClick={handleSliderSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgramCoordinatorStudents;
