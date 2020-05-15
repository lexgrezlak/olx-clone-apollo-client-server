import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SIGN_IN } from "../graphql/queries";
import MyTextField from "../components/MyTextField";
import ErrorNotification from "../components/ErrorNotification";

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

interface SignInProps {
  isLoggedIn: boolean | null;
}

interface SignInFormFields {
  email: string;
  password: string;
}

export default function SignIn({ isLoggedIn }: SignInProps) {
  const history = useHistory();
  if (isLoggedIn) history.goBack();
  const classes = useStyles();
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [signIn, { data }] = useMutation(SIGN_IN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data && data.signIn) {
      const { token } = data.signIn;
      localStorage.setItem("token", token);
      client.resetStore();
    }
  }, [client, data, history]);

  if (isLoggedIn !== false) return null;

  function handleSubmit({ email, password }: SignInFormFields) {
    // event.preventDefault();
    console.log(email);
    return signIn({
      variables: { input: { email, password } },
    });
  }

  const initialValues: SignInFormFields = { email: "", password: "" };

  return (
    <>
      {errorMessage && <ErrorNotification message={errorMessage} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues as any}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Required"),
              password: Yup.string().required("Required"),
            })}
          >
            {({ isSubmitting }) => (
              <Form noValidate className={classes.form}>
                <MyTextField
                  name="email"
                  type="email"
                  label="Email"
                  autoFocus
                />
                <MyTextField name="password" type="password" label="Password" />
                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="/forgotpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2" component={RouterLink} to="/signup">
                      Don&apos;t have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
}
