import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { MULTIPLE_UPLOAD } from '../graphql/queries';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },

    input: {
      display: 'none',
    },
  })
);

type Props = { urls: string[]; setUrls: Function };

export default function UploadPhotos({ urls, setUrls }: Props) {
  const [uploadPhoto, { data, loading, error }] = useMutation(MULTIPLE_UPLOAD);
  const classes = useStyles();

  function onChange({ target: { validity, files } }: any) {
    return validity.valid && uploadPhoto({ variables: { files } });
  }

  useEffect(() => {
    if (data)
      setUrls(urls.concat(data.multipleUpload.map((file: any) => file.url)));
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          component="span"
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<PhotoCamera />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
}
