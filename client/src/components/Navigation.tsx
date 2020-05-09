import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TuneIcon from "@material-ui/icons/Tune";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from "@material-ui/icons/Email";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
    },
  })
);

export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="filters"
            component={Link}
            to="/filters"
          >
            <TuneIcon fontSize="large" />
          </IconButton>

          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            Clolx
          </Typography>

          <IconButton
            aria-label="creation of new postings"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={Link}
            to="/newposting"
          >
            <AddIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="my dashboard"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={Link}
            to="/account"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="my messages"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={Link}
            to="/account/messages"
          >
            <EmailIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="my followed postings"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component={Link}
            to="/account/followed"
          >
            <StarIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
