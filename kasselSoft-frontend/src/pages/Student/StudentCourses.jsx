import { useContext } from "react";
import BackdropLoader from "../../components/BackdropLoader/BackdropLoader";
import Table from "../../components/Table/Table";
import SideNav from "../../layout/SideNav";
import styles from "./Student.module.css";
import { CourseContext } from "../../context/CourseProvider";

const StudentCourses = () => {
  const { courses } = useContext(CourseContext);

  const rows = [];
  courses.map((course) => {
    rows.push({
      id: course._id,
      name: course.name,
      teacher_name: course.teacher_id.full_name,
      pass_mark: course.pass_mark,
      start_date: course.start_date,
      end_date: course.end_date,
      number_of_students: course.students.length,
    });
  });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "teacher_name", headerName: "Teacher name", width: 130 },
    { field: "pass_mark", headerName: "Pass mark", type: "number", width: 130 },
    { field: "start_date", headerName: "Start date", width: 130 },
    { field: "end_date", headerName: "End date", width: 130 },
    {
      field: "number_of_students",
      headerName: "Students",
      width: 130,
    },
  ];
  return (
    <div className={styles.dashboardContainer}>
      <SideNav />
      <div className={styles.content}>
        <h1>Courses</h1>
        <Table rows={rows} columns={columns} />
      </div>
      <BackdropLoader />
    </div>
  );
};

export default StudentCourses;
