import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  IconButton,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Star } from "@material-ui/icons";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";
import {
  FOLLOW_POSTING,
  GET_CURRENT_USER_FOLLOWED_POSTINGS,
} from "../graphql/queries";
import LastUpdated from "../components/LastUpdated";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    icon: {
      color: "gold",
    },
    launch: {
      color: "deepskyblue",
    },
  })
);

export default function Followed() {
  const classes = useStyles();
  const client = useApolloClient();
  const { data, loading } = useQuery(GET_CURRENT_USER_FOLLOWED_POSTINGS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [unfollowPosting] = useMutation(FOLLOW_POSTING, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  async function handleUnfollow(id: string) {
    await unfollowPosting({ variables: { id } });
    client.resetStore();
  }

  const followedPostings = data.currentUserFollowedPostings;

  return (
    <div>
      <Typography component="h4" variant="h4">
        Your followed postings
      </Typography>
      <div>
        {followedPostings.map((posting: any) => (
          <Card key={posting.id} className={classes.root}>
            <CardMedia
              className={classes.cover}
              title={posting.title}
              image={posting.imageUrls[0]}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="h5" component="h5">
                  {posting.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  ${posting.price}
                </Typography>
                <LastUpdated updatedAt={posting.updatedAt} />
              </CardContent>
              <div className={classes.controls}>
                <IconButton
                  aria-label={`open the posting: ${posting.title}`}
                  className={classes.launch}
                  component={Link}
                  to={`/posting/${posting.id}`}
                >
                  <LaunchIcon />
                </IconButton>
                <IconButton
                  aria-label={`follow the posting: ${posting.title}`}
                  className={classes.icon}
                  onClick={() => handleUnfollow(posting.id)}
                >
                  <Star />
                </IconButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
