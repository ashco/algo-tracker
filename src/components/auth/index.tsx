import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { Auth } from "aws-amplify";

interface Form {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}

enum FormState {
  signUp = "SIGN_UP",
  confirmSignUp = "CONFIRM_SIGN_UP",
  signIn = "SIGN_IN",
  signedIn = "SIGNED_IN",
}

const initialForm: Form = {
  username: "",
  email: "",
  password: "",
  verificationCode: "",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ashco.io/">
        AshCo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const AuthPage: React.FC = () => {
  const [formState, setFormState] = React.useState<FormState>(FormState.signIn);
  const [form, setForm] = React.useState<Form>(initialForm);
  // const [isSnackbarOpen]

  const classes = useStyles();

  const handleChange = (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  async function signIn(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      await Auth.signIn(form.username, form.password);
      /* Once the user successfully signs in, update the form state to show the signed in state */
      setFormState(FormState.signedIn);
    } catch (err) {
      console.log(err);
    }
  }

  async function signUp(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      await Auth.signUp({
        username: form.username,
        password: form.password,
        attributes: {
          email: form.email,
        },
      });
      /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
      setFormState(FormState.confirmSignUp);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmSignUp(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(form.username, form.verificationCode);
      /* Once the user successfully confirms their account, update form state to show the sign in form */
      setFormState(FormState.signIn);
    } catch (err) {
      console.log({ err });
    }
  }

  const renderAuthForm = (formState: FormState) => {
    switch (formState) {
      case "SIGN_UP":
        return (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={handleChange}
                      value={form.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={form.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={form.password}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={signUp}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      onClick={() => setFormState(FormState.signIn)}
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        );
      case "CONFIRM_SIGN_UP":
        return (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Confirm sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={handleChange}
                      value={form.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="verificationCode"
                      label="Verification Code"
                      type="verificationCode"
                      id="verificationCode"
                      onChange={handleChange}
                      value={form.verificationCode}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={confirmSignUp}
                >
                  Confirm Sign Up
                </Button>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        );
      case "SIGN_IN":
        return (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleChange}
                  value={form.username}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={form.password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={signIn}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      onClick={() => setFormState(FormState.signUp)}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        );
      case "SIGNED_IN":
        return <div>Signed In</div>;
      default:
        return <div>error</div>;
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {renderAuthForm(formState)}
    </div>
};

export default AuthPage;
