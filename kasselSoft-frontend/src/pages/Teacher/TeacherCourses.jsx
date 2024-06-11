import { useContext, useState } from "react";
import BackdropLoader from "../../components/BackdropLoader/BackdropLoader";
import Table from "../../components/Table/Table";
import SideNav from "../../layout/SideNav";
import styles from "./Teacher.module.css";
import { CourseContext } from "../../context/CourseProvider";
import ActionButton from "../../components/Button/Button";
import PopupModal from "../../components/Modal/Modal";
import AlertNotification from "../../components/Alert/Alert";

const TeacherCourses = () => {
  const { courses } = useContext(CourseContext);
  const [open, setOpen] = useState(false);

  const rows = [];
  courses.map((course) => {
    rows.push({
      id: course._id,
      name: course.name,
      teacher_name: course?.teacher_id?.full_name,
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
        <div className={styles.courseHeader}>
          <h1>Courses</h1>
          <ActionButton
            text="Add Course"
            variant="contained"
            color="secondary"
            setOpenModal={() => setOpen(true)}
          />
        </div>
        <Table rows={rows} columns={columns} />
      </div>
      <BackdropLoader />
      <AlertNotification
        severity="success"
        text="Course has been added successfully."
      />
      <PopupModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default TeacherCourses;
