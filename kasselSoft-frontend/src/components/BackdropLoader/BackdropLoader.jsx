/* eslint-disable react/prop-types */
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { LoginContext } from "../../context/AuthProvider";

export default function BackdropLoader({ color = "inherit" }) {
  const { openLoader } = useContext(LoginContext);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color={color} />
      </Backdrop>
    </div>
  );
}
