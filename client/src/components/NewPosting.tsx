import React, { useState } from "react";
import { useField } from "../hooks/index";
import { useMutation } from "@apollo/client";
import { ADD_POSTING } from "../graphql/queries";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import UploadPhotos from "./UploadPhotos";
import UploadedPhotos from "./UploadedPhotos";
import InputAdornment from "@material-ui/core/InputAdornment";

interface Props {
  setNeedToRefetch: Function;
  isLoggedIn: boolean;
}

const NewPosting: React.FC<Props> = ({ setNeedToRefetch, isLoggedIn }) => {
  const title = useField("text");
  const description = useField("text");
  const price = useField("number");
  const phone = useField("tel");
  const city = useField("text");
  const [urls, setUrls] = useState<string[]>([]);
  const category = useField("radio");
  const [addPosting] = useMutation(ADD_POSTING);
  const condition = useField("radio");
  const history = useHistory();

  if (!isLoggedIn) {
    return <Redirect push to="/login" />;
  }

  const categories = ["Fashion", "Electronics", "Health"];
  const conditions = ["New", "Used"];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addPosting({
      variables: {
        title: title.value,
        category: category.value,
        description: description.value,
        imageUrls: urls,
        price: +price.value,
        condition: condition.value,
        city: city.value,
        phone: +phone.value,
      },
    });

    setNeedToRefetch(true);

    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" style={{ margin: "20px" }}>
        Add new posting
      </Typography>
      <TextField fullWidth variant="outlined" label="Title" {...title} />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-label">Category</InputLabel>
        {
          // @ts-ignore
          <Select labelId="category-label" id="category" {...category}>
            {categories.map((thisCategory) => (
              <MenuItem key={thisCategory} value={thisCategory}>
                {thisCategory}
              </MenuItem>
            ))}
          </Select>
        }
      </FormControl>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        label="Description"
        {...description}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Price"
        {...price}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-label">Condition</InputLabel>
        {
          // @ts-ignore
          <Select labelId="condition-label" id="condition" {...condition}>
            {conditions.map((thisCondition) => (
              <MenuItem key={thisCondition} value={thisCondition}>
                {thisCondition}
              </MenuItem>
            ))}
          </Select>
        }
      </FormControl>
      <TextField fullWidth variant="outlined" label="Phone" {...phone} />
      <TextField fullWidth variant="outlined" label="City" {...city} />
      <UploadPhotos urls={urls} setUrls={setUrls} />
      <UploadedPhotos urls={urls} setUrls={setUrls} />
      <Button color="primary" size="large" variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
};

export default NewPosting;
