import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER_ID,
  GET_CURRENT_USER_MESSAGES,
} from "../graphql/queries";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
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
    <List className={classes.root}>
      {messages.map((message: any) => (
        <div key={message.posting.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={message.posting.title}
                src={message.posting.imageUrls[0]}
              />
            </ListItemAvatar>
            <ListItemText
              primary={message.posting.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {message.fromUser === userId ? "you sent" : "you received"}
                  </Typography>
                  <Typography>{message.content}</Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}

export default Messages;
