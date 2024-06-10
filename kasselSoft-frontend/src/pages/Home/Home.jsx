import styles from "./Home.module.css";
import "@fontsource/roboto/500.css";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import ActionButton from "../../components/Button/Button";

/* eslint-disable react/no-unescaped-entities */
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          Welcome to{" "}
          <Link to="/" className={styles.logo_container}>
            <SchoolIcon
              sx={{
                display: { color: "white", x: "none", md: "flex" },
                fontSize: "100px",
              }}
            />
            <Typography
              variant="h6"
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
                fontSize: "50px",
              }}
            >
              LAITH-EMS
            </Typography>
          </Link>{" "}
          Home Page
        </div>
        <p className={styles.subtext}>
          Choose an option depending if you have an account or not.
        </p>
        <div className={styles.btnContainers}>
          <Link to="/login">
            <ActionButton
              text="Log into your account"
              variant="contained"
              color="secondary"
            />
          </Link>
          <Link to="/register">
            <ActionButton
              text="Sign up for an account"
              variant="outlined"
              color="inherit"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
