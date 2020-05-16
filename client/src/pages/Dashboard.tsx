import React from "react";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { Container, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GET_CURRENT_USER_AND_OWN_POSTINGS } from "../graphql/queries";
import SignOutButton from "./dashboard/SignOutButton";
import OwnPostings from "./dashboard/OwnPostings";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_CURRENT_USER_AND_OWN_POSTINGS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  const user = data.currentUser;
  const postings = user.ownPostings;

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.header}>
        <Typography component="h5" variant="h5">
          Welcome {user.name || user.email}
        </Typography>
        <SignOutButton />
      </div>
      <OwnPostings postings={postings} />
    </Container>
  );
}
