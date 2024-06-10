import styles from "./Layout.module.css";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className={styles.sideNav}>
      <div className={styles.optionContainer}>
        <Link to="/student/dashboard" className={styles.option}>
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
        <Link to="/student/courses" className={styles.option}>
          <AutoStoriesIcon />
          <span>Courses</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
