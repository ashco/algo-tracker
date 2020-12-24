import React from "react";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export const AlertContext = React.createContext<any>(null);

const initialAlert = {
  text: "",
  status: "error",
  isOpen: false,
  duration: 6000,
};

const withAlert = (Component: any) => {
  const WithAlert = (props: any) => {
    const [alert, setAlert] = React.useState(initialAlert);

    const handleClose = (
      event: React.SyntheticEvent | React.MouseEvent,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setAlert(initialAlert);
    };

    const triggerAlert = (text: string) => {
      setAlert({ ...alert, text, isOpen: true });
    };

    return (
      <AlertContext.Provider value={triggerAlert}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={alert.isOpen}
          autoHideDuration={alert.duration}
          onClose={handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={"error"}
            onClose={handleClose}
          >
            {alert.text}
          </MuiAlert>
        </Snackbar>
        <Component {...props} />
      </AlertContext.Provider>
    );
  };

  return WithAlert;
};

export default withAlert;
