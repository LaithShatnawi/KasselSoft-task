/* eslint-disable react/prop-types */
import "@fontsource/roboto/500.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ActionButton({
  text = "Submit",
  variant = "contained",
  color = "primary",
  type,
  sx,
}) {
  return (
    <Stack direction="row" spacing={2} sx={sx}>
      <Button variant={variant} color={color} type={type} sx={sx}>
        {text}
      </Button>
    </Stack>
  );
}
