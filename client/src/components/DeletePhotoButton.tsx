import React from "react";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() =>
  createStyles({
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

function DeletePhotoButton({ setUrls, urls, deletedUrl }: any) {
  const classes = useStyles();
  return (
    <IconButton
      onClick={() => setUrls(urls.filter((url: string) => url !== deletedUrl))}
      aria-label="delete button"
      className={classes.icon}
    >
      <DeleteIcon />
    </IconButton>
  );
}

export default DeletePhotoButton;
