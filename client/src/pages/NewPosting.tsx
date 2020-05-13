import React, { useState } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useApolloClient, useMutation } from "@apollo/client";
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
import { ADD_POSTING } from "../graphql/queries";
import { useField } from "../hooks";
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
      margin: theme.spacing(3, 0, 2),
    },
  })
);

function NewPosting() {
  const title = useField("text");
  const description = useField("text");
  const price = useField("number");
  const phone = useField("tel");
  const city = useField("text");
  const [urls, setUrls] = useState<string[]>([]);
  const category = useField("radio");
  const [addPosting] = useMutation(ADD_POSTING, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const condition = useField("radio");
  const history = useHistory();
  const client = useApolloClient();
  const classes = useStyles();

  const CATEGORIES = ["Fashion", "Electronics", "Health"];
  const CONDITIONS = ["New", "Used"];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await addPosting({
      variables: {
        title: title.value,
        category: category.value,
        description: description.value,
        imageUrls: urls,
        price: +price.value,
        condition: condition.value,
        city: city.value,
        phone: phone.value,
      },
    });

    await client.resetStore();
    history.push(`/posting/${response.data.addPosting.id}`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add new posting
        </Typography>
        <form onSubmit={handleSubmit} noValidate className={classes.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            label="Title"
            {...title}
          />
          <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel id="category-label" required>
              Category
            </InputLabel>
            {
              // @ts-ignore
              <Select labelId="category-label" id="category" {...category}>
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
            rows={5}
            multiline
            fullWidth
            variant="outlined"
            label="Description"
            {...description}
          />
          <TextField
            fullWidth
            margin="normal"
            required
            variant="outlined"
            label="Price"
            {...price}
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
              <Select labelId="condition-label" id="condition" {...condition}>
                {CONDITIONS.map((CONDITION) => (
                  <MenuItem key={CONDITION} value={CONDITION}>
                    {CONDITION}
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
            {...phone}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            label="City"
            {...city}
          />
          <UploadPhotos urls={urls} setUrls={setUrls} />
          <UploadedPhotos urls={urls} setUrls={setUrls} />
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

export default NewPosting;
