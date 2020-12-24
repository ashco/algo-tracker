import React from "react";

type Status = "error" | "warning" | "info" | "success";

interface Alert {
  text: string;
  status: Status | undefined;
  isOpen: boolean;
  duration: number;
}

const initialAlert: Alert = {
  text: "",
  status: "error",
  isOpen: false,
  duration: 6000,
};

// function reducer(state: any, action: any) {
//   const newState = { ...initialAlert };

//   switch (action.type) {
//     case "error":
//     case "warning":
//     case "info":
//     case "success":
//       newState.isOpen = true;
//       newState.text = action.text;
//       newState.status = action.type;
//       return newState;
//     case "clear":
//       return initialAlert;
//     default:
//       throw new Error();
//   }
// }

// const useAlert = () => {
//   const [alert, dispatch] = React.useReducer(reducer, initialAlert);

//   return [alert, dispatch];
// };

const AlertContext = React.createContext<any>(null);

export default AlertContext;
