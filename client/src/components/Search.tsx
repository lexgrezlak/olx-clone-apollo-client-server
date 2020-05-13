import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import RedditTextField from "./RedditTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(0.05),
      marginBottom: theme.spacing(1),
    },
  })
);

interface SearchProps {
  filter: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
  };
}

function Search({ filter }: SearchProps) {
  const classes = useStyles();

  return (
    <RedditTextField
      label="Search for anything"
      variant="filled"
      id="reddit-input"
      fullWidth
      className={classes.margin}
      {...filter}
    />
  );
}

export default Search;
