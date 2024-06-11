/* eslint-disable react/prop-types */
import "@fontsource/roboto/500.css";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { LoginContext } from "../../context/AuthProvider";

export default function AlertNotification({
  severity = "info",
  text = "info",
}) {
  const { openAlert, setOpenAlert } = useContext(LoginContext);

  return (
    <Box
      sx={{
        position: "absolute",
        left: 10,
        top: 10,
        width: "40%",
      }}
    >
      <Collapse in={openAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
}
