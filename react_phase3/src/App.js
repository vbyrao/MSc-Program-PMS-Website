import "./assets/styles/styles.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import About from "./screens/About/About";
import Home from "./screens/Home/Home";
import ProgramServices from "./screens/Services/Services";
import ContactUs from "./screens/Contact/Contact";
import Student from "./screens/Student/Student";
import Instructor from "./screens/Instructor/Instructor";
import Admin from "./screens/Admin/Admin";
import QA from "./screens/QA/QA";
import ProgramCoordinator from "./screens/ProgramCoordinator/ProgramCoordinator";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import RegisterAccount from "./screens/Register";
// import About from "./Pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ProgramServices />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/courses" element={<Student />} />
        <Route path="/student/tests" element={<Student />} />
        <Route path="/student/notifications" element={<Student />} />
        <Route path="/student/chat" element={<Student />} />

        <Route path="/instructor/" element={<Instructor />} />
        <Route path="/instructor/courses" element={<Instructor />} />
        <Route path="/instructor/students" element={<Instructor />} />
        <Route path="/instructor/tests" element={<Instructor />} />
        <Route path="/instructor/notifications" element={<Instructor />} />
        <Route path="/instructor/chat" element={<Instructor />} />

        <Route path="/admin/" element={<Admin />} />
        <Route path="/admin/users" element={<Admin />} />
        <Route path="/admin/notifications" element={<Admin />} />
        <Route path="/admin/chat" element={<Admin />} />
        <Route path="/admin/adduser" element={<Admin />} />

        <Route path="/qa/" element={<QA />} />
        <Route path="/qa/policies" element={<QA />} />
        <Route path="/qa/recommendations" element={<QA />} />
        <Route path="/qa/reports" element={<QA />} />
        <Route path="/qa/notifications" element={<QA />} />
        <Route path="/qa/chat" element={<QA />} />
        <Route path="/qa/QAAddPolicy" element={<QA />} />

        <Route path="/coordinator/" element={<ProgramCoordinator />} />
        <Route path="/coordinator/students" element={<ProgramCoordinator />} />
        <Route
          path="/coordinator/notifications"
          element={<ProgramCoordinator />}
        />
        <Route path="/coordinator/chat" element={<ProgramCoordinator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterAccount />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
