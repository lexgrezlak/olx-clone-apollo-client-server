// import React from "react";
// import { useQuery } from "@apollo/client";
// import { GET_POSTING_BY_ID } from "../graphql/queries";
//
// export default function FullPosting({ id }: any) {
//   const { data, loading, error } = useQuery(GET_POSTING_BY_ID, {
//     variables: { id },
//   });
//
//   if (loading) return null;
//   if (error) return <div>This posting doesn&apos;t exist</div>;
//
//   const { postingById: posting } = data;
//
//   return <div>posting {posting.title}</div>;
// }

import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Container } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_POSTING_BY_ID } from "../graphql/queries";
import FollowButton from "../components/FollowButton";
import UnfollowButton from "../components/UnfollowButton";
import PhonePopover from "../components/PhonePopover";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export default function FullPosting({ id, followedPostingsIds }: any) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_POSTING_BY_ID, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return <div>This posting doesn&apos;t exist</div>;
  const { postingById: posting } = data;

  console.log(posting);

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.root}>
        <CardHeader title={posting.title} subheader={`$${posting.price}`} />
        {posting.imageUrls.map((url: string) => (
          <CardMedia
            key={url}
            className={classes.media}
            image={url}
            title={posting.title}
          />
        ))}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {posting.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {followedPostingsIds.includes(id) ? (
            <UnfollowButton postingId={id} postingTitle={posting.title} />
          ) : (
            <FollowButton postingId={id} postingTitle={posting.title} />
          )}
          <PhonePopover phone={posting.phone} />
        </CardActions>
      </Card>
    </Container>
  );
}
