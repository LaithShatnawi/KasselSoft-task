import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Auth from "./auth/Auth";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "./App.css";
import StudentCourses from "./pages/Student/StudentCourses";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* PROTECTED ROUTES */}
      <Auth>
        <Header />
        <Routes>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Routes>
        <Footer />
      </Auth>
    </>
  );
}

export default App;
