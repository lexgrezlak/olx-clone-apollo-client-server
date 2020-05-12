import React from "react";
import { Card, CardContent, CardMedia, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DeletePostingButton from "./DeletePostingButton";
import LastUpdated from "./LastUpdated";
import EditPostingButton from "./EditPostingButton";

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
      marginRight: theme.spacing(1),
    },
    icon: {
      height: 30,
      width: 30,
    },
    rest: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  })
);

function OwnPosting({ posting }: any) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
        </CardContent>
        <div className={classes.rest}>
          <div className={classes.controls}>
            <EditPostingButton id={posting.id} css={classes.icon} />
            <DeletePostingButton postingId={posting.id} css={classes.icon} />
          </div>
          <div>
            <LastUpdated updatedAt={posting.updatedAt} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OwnPosting;
