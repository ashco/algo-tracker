import React from "react";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { AlertContext } from "../../../context/withAlerts";
import Copyright from "../copyright";

import { Auth } from "aws-amplify";

interface Form {
  username: string;
  verificationCode: string;
}

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

const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const triggerAlert = React.useContext(AlertContext);

  const { register, handleSubmit, watch, errors } = useForm<Form>();

  async function confirmSignUp(data: Form) {
    try {
      await Auth.confirmSignUp(data.username, data.verificationCode);
      /* Once the user successfully confirms their account, update form state to show the sign in form */
      history.push("/history");
    } catch (err) {
      triggerAlert(err.log || err.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm sign up
        </Typography>
        <form
          onSubmit={handleSubmit(confirmSignUp)}
          className={classes.form}
          noValidate
        >
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
                inputRef={register}
                // onChange={handleChange}
                // value={form.username}
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
                inputRef={register}
                // onChange={handleChange}
                // value={form.verificationCode}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={confirmSignUp}
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
};

export default SignIn;
