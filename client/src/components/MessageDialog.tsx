import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { GET_CURRENT_USER_MESSAGES, SEND_MESSAGE } from "../graphql/queries";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    message: {
      minWidth: 250,
    },
  })
);

export default function MessageDialog({ title, id, text }: any) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    // refetchQueries: [{ query: GET_CURRENT_USER_MESSAGES }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({
        query: GET_CURRENT_USER_MESSAGES,
      }) as any;
      console.log(dataInStore);
      store.writeQuery({
        query: GET_CURRENT_USER_MESSAGES,
        data: {
          ...dataInStore,
          currentUserMessages: [
            response.data.sendMessage,
            ...dataInStore.currentUserMessages,
          ],
        },
      });
    },
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSend() {
    await sendMessage({
      variables: {
        postingId: id,
        content,
      },
    });
    setContent("");
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {text || "Send Message"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.message}
            rows={5}
            autoFocus
            multiline
            fullWidth
            // margin="dense"
            variant="outlined"
            label="Message"
            type="text"
            value={content}
            onChange={({ target: { value } }) => setContent(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend} color="primary" autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
