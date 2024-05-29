import React from "react";
import { Link } from "react-router-dom";

function Courses() {
  return (
    <section id="courses" className="text-left">
      <h2>Courses</h2>

      <details>
        <summary>
          <h2>CS-101: Advanced Algorithms and Data Structures</h2>
        </summary>
        <p>
          Develop strong problem-solving skills and an understanding of advanced
          algorithms and data structures, which are fundamental to computer
          science.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-102: Machine Learning and Artificial Intelligence</h2>
        </summary>
        <p>
          Specialize in machine learning and AI, becoming proficient in these
          advanced areas of computer science.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-103: Cybersecurity and Network Security</h2>
        </summary>
        <p>
          Gain expertise in cybersecurity, including ethical hacking, network
          security, and data protection, while instilling ethical considerations
          in technology practices.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-104: Advanced Database Systems</h2>
        </summary>
        <p>
          Provide advanced knowledge in database management systems, data
          modeling, and data analysis, which are essential skills for various
          careers in computer science.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-105: Software Engineering and Development</h2>
        </summary>
        <p>
          Prepare students to work on large-scale software projects, emphasizing
          software design principles, development methodologies, and
          collaboration skills.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-106: Computer Graphics and Visualization</h2>
        </summary>
        <p>
          Focus on computer graphics, visualization, and multimedia
          technologies, developing skills in creating graphical user interfaces
          and data visualization.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-107: Research Methods in Computer Science</h2>
        </summary>
        <p>
          Equip students with research skills necessary for conducting original
          research, including designing experiments, collecting data, and
          publishing findings.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-108: Ethics in Computing</h2>
        </summary>
        <p>
          Address ethical issues in computing, emphasizing responsible
          technology use, privacy, and security considerations.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-109: Advanced Operating Systems</h2>
        </summary>
        <p>
          Gain a deeper understanding of operating systems, distributed
          computing, and system-level software development.
          <Link to="/course"> More Details </Link>
        </p>
      </details>

      <details>
        <summary>
          <h2>CS-110: Cloud Computing and Big Data</h2>
        </summary>
        <p>
          Learn about cloud technologies and big data processing, which are
          increasingly important in modern computing environments.
          <Link to="/course"> More Details </Link>
        </p>
      </details>
    </section>
  );
}

export default Courses;
