import React from "react";

function Objectives() {
  return (
    <section id="objectives">
      <h1 className="text-left">Our Objectives</h1>
      <p>
        Our program is designed to help you achieve skills and knowledge in the
        following areas:
      </p>
      <div className="grid">
        <ObjectiveCard
          title="Problem-solving skills"
          description="Develop strong problem-solving skills and an understanding of advanced algorithms and data structures, which are fundamental to computer science."
        />
        <ObjectiveCard
          title="Machine learning and AI"
          description="Specialize in machine learning and AI, becoming proficient in these advanced areas of computer science."
        />
        <ObjectiveCard
          title="Cybersecurity"
          description="Gain expertise in cybersecurity, including ethical hacking, network security, and data protection, while instilling ethical considerations in technology practices."
        />
        <ObjectiveCard
          title="Database management"
          description="Provide advanced knowledge in database management systems, data modeling, and data analysis, which are essential skills for various careers in computer science."
        />
        <ObjectiveCard
          title="Software engineering"
          description="Prepare students to work on large-scale software projects, emphasizing software design principles, development methodologies, and collaboration skills."
        />
        <ObjectiveCard
          title="Computer graphics"
          description="Focus on computer graphics, visualization, and multimedia technologies, developing skills in creating graphical user interfaces and data visualization."
        />
        <ObjectiveCard
          title="Research skills"
          description="Equip students with research skills necessary for conducting original research, including designing experiments, collecting data, and publishing findings."
        />
        <ObjectiveCard
          title="Ethics in computing"
          description="Address ethical issues in computing, emphasizing responsible technology use, privacy, and security considerations."
        />
        <ObjectiveCard
          title="Operating systems"
          description="Gain a deeper understanding of operating systems, distributed computing, and system-level software development."
        />
        <ObjectiveCard
          title="Cloud computing"
          description="Learn about cloud technologies and big data processing, which are increasingly important in modern computing environments."
        />
      </div>
    </section>
  );
}

function ObjectiveCard({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Objectives;
