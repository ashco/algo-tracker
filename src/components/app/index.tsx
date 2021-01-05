import React from "react";

import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Amplify, { Hub, Auth } from "aws-amplify";
import awsexports from "../../aws-exports";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TimelineIcon from "@material-ui/icons/Timeline";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/List";
import withAlerts from "../../context/withAlerts";
import { AlertContext } from "../../context/withAlerts";

import Home from "../home";
import Form from "../form";
// import AuthForm from "../auth";
import List from "../list";
import Analytics from "../analytics";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import ConfirmSignUp from "../auth/confirmSignUp";
import ForgotPassword from "../auth/forgotPassword";
import ForgotPasswordSubmit from "../auth/forgotPasswordSubmit";
// import "./App.css";

import { Meta } from "../meta";

Amplify.configure(awsexports);

const useStyles = makeStyles((theme) => ({
  app: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    height: "100vh",
  },
  bottomNav: {
    bottom: 0,
    position: "absolute",
    width: "100vw",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    fontWeight: 600,
  },
  fab: {
    bottom: 20,
    right: 20,
    margin: 0,
    top: "auto",
    left: "auto",
    position: "fixed",
  },
  main: {
    overflowY: "auto",
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
}));

async function updateUser(setUser: React.Dispatch<any>) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
  } catch (err) {
    setUser(null);
  }
}

function App() {
  const triggerAlert = React.useContext(AlertContext);

  const [user, setUser] = React.useState<any>(null);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (err) {
      triggerAlert(err.log || err.message);
      console.log("error signing out: ", err);
    }
  }

  const [navVal, setNavVal] = React.useState<null | 0 | 1>(null);

  React.useEffect(() => {
    updateUser(setUser);

    Hub.listen("auth", () => updateUser(setUser));
    return () => Hub.remove("auth", () => updateUser(setUser));
  }, []);

  React.useEffect(() => {
    if (location.pathname === "/list") {
      setNavVal(0);
    } else if (location.pathname === "/analytics") {
      setNavVal(1);
    } else {
      setNavVal(null);
    }
  }, [location]);

  return (
    <div className={classes.app}>
      <Meta />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Algo Tracker
          </Typography>
          {user === null ? (
            <Button color="inherit" onClick={() => history.push("/sign-in")}>
              Admin
            </Button>
          ) : (
            <Button color="inherit" onClick={signOut}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list">
            <List user={user} />
          </Route>
          <Route path="/form/:id">
            <Form />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/confirm-sign-up" component={ConfirmSignUp} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/forgot-password-submit"
            component={ForgotPasswordSubmit}
          />
        </Switch>
      </main>
      <BottomNavigation value={navVal} showLabels className={classes.bottomNav}>
        <BottomNavigationAction
          onClick={() => history.push("/list")}
          label="List"
          icon={<ListIcon />}
        />
        <BottomNavigationAction
          onClick={() => history.push("/analytics")}
          label="Analytics"
          icon={<TimelineIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default withAlerts(App);
