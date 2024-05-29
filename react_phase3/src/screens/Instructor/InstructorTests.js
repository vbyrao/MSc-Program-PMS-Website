import React, { useState, useEffect } from "react";
import axios from "../../api/axios"; // Assuming axios is imported like this

function InstructorTests() {
  const [tests, setTests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTests() {
    try {
      const response = await axios.post("/getTests.php");
      if (response.data.success) {
        setTests(response.data.data);
      } else {
        setError("Failed to fetch test data.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetchTests();
      await fetchCourses();
    }

    fetchData();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.post("/getCourses.php");
      if (response.data.success) {
        setCourses(response.data.courses);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };
  const handleAddTest = async () => {
    console.log("Add Test button clicked!");
    console.log(courseId, testName, testDate);

    // Convert your data to form data
    const formData = new URLSearchParams();
    formData.append("courseId", courseId);
    formData.append("testName", testName);
    formData.append("testDate", testDate);

    try {
      const response = await axios.post("/addTest.php", formData);

      if (response.data.success) {
        console.log("Test added successfully");
        fetchTests();
      } else {
        console.error("Failed to add test:", response.data.message);
      }
    } catch (err) {
      console.error("Error adding test:", err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <div className="flex justify-between">
          <h1>Tests</h1>
          <button onClick={handleAddTest} className="btn">
            Add Test
          </button>
        </div>
        <div>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
          <input
            type="date"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Test</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.test_id}>
                <td>{test.course_id}</td>
                <td>{test.test_name}</td>
                <td>{test.test_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstructorTests;
