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
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { SIGN_UP } from "../graphql/queries";
import ErrorNotification from "../components/ErrorNotification";
import MyTextField from "../components/postingForm/MyTextField";
import {
  invalidMessage,
  maxMessage,
  minMessage,
  requiredMessage,
} from "../common/validationMessages";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface SignUpFormFields {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const classes = useStyles();
  const client = useApolloClient();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [signUp, { data }] = useMutation(SIGN_UP, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data?.signUp) {
      const { token } = data.signUp;
      localStorage.setItem("token", token);
      client.resetStore().then(() => {
        history.push("/");
      });
    }
  }, [client, data, history]);

  function handleSubmit({ name, email, password }: SignUpFormFields) {
    return signUp({
      variables: {
        input: {
          name,
          email,
          password,
        },
      },
    });
  }

  const initialValues: SignUpFormFields = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const lowercaseRegex = /(?=.*[a-z])/;
  const uppercaseRegex = /(?=.*[A-Z])/;
  const numericRegex = /(?=.*[0-9])/;

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
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues as any}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(2, minMessage(2))
                .max(50, maxMessage(50))
                .nullable(),
              email: Yup.string()
                .email(invalidMessage("email"))
                .required(requiredMessage),
              password: Yup.string()
                .matches(lowercaseRegex, "One lowercase required")
                .matches(uppercaseRegex, "One uppercase required")
                .matches(numericRegex, "One numeric required")
                .min(8, minMessage(8))
                .max(50, maxMessage(50))
                .required(requiredMessage),
              passwordConfirm: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords are not the same")
                .required(requiredMessage),
            })}
          >
            {({ isSubmitting }) => (
              <Form noValidate className={classes.form}>
                <MyTextField name="name" type="text" label="Name" autoFocus />
                <MyTextField name="email" type="email" label="Email" required />
                <MyTextField
                  name="password"
                  type="password"
                  label="Password"
                  required
                />
                <MyTextField
                  name="passwordConfirm"
                  type="password"
                  label="Confirm password"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link variant="body2" component={RouterLink} to="/signin">
                      Already have an account? Sign in
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
