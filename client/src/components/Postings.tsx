import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress } from "@material-ui/core";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import LaunchButton from "./LaunchButton";
import { GET_POSTINGS_BY_TITLE } from "../graphql/queries";

const useStyles = makeStyles(() =>
  createStyles({
    gridList: {
      width: 500,
      height: "auto",
      transform: "translateZ(0)",
    },
    action: {
      display: "flex",
    },
  })
);

function Postings({ followedPostingsIds, title }: any) {
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

  const loadMore = async () => {
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
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasNextPage}
      loader={<div>Loading...</div>}
    >
      <GridList cellHeight={200} className={classes.gridList}>
        {postings.map((posting: any) => (
          <GridListTile key={posting.id} cols={1} rows={1}>
            <img src={posting.imageUrls[0] || ""} alt={posting.title} />
            <GridListTileBar
              title={`$${posting.price}`}
              subtitle={<span>{posting.title}</span>}
              actionIcon={
                <div className={classes.action}>
                  <LaunchButton id={posting.id} />
                  {followedPostingsIds.includes(posting.id) ? (
                    <UnfollowButton
                      postingTitle={posting.title}
                      postingId={posting.id}
                    />
                  ) : (
                    <FollowButton
                      postingTitle={posting.title}
                      postingId={posting.id}
                    />
                  )}
                </div>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </InfiniteScroll>
  );
}

export default Postings;
