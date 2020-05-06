// import React, { useEffect } from "react";
// import { Typography, TextField, Button } from "@material-ui/core";
// import { useField } from "../hooks/index";
// import { LOGIN } from "../graphql/queries";
// import { useMutation } from "@apollo/client";
// import { useHistory } from "react-router-dom";
//
// interface Props {
//   setIsLoggedIn: Function;
//   isLoggedIn: boolean;
// }
//
// const Login: React.FC<Props> = ({ setIsLoggedIn, isLoggedIn }) => {
//   const email = useField("email");
//   const password = useField("password");
//   const history = useHistory();
//
//   const [login, { data }] = useMutation(LOGIN, {
//     onError: (error) => {
//       console.log(error.graphQLErrors[0].message);
//     },
//   });
//
//   useEffect(() => {
//     if (data && data.login) {
//       const { token } = data.login;
//       localStorage.setItem("token", token);
//       setIsLoggedIn(true);
//     }
//   }, [data, setIsLoggedIn]);
//
//   if (isLoggedIn) history.goBack();
//

import React, { useEffect } from "react";
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
import { useField } from "../hooks";
import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../graphql/queries";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:3000/">
        Clolx
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
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

export default function Login({ user }: { user: any }) {
  const classes = useStyles();
  const email = useField("email");
  const password = useField("password");
  const history = useHistory();
  const client = useApolloClient();

  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data && data.login) {
      const { token } = data.login;
      localStorage.setItem("token", token);
      client.resetStore();
    }
  }, [data]);

  if (user !== null) history.goBack();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({
      variables: { email: email.value, password: password.value },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
            {...email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            {...password}
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
              <Link variant="body2">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
