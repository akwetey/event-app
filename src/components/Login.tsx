import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserContext from "../contexts/UserContexts";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
interface Values {
  email: string;
  password: string;
}

const Login: React.FC<History> = () => {
  const classes = useStyles();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email Should Be A Valid Email Address")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const context = React.useContext(UserContext);
  const handleSubmit = async (values: Values) => {
    try {
      const baseURL =
        process.env.NODE_ENV === "development"
          ? "http://greenbutterfly.io/api"
          : "/api";
      const response = await axios.post(`${baseURL}/auth/login`, {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        context!.setLoggedIn(true);
        localStorage.setItem("userToken", response.data.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              {props.touched.email && (
                <small className="text-danger">{props.errors.email}</small>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.touched.password && (
                <small className="text-danger">{props.errors.password}</small>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
