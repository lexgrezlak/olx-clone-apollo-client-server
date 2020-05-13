import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useField } from "../hooks";
import { GET_POSTINGS_BY_TITLE } from "../graphql/queries";
import Search from "../components/Search";
import Postings from "../components/Postings";

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

export default function Home({ followedPostingsIds }: any) {
  const filter = useField("search");
  const classes = useStyles();
  const [cursor, setCursor] = useState();
  const [postings, setPostings] = useState([]);
  const { data, fetchMore } = useQuery(GET_POSTINGS_BY_TITLE, {
    variables: { title: filter.value },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data?.postingsByTitle) {
      const { postingsByTitle } = data;
      setPostings(postingsByTitle.edges);
      setCursor(postingsByTitle.pageInfo.endCursor);
    }
  }, [data]);

  return (
    <div className={classes.root}>
      <Search filter={filter} />
      <Postings
        postings={postings}
        followedPostingsIds={followedPostingsIds}
        fetchMore={fetchMore}
        title={filter.value}
        cursor={cursor}
      />
    </div>
  );
}
