import React from "react";
import { Link } from "react-router-dom";

import Objectives from "./Objectives";
import Overview from "./Overview";
import Assessments from "./Assessments";
import Courses from "./Courses";

function Home() {
  return (
    <main className="container">
      <Overview />
      <Objectives />
      <Assessments />
      <Courses />
    </main>
  );
}

export default Home;
