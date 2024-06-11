import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Auth from "./auth/Auth";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import StudentCourses from "./pages/Student/StudentCourses";
import AuthProvider from "./context/AuthProvider";
import CourseProvider from "./context/CourseProvider";
import TeacherCourses from "./pages/Teacher/TeacherCourses";

function App() {
  return (
    <>
      <AuthProvider>
        <CourseProvider>
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
              <Route path="/teacher/courses" element={<TeacherCourses />} />
            </Routes>
            <Footer />
          </Auth>
        </CourseProvider>
      </AuthProvider>
    </>
  );
}

export default App;
