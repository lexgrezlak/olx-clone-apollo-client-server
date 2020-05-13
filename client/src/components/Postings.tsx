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

function Postings({
  postings,
  followedPostingsIds,
  fetchMore,
  title,
  cursor,
}: any) {
  const classes = useStyles();

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
          {i === postings.length - 1 && (
            <Waypoint
              onEnter={() =>
                fetchMore({
                  query: GET_POSTINGS_BY_TITLE,
                  variables: { cursor, title },
                  updateQuery: (
                    previousResult: any,
                    { fetchMoreResult }: any
                  ) => {
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
