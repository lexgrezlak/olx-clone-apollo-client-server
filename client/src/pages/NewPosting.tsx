import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  Button,
  Typography,
  createStyles,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ADD_POSTING } from "../graphql/queries";
import MyTextField from "../components/MyTextField";
import MySelect from "../components/MySelect";
import MyUploadField from "../components/MyUploadField";
import {
  invalidValue,
  maxMessage,
  minMessage,
  requiredMessage,
} from "../common/validationMessages";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

export interface NewPostingFormFields {
  title: string;
  category: string;
  description: string;
  price: string;
  condition: string;
  phone: string;
  city: string;
  urls: string[];
}

export const CATEGORIES = ["Fashion", "Electronics", "Health"];
export const CONDITIONS = ["New", "Used"];

export const postingValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, minMessage(2))
    .max(15, maxMessage(15))
    .required(requiredMessage),
  category: Yup.string()
    .oneOf(CATEGORIES, invalidValue("category"))
    .required(requiredMessage),
  description: Yup.string()
    .min(10, minMessage(10))
    .max(250, maxMessage(250))
    .required(requiredMessage),
  price: Yup.number()
    .positive(invalidValue("price"))
    .integer(invalidValue("price"))
    .required(requiredMessage),
  condition: Yup.string()
    .oneOf(CONDITIONS, invalidValue("condition"))
    .required(requiredMessage),
  phone: Yup.number()
    .positive(invalidValue("phone number"))
    .integer(invalidValue("phone number"))
    .required(requiredMessage),
  urls: Yup.array()
    .of(Yup.string())
    .min(1, "Minimum 1 photo allowed")
    .max(2, "Maximum 2 photos allowed")
    .required(requiredMessage),
  city: Yup.string()
    .min(2, minMessage(2))
    .max(50, maxMessage(2))
    .required(requiredMessage),
});

function NewPosting() {
  const [addPosting] = useMutation(ADD_POSTING, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const history = useHistory();
  const client = useApolloClient();
  const classes = useStyles();

  async function handleSubmit({
    title,
    category,
    description,
    urls: imageUrls,
    price,
    condition,
    city,
    phone,
  }: NewPostingFormFields) {
    const response = await addPosting({
      variables: {
        title,
        category,
        description,
        imageUrls,
        price: +price,
        condition,
        city,
        phone,
      },
    });

    await client.resetStore();
    history.push(`/posting/${response.data.addPosting.id}`);
  }

  const initialValues: NewPostingFormFields = {
    title: "",
    category: "",
    description: "",
    price: "",
    condition: "",
    phone: "",
    city: "",
    urls: [],
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add new posting
        </Typography>
        <Formik
          initialValues={initialValues as any}
          onSubmit={handleSubmit}
          validationSchema={postingValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form noValidate className={classes.form}>
              <MyTextField name="title" type="title" label="Title" autoFocus />
              <MySelect
                name="category"
                type="text"
                label="Category"
                selectValues={CATEGORIES}
              />
              <MyTextField
                name="description"
                type="text"
                label="Description"
                multiline
                rows={5}
              />
              <MyTextField
                name="price"
                type="number"
                label="Price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <MySelect
                name="condition"
                type="text"
                label="Condition"
                selectValues={CONDITIONS}
              />
              <MyTextField name="phone" type="tel" label="Phone" />
              <MyTextField name="city" type="text" label="City" />
              <MyUploadField name="urls" />
              <Button
                color="primary"
                size="large"
                variant="contained"
                type="submit"
                fullWidth
                className={classes.submit}
                disabled={isSubmitting}
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default NewPosting;
