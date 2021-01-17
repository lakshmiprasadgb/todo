import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  InputAdornment,
  IconButton,
  FormHelperText,
  TextField,
  Button,
  Avatar,
  CssBaseline,
} from "@material-ui/core";
import { get as lodashGet } from "lodash";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { authenticate } from "./action";
import { Redirect } from "react-router-dom";

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
const loginInitialState = {
  email: "",
  password: "",
};
export function Login({ authenticate, loginLoading, loginError, redirect }) {
  const [form, setForm] = useState(loginInitialState);
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    const errors = { ...formError };
    const errorMessage = validateProperty(target);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    setFormError(errors);
    const loginForm = form;
    loginForm[name] = value;
    setForm({ ...loginForm });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateSubmit(form);
    if (error !== null) {
      setFormError(error);
      return;
    }
    authenticate(form);
  };

  const validateSubmit = (form) => {
    const error = {};
    if (form["email"].trim() === "") error["email"] = "Email is mandatory";
    if (form["password"].trim() === "")
      error["password"] = "Password is mandatory";
    return Object.keys(error).length === 0 ? null : error;
  };

  const validateProperty = ({ name, value }) => {
    if (value.trim() === "")
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is mandatory`;
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const classes = useStyles();
  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={form["email"]}
            onChange={handleInputChange}
          />
          {formError["email"] && (
            <FormHelperText error>{formError["email"]}</FormHelperText>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={form["password"]}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formError["password"] && (
            <FormHelperText error>{formError["password"]}</FormHelperText>
          )}
          {loginError && (
            <Alert variant="filled" severity="error">
              {loginError}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loginLoading}
            startIcon={
              loginLoading && <CircularProgress color="secondary" size={20} />
            }
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

const MapStateToProps = (state, props) => {
  const error = lodashGet(state, ["loggedUser", "error"], null);
  const redirect = lodashGet(
    state,
    ["loggedUser", "entities", "redirectTo"],
    null
  );
  const loginLoading = lodashGet(
    state,
    ["loggedUser", "loaders", "loginLoading"],
    false
  );
  return {
    loginLoading: loginLoading,
    loginError: error,
    redirect,
  };
};

export default connect(MapStateToProps, { authenticate })(Login);
