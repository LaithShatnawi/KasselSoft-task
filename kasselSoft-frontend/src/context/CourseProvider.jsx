/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

export const CourseContext = React.createContext();

const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const getCourses = async () => {
    setOpenLoader(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/courses/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data) {
        console.log(response.data);
        setCourses(response.data);
      }
    } catch (e) {
      console.log(e);
    }
    setOpenLoader(false);
  };

  const addCourse = async (course,setOpen) => {
    setOpenLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/courses/add`,
        course,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data) {
        console.log(response.data);
        getCourses();
        setOpen(false)
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.error);
    }
    setOpenLoader(false);
  };

  const state = {
    courses,
    openLoader,
    getCourses,
    addCourse,
    errors,
    openAlert,
    setOpenAlert,
  };
  return (
    <CourseContext.Provider value={state}>{children}</CourseContext.Provider>
  );
};

export default CourseProvider;
