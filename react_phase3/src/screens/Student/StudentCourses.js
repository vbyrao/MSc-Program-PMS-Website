import React, { useState, useEffect } from "react";
import CheckMark from "../../assets/images/icons/checkmark.svg";
import axios from "../../api/axios";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  const handleUnenroll = async (courseId) => {
    const formData = new URLSearchParams();
    formData.append("email", userEmail);
    formData.append("courseId", courseId);

    try {
      const response = await axios.post("/unenrollCourse.php", formData);
      if (response.data.success) {
        // Update the course's action to 'Enroll'
        const updatedCourses = courses.map((course) =>
          course.id === courseId ? { ...course, action: "Enroll" } : course
        );
        setCourses(updatedCourses);
      } else {
        console.error("Failed to unenroll:", response.data.message);
      }
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/getCourses.php");
      if (response.data.success) {
        const allCourses = response.data.courses;

        const formData = new URLSearchParams();
        formData.append("email", userEmail);

        const enrolledCoursesResponse = await axios.post(
          "/getStudentCourse.php",
          formData
        );

        const enrolledCourseIds = new Set(
          enrolledCoursesResponse.data.courses.map((course) => course.id)
        );

        const coursesWithAction = allCourses.map((course) => ({
          ...course,
          action: enrolledCourseIds.has(course.id) ? "Leave" : "Enroll",
        }));

        setCourses(coursesWithAction);
      } else {
        console.error("Failed to fetch courses:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEnrollClick = async (courseId) => {
    const formData = new URLSearchParams();
    formData.append("email", userEmail);
    formData.append("courseId", courseId);

    try {
      const response = await axios.post("/enrollCourse.php", formData);
      if (response.data.success) {
        // Update the course's action to 'Leave'
        const updatedCourses = courses.map((course) =>
          course.id === courseId ? { ...course, action: "Leave" } : course
        );
        setCourses(updatedCourses);
      } else {
        console.error("Failed to enroll:", response.data.message);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className="main flex-2">
        <div className="tab-content" id="profile">
          <h1>Courses</h1>
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
                  <td>{course.name}</td>
                  <td className="flex justify-between">
                    {course.action === "Leave" && (
                      <img src={CheckMark} alt="checkmark" className="icon" />
                    )}
                    <button
                      className={course.action.toLowerCase() + "-button"}
                      onClick={() => {
                        if (course.action === "Enroll") {
                          handleEnrollClick(course.id);
                        } else {
                          handleUnenroll(course.id);
                        }
                      }}
                    >
                      {course.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentCourses;
