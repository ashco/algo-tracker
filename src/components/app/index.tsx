import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Amplify, { Hub, Auth } from "aws-amplify";
import awsexports from "../../aws-exports";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TimelineIcon from "@material-ui/icons/Timeline";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";

import withAlerts from "../../context/withAlerts";
import { AlertContext } from "../../context/withAlerts";

import Home from "../home";
// import AuthForm from "../auth";
import Analytics from "../analytics";
import History from "../history";
import "./App.css";
import SignIn from "../auth/signIn";
import SignUp from "../auth/signUp";
import ConfirmSignUp from "../auth/confirmSignUp";
import ForgotPassword from "../auth/forgotPassword";
import ForgotPasswordSubmit from "../auth/forgotPasswordSubmit";

Amplify.configure(awsexports);

// const theme = createMuiTheme({
//   palette: {
//     primary: blueGrey,
//     secondary: orange,
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  bottomNav: {
    bottom: 0,
    position: "fixed",
    width: "100vw",
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: "250px",
  },
  fab: {
    bottom: 20,
    right: 20,
    margin: 0,
    top: "auto",
    left: "auto",
    position: "fixed",
  },
}));

function App() {
  const triggerAlert = React.useContext(AlertContext);

  const [user, setUser] = React.useState(null);
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
    async function updateUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (err) {
        setUser(null);
      }
    }

    updateUser();

    Hub.listen("auth", updateUser);
    return () => Hub.remove("auth", updateUser);
  }, []);

  React.useEffect(() => {
    if (location.pathname === "/history") {
      setNavVal(0);
    } else if (location.pathname === "/analytics") {
      setNavVal(1);
    } else {
      setNavVal(null);
    }
  }, [location]);

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>Algo Tracker</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Helmet>
        <AppBar position="static">
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/history" component={History} />
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
        <BottomNavigation
          value={navVal}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            onClick={() => history.push("/history")}
            label="History"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            onClick={() => history.push("/analytics")}
            label="Analytics"
            icon={<TimelineIcon />}
          />
        </BottomNavigation>

        {user && (
          <Fab
            size="large"
            color="secondary"
            aria-label="add"
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
    </HelmetProvider>
  );
}

export default withAlerts(App);
