import React, { useState } from 'react';
import { useField } from '../hooks/index';
import Select, { ValueType } from 'react-select';
import { useMutation } from '@apollo/client';
import { ADD_POSTING, GET_POSTINGS } from '../graphql/queries';
import { useHistory } from 'react-router-dom';

// interface Category {
//   value: string;
//   label: string;
// }

interface Props {
  setNeedToRefetch: Function;
}

type Category = { label: string; value: string };

export const NewPosting: React.FC<Props> = ({ setNeedToRefetch }) => {
  const history = useHistory();

  const title = useField('text');
  const description = useField('text');
  const price = useField('number');
  const phone = useField('tel');
  const [category, setCategory] = useState<Category | { value: ''; label: '' }>(
    { value: '', label: '' }
  );

  const [addPosting] = useMutation(ADD_POSTING);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(category.value);

    addPosting({
      variables: {
        title: title.value,
        description: description.value,
        price: Number(price.value),
        phone: Number(phone.value),
        category: category.value,
      },
    });

    setNeedToRefetch(true);

    history.push('/');
  };

  const categories: Category[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'health and beauty', label: 'Health & Beauty' },
    { value: 'motors', label: 'Motors' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input name="title" {...title} />
      </div>
      <div>
        <label>Category: </label>
        <Select
          onChange={(selected: any) => setCategory(selected)}
          options={categories}
        />
      </div>
      <div>
        <label>Description: </label>
        <input name="description" {...description} />
      </div>
      <div>
        <label>Price: </label>
        <input name="price" {...price} />
      </div>
      <div>
        <label>Phone number: </label>
        <input name="phone" {...phone} />
      </div>
      <div>
        <button type="submit">Add new posting</button>
      </div>
    </form>
  );
};
