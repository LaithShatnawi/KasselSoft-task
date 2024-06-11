/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import styles from "./Modal.module.css";
import { useContext } from "react";
import { LoginContext } from "../../context/AuthProvider";
import { useState } from "react";
import { CourseContext } from "../../context/CourseProvider";
import BackdropLoader from "../BackdropLoader/BackdropLoader";

export default function PopupModal({
  open,
  setOpen,
  title = "Add new Course",
  subtext = "Fill in the information of the course.",
}) {
  const { user } = useContext(LoginContext);
  const { addCourse, errors } = useContext(CourseContext);
  const [course, setCourse] = useState({
    name: "",
    description: "",
    pass_mark: "",
    start_date: "",
    end_date: "",
  });
  console.log(course);

  const handleChange = (e) => {
    setCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    course.teacher_id = user._id;
    addCourse(course, setOpen);
  };

  console.log(errors);

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{subtext}</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  error={errors["name"] ? true : false}
                  autoFocus
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
                <p className={styles.err}>{errors["name"]}</p>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  error={errors["description"] ? true : false}
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
                <p className={styles.err}>{errors["description"]}</p>
              </FormControl>
              <FormControl>
                <FormLabel>Pass Mark</FormLabel>
                <Input
                  error={errors["pass_mark"] ? true : false}
                  name="pass_mark"
                  type="number"
                  min={1}
                  onChange={handleChange}
                />
                <p className={styles.err}>{errors["pass_mark"]}</p>
              </FormControl>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  error={errors["start_date"] ? true : false}
                  name="start_date"
                  type="date"
                  onChange={handleChange}
                />
                <p className={styles.err}>{errors["start_date"]}</p>
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  error={errors["end_date"] ? true : false}
                  name="end_date"
                  type="date"
                  onChange={handleChange}
                />
              </FormControl>
              <p className={styles.err}>{errors["end_date"]}</p>
              <Button type="submit" className={styles.btn}>
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <BackdropLoader />
    </React.Fragment>
  );
}
