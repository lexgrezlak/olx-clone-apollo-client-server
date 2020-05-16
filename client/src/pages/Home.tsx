import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useField } from "../hooks";
import Search from "./home/Search";
import Postings from "./home/Postings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface HomeProps {
  followedPostingsIds: string[];
}

function Home({ followedPostingsIds }: HomeProps) {
  const filter = useField("search");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Search filter={filter} />
      <Postings
        followedPostingsIds={followedPostingsIds}
        title={filter.value}
      />
    </div>
  );
}

export default Home;
