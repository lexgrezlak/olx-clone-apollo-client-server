import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Chip, Container } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_POSTING_BY_ID } from "../graphql/queries";
import FollowButton from "../components/FollowButton";
import UnfollowButton from "../components/UnfollowButton";
import PhonePopover from "../components/PhonePopover";
import MessageDialog from "../components/MessageDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconActions: {
      display: "flex",
      flexDirection: "row",
    },
    chips: {
      display: "flex",
      "& > *": {
        marginRight: theme.spacing(1),
      },
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

  return (
    <Container component="main" maxWidth="sm">
      <Card className={classes.root}>
        <div className={classes.header}>
          <CardHeader title={posting.title} subheader={`$${posting.price}`} />
          <div className={classes.chips}>
            <Chip label={posting.condition} color="primary" />
            <Chip label={posting.city} />
            <Chip label={posting.category} />
          </div>
        </div>
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
        <CardActions disableSpacing className={classes.actions}>
          <div className={classes.iconActions}>
            {followedPostingsIds.includes(id) ? (
              <UnfollowButton postingId={id} postingTitle={posting.title} />
            ) : (
              <FollowButton postingId={id} postingTitle={posting.title} />
            )}
            <PhonePopover phone={posting.phone} />
          </div>
          <MessageDialog title={posting.title} id={posting.id} />
        </CardActions>
      </Card>
    </Container>
  );
}
