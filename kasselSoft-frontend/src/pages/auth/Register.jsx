/* eslint-disable react/no-unescaped-entities */
import styles from "./Auth.module.css";
import SchoolIcon from "@mui/icons-material/School";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ActionButton from "../../components/Button/Button";
import "@fontsource/roboto/500.css";
import { Link } from "react-router-dom";
import BackdropLoader from "../../components/BackdropLoader/BackdropLoader";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/AuthProvider";
import AlertNotification from "../../components/Alert/Alert";

const Register = () => {
  const { register, registerErrors } = useContext(LoginContext);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password == user.confirm_password) {
      register(user);
    } else {
      setIsPasswordConfirmed(true);
    }
  };
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
          onSubmit={handleSubmit}
        >
          <h1 className={styles.header}>Register</h1>
          <p className={styles.subtext}>Welcome to our students portal.</p>
          <div>
            <TextField
              error={registerErrors["full_name"] ? true : false}
              type="text"
              id="outlined-error-helper-text"
              label="Full Name"
              color="secondary"
              name="full_name"
              helperText={registerErrors["full_name"]}
              className={styles.textField}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              error={registerErrors["email"] ? true : false}
              type="email"
              id="outlined-error-helper-text"
              label="Email"
              color="secondary"
              name="email"
              helperText={registerErrors["email"]}
              className={styles.textField}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              error={registerErrors["username"] ? true : false}
              type="text"
              id="outlined-error-helper-text"
              label="Username"
              color="secondary"
              name="username"
              helperText={registerErrors["username"]}
              className={styles.textField}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              error={registerErrors["password"] ? true : false}
              type="password"
              id="outlined-error-helper-text"
              label="Password"
              color="secondary"
              name="password"
              helperText={registerErrors["password"]}
              className={styles.textField}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              error={isPasswordConfirmed ? true : false}
              type="password"
              id="outlined-error-helper-text"
              label="Confirm Password"
              color="secondary"
              name="confirm_password"
              helperText={
                isPasswordConfirmed ? "Your passwords do not match" : ""
              }
              className={styles.textField}
              onChange={handleChange}
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
      <AlertNotification
        severity="success"
        text="Account have been created successfully"
      />
      <BackdropLoader />
    </div>
  );
};

export default Register;
