/* eslint-disable react/no-unescaped-entities */
import styles from "./Auth.module.css";
import SchoolIcon from "@mui/icons-material/School";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ActionButton from "../../components/Button/Button";
import "@fontsource/roboto/500.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={styles.login_container}>
      <div className={styles.left_col}>
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
        </Link>
      </div>

      {/* FORM */}
      <div className={styles.right_col}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            width: "50%",
          }}
          noValidate
          autoComplete="off"
          // onSubmit={}
        >
          <h1 className={styles.header}>Register</h1>
          <p className={styles.subtext}>Welcome to our students portal.</p>
          <div>
            <TextField
              error=""
              type="email"
              id="outlined-error-helper-text"
              label="Email"
              color="secondary"
              helperText=""
              className={styles.textField}
            />
          </div>
          <div>
            <TextField
              error=""
              type="text"
              id="outlined-error-helper-text"
              label="Username"
              color="secondary"
              helperText=""
              className={styles.textField}
            />
          </div>
          <div>
            <TextField
              error=""
              type="password"
              id="outlined-error-helper-text"
              label="Password"
              color="secondary"
              helperText=""
              className={styles.textField}
            />
          </div>
          <div>
            <TextField
              error=""
              type="password"
              id="outlined-error-helper-text"
              label="Confirm Password"
              color="secondary"
              helperText=""
              className={styles.textField}
            />
          </div>
          <ActionButton
            type="submit"
            text="Register"
            variant="contained"
            color="secondary"
            sx={{ margin: "10px", width: "100%" }}
          />
          <p className={styles.registerLink}>
            If you already have an account login <Link to="/login">here</Link>
          </p>
        </Box>
      </div>
    </div>
  );
};

export default Register;
