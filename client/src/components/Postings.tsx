import React, { useEffect, useState } from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import GridList from "@material-ui/core/GridList";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS } from "../graphql/queries";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";

const useStyles = makeStyles(() =>
  createStyles({
    gridList: {
      width: 500,
      height: "auto",
      transform: "translateZ(0)",
    },
    launch: {
      color: "deepskyblue",
    },
  })
);

function Postings({ postings }: any) {
  const classes = useStyles();
  const client = useApolloClient();
  const [followedPostingsIds, setFollowedPostingsIds] = useState<string[]>([]);

  const { data } = useQuery(GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data?.currentUserFollowedPostings) {
      const ids = data.currentUserFollowedPostings.map(
        (posting: any) => posting.id
      );
      setFollowedPostingsIds(ids);
    }
  }, [data]);

  return (
    <GridList cellHeight={200} className={classes.gridList}>
      {postings.map((posting: any) => (
        <GridListTile key={posting.id} cols={1} rows={1}>
          <img src={posting.imageUrls[0] || ""} alt={posting.title} />
          <GridListTileBar
            title={`$${posting.price}`}
            subtitle={<span>{posting.title}</span>}
            actionIcon={
              <div>
                <IconButton
                  className={classes.launch}
                  aria-label={`open the posting: ${posting.title}`}
                  component={Link}
                  to={`/posting/${posting.id}`}
                >
                  <LaunchIcon />
                </IconButton>
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
  );
}

export default Postings;
