import React, { useState } from 'react';
import { useField } from '../hooks/index';

interface FormValues {
  title: string;
  category: string | null;
  description: string;
  price: number | null;
}

interface Errors {
  title?: string;
  category?: string;
  description?: string;
  price?: string;
}

export const NewPosting: React.FC<{}> = () => {
  const title = useField('string');
  const category = useField('number');
  const description = useField('string');
  const price = useState('number');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('form sent');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input name="title" {...title} />
      </div>
      <div>
        <label>Category: </label>
        <input name="title" {...title} />
      </div>
      <div>
        <label>Description: </label>
        <input name="title" {...title} />
      </div>
      <div>
        <label>Price: </label>
        <input name="title" {...title} />
      </div>
      <div>
        <button type="submit">Add new posting</button>
      </div>
    </form>
  );
};
