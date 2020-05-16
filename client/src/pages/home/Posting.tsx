import React from "react";
import { Card, CardHeader, CardMedia, Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import UnfollowButton from "../../components/postingInfo/UnfollowButton";
import FollowButton from "../../components/postingInfo/FollowButton";
import LaunchButton from "../../components/postingInfo/LaunchButton";

const useStyles = makeStyles(() =>
  createStyles({
    action: {
      display: "flex",
    },
    media: {
      height: 322,
      width: 322,
    },
    card: { maxWidth: 322 },
    header: { maxWidth: 322, display: "flex" },
    item: {
      display: "flex",
      justifyContent: "center",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

interface Props {
  isFollowed: boolean;
  posting: {
    id: string;
    title: string;
    imageUrls: string[];
    price: number;
  };
}

function Posting({ posting, isFollowed }: Props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} className={classes.item}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={posting.imageUrls[0]}
          title={posting.title}
        />
        <div className={classes.bottom}>
          <div className={classes.header}>
            <CardHeader title={`$${posting.price}`} subheader={posting.title} />
          </div>
          <div className={classes.action}>
            <LaunchButton id={posting.id} />
            {isFollowed ? (
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
        </div>
      </Card>
    </Grid>
  );
}

export default Posting;
