import React, { useEffect } from "react";
import { useField } from "formik";
import Button from "@material-ui/core/Button";
import { PhotoCamera } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { MULTIPLE_UPLOAD } from "../../graphql/queries";
import UploadedPhotos from "./UploadedPhotos";

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: "none",
    },
    button: {
      marginTop: "16px",
      marginBottom: "8px",
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: "16px",
      marginBottom: "8px",
    },
    gridList: {
      width: 500,
      height: "auto",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
    },
  })
);

interface Props {
  name: string;
}

function MyUploadField({ name }: Props) {
  const classes = useStyles();
  const [uploadPhotos, { data, loading, error }] = useMutation(MULTIPLE_UPLOAD);
  const [
    field,
    { error: formikError, touched, value: urls },
    { setValue: setUrls, setTouched },
  ] = useField({
    name,
    type: "file",
  });

  useEffect(() => {
    if (data) {
      const newUrls = data.multipleUpload.map((file: any) => file.url);
      const uniqueUrls = newUrls.filter((url: string) => !urls.includes(url));
      setUrls(urls.concat(uniqueUrls));
      setTouched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onChange({ target: { validity, files } }: any) {
    return validity.valid && uploadPhotos({ variables: { files } });
  }

  if (error) return <div>Something went wrong...</div>;

  const isError = formikError && touched;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={onChange}
            name={field.name}
          />
          <label htmlFor="contained-button-file">
            <Button
              className={classes.button}
              fullWidth
              component="span"
              variant="contained"
              color="default"
              startIcon={<PhotoCamera />}
            >
              Upload
            </Button>
          </label>
        </div>
      )}
      {isError && <div>{formikError}</div>}
      <UploadedPhotos urls={urls} setUrls={setUrls} />
    </div>
  );
}

export default MyUploadField;
