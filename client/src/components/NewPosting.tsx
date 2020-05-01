import React from 'react';
import { useField } from '../hooks/index';
import Select from 'react-select';

export const NewPosting: React.FC<{}> = () => {
  const title = useField('text');
  const description = useField('text');
  const price = useField('number');
  const phone = useField('tel');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('form sent');
  };

  const categories = [
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
        <Select options={categories} />
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
