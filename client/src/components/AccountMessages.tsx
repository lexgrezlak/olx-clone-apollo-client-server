import React, { useState, useEffect } from 'react';
import { User } from '../common/types';
import { Redirect } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

interface Props {
  user: User | null;
}

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

const AccountMessages: React.FC<Props> = ({ user }) => {
  const [uploadPhoto, { data, loading, error }] = useMutation(SINGLE_UPLOAD);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (data) setPhotoUrl(data.singleUpload.url);
  });

  if (user === null) {
    return <Redirect push to="/login" />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => validity.valid && uploadPhoto({ variables: { file } });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
      {photoUrl && (
        <div>
          {' '}
          Last uploaded details => {photoUrl} <img alt="gir" src={photoUrl} />
        </div>
      )}
    </React.Fragment>
  );
};

export default AccountMessages;
