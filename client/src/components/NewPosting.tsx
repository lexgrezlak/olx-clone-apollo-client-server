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
import { User } from '../common/types';
import { Redirect } from 'react-router-dom';
import UploadPhotos from './UploadPhotos';
import UploadedPhotos from './UploadedPhotos';

interface Props {
  setNeedToRefetch: Function;
  user: User | null;
}

const NewPosting: React.FC<Props> = ({ setNeedToRefetch, user }) => {
  const history = useHistory();

  const title = useField('text');
  const description = useField('text');
  const price = useField('number');
  const phone = useField('tel');
  const [urls, setUrls] = useState<string[]>([]);
  const [category, setCategory] = useState<string | unknown>('');
  const [addPosting] = useMutation(ADD_POSTING);

  if (user === null) {
    return <Redirect push to="/login" />;
  }

  const categories = ['Fashion', 'Electronics', 'Health'];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addPosting({
      variables: {
        title: title.value,
        description: description.value,
        price: +price.value,
        phone: +phone.value,
        category: category,
        imageUrls: urls,
      },
    });

    setNeedToRefetch(true);

    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" style={{ margin: '20px' }}>
        Add new posting
      </Typography>
      <TextField fullWidth variant="outlined" label="Title" {...title} />
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
        multiline
        fullWidth
        variant="outlined"
        label="Description"
        {...description}
      />
      <TextField fullWidth variant="outlined" label="Price" {...price} />
      <TextField fullWidth variant="outlined" label="Phone" {...phone} />
      <UploadPhotos urls={urls} setUrls={setUrls} />
      <UploadedPhotos urls={urls} setUrls={setUrls} />
      <Button color="primary" size="large" variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
};

export default NewPosting;
