import React, { useEffect, useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
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
import { EDIT_POSTING, GET_POSTING_BY_ID } from "../graphql/queries";
import MyTextField from "../components/MyTextField";
import MySelect from "../components/MySelect";
import MyUploadField from "../components/MyUploadField";
import { NewPostingFormFields, postingValidationSchema } from "./NewPosting";

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
      marginTop: "16px",
      marginBottom: "8px",
    },
  })
);

function EditPosting({ id }: any) {
  const { data, loading, error } = useQuery(GET_POSTING_BY_ID, {
    variables: { id },
  });

  const history = useHistory();
  const client = useApolloClient();
  const classes = useStyles();
  const [editPosting] = useMutation(EDIT_POSTING);
  const [initialValues, setInitialValues] = useState<NewPostingFormFields>({
    title: "",
    category: "",
    description: "",
    price: "",
    condition: "",
    phone: "",
    city: "",
    urls: [],
  });

  useEffect(() => {
    if (data?.postingById) {
      const {
        postingById: {
          title,
          category,
          description,
          price,
          condition,
          phone,
          city,
          imageUrls: urls,
        },
      } = data;

      setInitialValues({
        title,
        category,
        description,
        price,
        condition,
        phone,
        city,
        urls,
      });
    }
  }, [data]);

  if (loading) return null;
  if (error) return <div>Something went wrong...</div>;
  const CATEGORIES = ["Fashion", "Electronics", "Health"];
  const CONDITIONS = ["New", "Used"];

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
    const editedPosting = await editPosting({
      variables: {
        id,
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
    history.push(`/posting/${editedPosting.data.editPosting.id}`);
  }

  console.log(initialValues);

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
          enableReinitialize
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

export default EditPosting;
