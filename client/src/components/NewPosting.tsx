import React, { useState } from 'react';
import { useField } from '../hooks/index';
import { useMutation } from '@apollo/client';
import { ADD_POSTING } from '../graphql/queries';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

interface Props {
  setNeedToRefetch: Function;
}

const NewPosting: React.FC<Props> = ({ setNeedToRefetch }) => {
  const history = useHistory();

  const title = useField('text');
  const description = useField('text');
  const price = useField('number');
  const phone = useField('tel');
  const [category, setCategory] = useState<string | unknown>('');

  const [addPosting] = useMutation(ADD_POSTING);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(category);

    addPosting({
      variables: {
        title: title.value,
        description: description.value,
        price: Number(price.value),
        phone: Number(phone.value),
        category: category,
      },
    });

    setNeedToRefetch(true);

    history.push('/');
  };

  const categories = ['Fashion', 'Electronics', 'Health'];
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" style={{ margin: '20px' }}>
        Add new posting
      </Typography>
      <TextField fullWidth variant="outlined" label="Title" {...title} />
      {/* <Select
        onChange={(selected: any) => setCategory(selected)}
        options={categories}
        placeholder="Category"
        styles={customStyles}
      /> */}
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        variant="outlined"
        label="Description"
        {...description}
      />
      <TextField fullWidth variant="outlined" label="Price" {...price} />
      <TextField fullWidth variant="outlined" label="Phone" {...phone} />

      <Button color="primary" size="large" variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
};

export default NewPosting;
