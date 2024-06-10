import Table from "../../components/Table/Table";
import SideNav from "../../layout/SideNav";
import styles from "./Student.module.css";

const StudentCourses = () => {
  return (
    <div className={styles.dashboardContainer}>
      <SideNav />
      <div className={styles.content}>
        <h1>Courses</h1>
        <Table />
      </div>
    </div>
  );
};

export default StudentCourses;
