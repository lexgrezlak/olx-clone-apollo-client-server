import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  createStyles,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_FOLLOWED_POSTINGS } from "../graphql/queries";
import LastUpdated from "../components/postingInfo/LastUpdated";
import UnfollowButton from "../components/postingInfo/UnfollowButton";
import LaunchButton from "../components/postingInfo/LaunchButton";
import EmptyPostingsMessage from "../components/EmptyPostingsMessage";

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
    launch: {
      color: "deepskyblue",
    },
  })
);

export default function Followed() {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_CURRENT_USER_FOLLOWED_POSTINGS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  const followedPostings = data.currentUserFollowedPostings;

  if (followedPostings.length === 0)
    return <EmptyPostingsMessage message={"You don't follow any postings"} />;

  return (
    <Container maxWidth="md" component="main">
      <Typography component="h5" variant="h5">
        Your followed postings
      </Typography>
      <div>
        {followedPostings &&
          followedPostings.map((posting: any) => (
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
                  <LaunchButton id={posting.id} />
                  <UnfollowButton
                    postingTitle={posting.title}
                    postingId={posting.id}
                  />
                </div>
              </div>
            </Card>
          ))}
      </div>
    </Container>
  );
}
