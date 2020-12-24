import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import Amplify, { Auth } from "aws-amplify";
import awsexports from "../../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import AppBar from "@material-ui/core/AppBar";
import { blueGrey, orange } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimelineIcon from "@material-ui/icons/Timeline";
import MailIcon from "@material-ui/icons/Mail";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import withAlerts from "../../context/withAlerts";

import Home from "../home";
import Form from "../form";
import AuthForm from "../auth";
import Analytics from "../analytics";
import History from "../history";

import "./App.css";

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
  const classes = useStyles();

  const [isAdmin, setIsAdmin] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  async function signOut() {
    try {
      await Auth.signOut();
      console.log("Signed out");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const [navVal, setNavVal] = React.useState<null | 0 | 1>(null);

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
            {location.pathname !== "/auth" && (
              <Button color="inherit" onClick={() => history.push("/auth")}>
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={AuthForm} />
          <Route exact path="/history" component={History} />
          <Route exact path="/analytics" component={Analytics} />
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

        {isAdmin && (
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
