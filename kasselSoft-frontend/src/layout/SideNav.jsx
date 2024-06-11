import styles from "./Layout.module.css";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from '@mui/icons-material/People';
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CourseContext } from "../context/CourseProvider";
import { When } from "react-if";
import { LoginContext } from "../context/AuthProvider";

const SideNav = () => {
  const { user } = useContext(LoginContext);
  const { getCourses } = useContext(CourseContext);
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className={styles.sideNav}>
      <div className={styles.optionContainer}>
        <Link
          to={
            user.role == "Teacher" ? "/teacher/dashboard" : "/student/dashboard"
          }
          className={isActive("/dashboard") ? styles.active : styles.option}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
        <Link
          to={user.role == "Teacher" ? "/teacher/courses" : "/student/courses"}
          className={isActive("/courses") ? styles.active : styles.option}
          onClick={getCourses}
        >
          <AutoStoriesIcon />
          <span>Courses</span>
        </Link>
        <When condition={user.role == "Teacher"}>
          <Link
            to="/teacher/students"
            className={isActive("/students") ? styles.active : styles.option}
            // onClick={getStudents}
          >
            <PeopleIcon />
            <span>Students</span>
          </Link>
        </When>
      </div>
    </div>
  );
};

export default SideNav;
