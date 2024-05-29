import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function StudentTests() {
  const [tests, setTests] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const studentEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const formData = new URLSearchParams();
      formData.append("email", studentEmail);

      try {
        const response = await axios.post("/getStudentCourse.php", formData);

        if (response.data.success) {
          setEnrolledCourses(response.data.courses.map((course) => course.id));
        } else {
          console.error(
            "Failed to fetch enrolled courses:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [studentEmail]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.post("/getTests.php");

        if (response.data.success) {
          const filteredTests = response.data.data.filter((test) =>
            enrolledCourses.includes(test.course_id)
          );
          setTests(filteredTests);
        } else {
          console.error("Failed to fetch tests:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    if (enrolledCourses.length) {
      fetchTests();
    }
  }, [enrolledCourses]);

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        <h1>Upcoming Tests</h1>
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Test</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
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

export default StudentTests;
