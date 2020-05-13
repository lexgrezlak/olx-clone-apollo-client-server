import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridList from "@material-ui/core/GridList";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Waypoint } from "react-waypoint";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import LaunchButton from "./LaunchButton";
import { GET_POSTINGS_BY_TITLE } from "../graphql/queries";
import { useQuery } from "@apollo/client";

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

  if (loading) return null;

  const {
    edges: postings,
    pageInfo: { endCursor: cursor, hasNextPage },
  } = data.postingsByTitle;

  return (
    <GridList cellHeight={200} className={classes.gridList}>
      {postings.map((posting: any, i: number) => (
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
          {hasNextPage && i === postings.length - 1 && (
            <Waypoint
              onEnter={() =>
                fetchMore({
                  query: GET_POSTINGS_BY_TITLE,
                  variables: { cursor, title },
                  updateQuery: (
                    previousResult: any,
                    { fetchMoreResult }: any
                  ) => {
                    console.log(fetchMoreResult);
                    if (!fetchMoreResult) return previousResult;
                    console.log(previousResult);
                    console.log(fetchMoreResult);
                    const previousEdges = previousResult.postingsByTitle.edges;
                    const newEdges = fetchMoreResult.postingsByTitle.edges;
                    const newPageInfo =
                      fetchMoreResult.postingsByTitle.pageInfo;
                    return {
                      postingsByTitle: {
                        // eslint-disable-next-line no-underscore-dangle
                        __typename: previousResult.postingsByTitle.__typename,
                        edges: [...previousEdges, ...newEdges],
                        pageInfo: newPageInfo,
                      },
                    };
                  },
                })
              }
            />
          )}
        </GridListTile>
      ))}
    </GridList>
  );
}

export default Postings;
