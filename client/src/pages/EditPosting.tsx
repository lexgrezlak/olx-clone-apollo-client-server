import React, { useEffect, useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createStyles,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { EDIT_POSTING, GET_POSTING_BY_ID } from "../graphql/queries";
import UploadPhotos from "../components/UploadPhotos";
import UploadedPhotos from "../components/UploadedPhotos";

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
      // margin: theme.spacing(3, 0, 2),
      marginTop: "16px",
      marginBottom: "8px",
    },
  })
);

function EditPosting({ id }: any) {
  const { data, loading } = useQuery(GET_POSTING_BY_ID, {
    variables: { id },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const history = useHistory();
  const client = useApolloClient();
  const classes = useStyles();
  const [editPosting] = useMutation(EDIT_POSTING);

  useEffect(() => {
    if (data?.postingById) {
      const { postingById: posting } = data;
      setTitle(posting.title);
      setCategory(posting.category);
      setDescription(posting.description);
      setPrice(posting.price);
      setCondition(posting.condition);
      setPhone(posting.phone);
      setCity(posting.city);
      setImageUrls(posting.imageUrls);
    }
  }, [data]);

  if (loading) return null;
  const CATEGORIES = ["Fashion", "Electronics", "Health"];
  const CONDITIONS = ["New", "Used"];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

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
        phone: +phone,
      },
    });
    await client.resetStore();
    history.push(`/posting/${editedPosting.data.editPosting.id}`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add new posting
        </Typography>
        <form noValidate onSubmit={handleSubmit} className={classes.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            label="Title"
            value={title}
            onChange={({ target: { value } }: any) => setTitle(value)}
            type="text"
          />
          <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel id="category-label" required>
              Category
            </InputLabel>
            {
              // @ts-ignore
              <Select
                labelId="category-label"
                id="category"
                value={category}
                type="radio"
                onChange={({ target: { value } }: any) => setCategory(value)}
              >
                {CATEGORIES.map((CATEGORY: string) => (
                  <MenuItem key={CATEGORY} value={CATEGORY}>
                    {CATEGORY}
                  </MenuItem>
                ))}
              </Select>
            }
          </FormControl>
          <TextField
            margin="normal"
            rows={4}
            multiline
            fullWidth
            variant="outlined"
            label="Description"
            type="text"
            value={description}
            onChange={({ target: { value } }: any) => setDescription(value)}
          />
          <TextField
            fullWidth
            margin="normal"
            required
            variant="outlined"
            label="Price"
            type="number"
            value={price}
            onChange={({ target: { value } }: any) => setPrice(value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <FormControl margin="normal" fullWidth variant="outlined" required>
            <InputLabel id="category-label">Condition</InputLabel>
            {
              // @ts-ignore
              <Select
                labelId="condition-label"
                id="condition"
                value={condition}
                type="radio"
                onChange={({ target: { value } }: any) => setCondition(value)}
              >
                {CONDITIONS.map((thisCondition) => (
                  <MenuItem key={thisCondition} value={thisCondition}>
                    {thisCondition}
                  </MenuItem>
                ))}
              </Select>
            }
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            label="Phone"
            type="number"
            value={phone}
            onChange={({ target: { value } }: any) => setPhone(value)}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            label="City"
            type="text"
            value={city}
            onChange={({ target: { value } }: any) => setCity(value)}
          />
          <UploadPhotos urls={imageUrls} setUrls={setImageUrls} />
          <UploadedPhotos urls={imageUrls} setUrls={setImageUrls} />
          <Button
            color="primary"
            size="large"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default EditPosting;
