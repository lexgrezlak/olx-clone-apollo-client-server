import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress, Container, Grid } from "@material-ui/core";
import { GET_POSTINGS_BY_TITLE } from "../../graphql/queries";
import Posting from "./Posting";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(2),
    },
  })
);

interface PostingsProps {
  followedPostingsIds: string[];
  title: string;
}

function Postings({ followedPostingsIds, title }: PostingsProps) {
  const classes = useStyles();
  const { data, loading, fetchMore } = useQuery(GET_POSTINGS_BY_TITLE, {
    variables: { title },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return <CircularProgress />;

  const {
    edges: postings,
    pageInfo: { endCursor: cursor, hasNextPage },
  } = data.postingsByTitle;

  async function loadMore() {
    await fetchMore({
      query: GET_POSTINGS_BY_TITLE,
      variables: { cursor, title },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return previousResult;
        const previousEdges = previousResult.postingsByTitle.edges;
        const newEdges = fetchMoreResult.postingsByTitle.edges;
        const newPageInfo = fetchMoreResult.postingsByTitle.pageInfo;
        return {
          postingsByTitle: {
            // eslint-disable-next-line no-underscore-dangle
            __typename: previousResult.postingsByTitle.__typename,
            edges: [...previousEdges, ...newEdges],
            pageInfo: newPageInfo,
          },
        };
      },
    });
  }

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasNextPage}
          loader={<div key={postings.length}>Loading...</div>}
        >
          <Grid container justify="center" spacing={2}>
            {postings.map((posting: any) => (
              <Posting
                key={posting.id}
                posting={posting}
                isFollowed={followedPostingsIds.includes(posting.id)}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </Container>
  );
}

export default Postings;
