import React from "react";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  })
);

interface Props {
  message: string;
}

function EmptyPostingsMessage({ message }: Props) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">{message}</Typography>
    </Paper>
  );
}

export default EmptyPostingsMessage;
