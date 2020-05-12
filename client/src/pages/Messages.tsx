import React from "react";
import { useQuery } from "@apollo/client";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";
import {
  GET_CURRENT_USER_ID,
  GET_CURRENT_USER_MESSAGES,
} from "../graphql/queries";
import MessageDialog from "../components/MessageDialog";
import LaunchButton from "../components/LaunchButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    misc: {
      display: "flex",
      justifyContent: "space-between",
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  })
);

function Messages() {
  const { data, loading } = useQuery(GET_CURRENT_USER_MESSAGES, {
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: userIdData, loading: userIdLoading } = useQuery(
    GET_CURRENT_USER_ID,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const classes = useStyles();

  if (loading || userIdLoading) return null;

  const messages = data.currentUserMessages;
  const userId = userIdData.currentUser.id;

  return (
    <div className={classes.root}>
      {messages.map((message: any) => (
        <Paper key={message.id} className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                alt={message.posting.title}
                src={message.posting.imageUrls[0]}
              />
            </Grid>
            <Grid item xs>
              <div className={classes.misc}>
                <Typography variant="h6" noWrap>
                  {message.posting.title}
                </Typography>
                <Typography variant="subtitle2">
                  {userId === message.fromUser ? "sent" : "received"}
                </Typography>
              </div>
              <Typography variant="body2" gutterBottom>
                {message.content}
              </Typography>
              <div className={classes.actions}>
                <LaunchButton />
                <MessageDialog
                  id={message.posting.id}
                  title={message.posting.title}
                  text="Reply"
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}

export default Messages;
