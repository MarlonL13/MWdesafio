import { Snackbar, Alert } from "@mui/material";

const AlertNotification = ({
  open,
  onClose,
  message = "Um novo ERRO foi encontrado!",
  severity = "error",
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        "& .MuiSnackbar-root": {
          width: "100%",
        },
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{
          width: "400px", 
          fontSize: "1.1rem",
          padding: "20px",
          "& .MuiAlert-icon": {
            fontSize: "30px",
          },
          "& .MuiAlert-message": {
            padding: "8px 0",
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
