import React from "react";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import SignOutButton from "../components/SignOutButton";
import OwnPostings from "../components/OwnPostings";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  const user = data.currentUser;

  const postings = user.ownPostings;

  return (
    <div>
      <div className={classes.header}>
        <Typography component="h4" variant="h4">
          Welcome {user.name ? user.name : user.email}
        </Typography>
        <SignOutButton />
      </div>
      <OwnPostings postings={postings} />
    </div>
  );
}
