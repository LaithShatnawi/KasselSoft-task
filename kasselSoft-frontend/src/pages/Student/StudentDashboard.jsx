import styles from "./Student.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import SideNav from "../../layout/SideNav";

const StudentDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <SideNav />
      <div className={styles.content}>
        <h1>Student Dashboard</h1>
        <div className={styles.charts}>
          <div>
            <h2>Annual performance</h2>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={200}
              width={300}
              xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
          <div>
            <h2>Average grade per course</h2>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={200}
              width={300}
            />
          </div>
          <div>
            <h2>Total grades</h2>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "S1" },
                    { id: 1, value: 15, label: "S2" },
                    { id: 2, value: 20, label: "S3" },
                  ],
                },
              ]}
              height={200}
              width={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
