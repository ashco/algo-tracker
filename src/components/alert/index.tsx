import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import useAlert from "../../hooks/useAlert";
import PopContext from "../../context/PopContext";

const Alert = () => {
  // const [alert, dispatch] = React.useContext(AlertContext);
  const { state, setState } = React.useContext(PopContext);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // dispatch({ type: "clear" });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      // open={alert.isOpen}
      open={state}
      // autoHideDuration={alert.duration}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        // severity={alert.status}
        onClose={handleClose}
      >
        {/* {alert.text} */}
        test
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

// import React from "react";
// import MuiAlert from "@material-ui/lab/Alert";
// import Snackbar from "@material-ui/core/Snackbar";

// type Status = "error" | "warning" | "info" | "success";

// interface Alert {
//   text: string;
//   status: Status | undefined;
//   isOpen: boolean;
// }

// const initialAlert: Alert = {
//   text: "",
//   status: "error",
//   isOpen: false,
// };

// const AUTO_HIDE_DURATION = 6000;

// export const AlertContext = React.createContext<any>(null);

// const withAlert = (Component: any) => {
//   const WithAlert = (props: any) => {
//     const [alert, setAlert] = React.useState<Alert>(initialAlert);

//     const handleClose = (
//       event: React.SyntheticEvent | React.MouseEvent,
//       reason?: string
//     ) => {
//       if (reason === "clickaway") {
//         return;
//       }
//       setAlert(initialAlert);
//     };

//     const handleAlert = (text: string, status: Status) => {
//       setAlert({
//         text,
//         status,
//         isOpen: true,
//       });

//       setTimeout(() => setAlert(initialAlert), AUTO_HIDE_DURATION);
//     };

//     return (
//       <AlertContext.Provider value={handleAlert}>
//         {/* <Snackbar
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={alert.isOpen}
//           autoHideDuration={AUTO_HIDE_DURATION}
//           onClose={handleClose}
//         >
//           <MuiAlert
//             elevation={6}
//             variant="filled"
//             severity={alert.status}
//             onClose={handleClose}
//           >
//             {alert.text}
//           </MuiAlert>
//         </Snackbar> */}
//         <Component {...props} />
//       </AlertContext.Provider>
//     );
//   };

//   return WithAlert;
// };

// export default withAlert;
