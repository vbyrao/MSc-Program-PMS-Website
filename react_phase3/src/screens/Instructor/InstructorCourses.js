import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [error, setError] = useState(null);

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

  const handleDeleteCourse = async (courseId) => {
    try {
      const formData = new URLSearchParams();
      formData.append("id", courseId);
      const response = await axios.post("/deleteCourse.php", formData);
      if (response.data.success) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    const formData = new URLSearchParams();
    formData.append("id", newCourseId);
    formData.append("name", newCourseName);

    try {
      const response = await axios.post("/addCourse.php", formData);
      if (response.data.success) {
        fetchCourses();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const openDialog = () => {
    setError(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setError(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="main flex-2">
      <div className="tab-content" id="profile">
        {error && <div className="error-message">{error}</div>}

        <div className="flex justify-between">
          <h1>Courses</h1>
          <button className="add-button" onClick={openDialog}>
            Add Course
          </button>
        </div>
        {isDialogOpen && (
          <div>
            <input
              type="text"
              value={newCourseId}
              onChange={(e) => setNewCourseId(e.target.value)}
              placeholder="Enter Course ID"
            />
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Enter Course Name"
            />
            <button onClick={handleAddCourse}>Submit</button>
            <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.id}</td>
                <td>
                  <a href={`/course.html?course=${course.id}`}>{course.name}</a>
                </td>
                <td className="flex justify-between">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCourse(course.id)}
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

export default InstructorCourses;
