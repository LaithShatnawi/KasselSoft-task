/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import base64 from "base-64";
import { jwtDecode } from "jwt-decode";

export const LoginContext = React.createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [signError, setSignError] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const register = async (user) => {
    setOpenLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/register`,
        user
      );

      if (response.data) {
        try {
          console.log(response.data);
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
            navigate("/login");
          }, 3000);
        } catch (e) {
          setLoginState(false, null, {}, e);
          console.error(e);
        }
      }
    } catch (e) {
      console.log(e.response.data.error);
      setRegisterErrors(e.response.data.error);
      setSignError(true);
    }
    setOpenLoader(false);
  };

  const login = async (username, password) => {
    setOpenLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
          },
        }
      );

      if (response.data) {
        try {
          validateToken(response.data);
          console.log(response.data);
        } catch (e) {
          setLoginState(false, null, {}, e);
          console.error(e);
        }
      }
    } catch (e) {
      setSignError(true);
    }
    setOpenLoader(false);
  };

  const logout = () => {
    setLoginState(false, null, {});
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const validateToken = (token) => {
    try {
      const validUser = jwtDecode(token);
      setLoginState(true, token, validUser);

      // navigate based on role
      if (validUser.role == "Student") {
        navigate("/student/dashboard");
      } else if (validUser.role == "Teacher") {
        navigate("/teacher/dashboard");
      }
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);

      // alert in case of invalid token
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
    }
  };

  const setLoginState = (loggedIn, token, user, error) => {
    if (loggedIn) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
    setLoggedIn(loggedIn);
    setUser(user);
    setToken(token);
    setError(error || null);
  };

  const state = {
    loggedIn,
    token,
    error,
    user,
    register,
    login,
    logout,
    signError,
    registerErrors,
    openLoader,
    setOpenAlert,
    openAlert,
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      validateToken(storedToken);
    }
  }, []);

  return (
    <LoginContext.Provider value={state}>{children}</LoginContext.Provider>
  );
};

export default AuthProvider;
