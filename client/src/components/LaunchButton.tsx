import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    launch: {
      color: "deepskyblue",
    },
  })
);

function LaunchButton({ id }: any) {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.launch}
      aria-label="open the posting"
      component={Link}
      to={`/posting/${id}`}
    >
      <LaunchIcon fontSize="large" />
    </IconButton>
  );
}

export default LaunchButton;
