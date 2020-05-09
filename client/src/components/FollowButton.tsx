import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Star, StarBorder } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import {
  FOLLOW_POSTING,
  GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
} from "../graphql/queries";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "gold",
    },
  })
);

function FollowButton({ postingId, postingTitle }: any) {
  const classes = useStyles();
  const [followPosting] = useMutation(FOLLOW_POSTING, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleFollow(id: string) {
    followPosting({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        followPosting: {
          __typename: "Posting",
          id,
        },
      },
      // eslint-disable-next-line no-shadow
      update: (proxy, { data: { followPosting } }: any) => {
        const data = proxy.readQuery({
          query: GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
        }) as any;
        proxy.writeQuery({
          query: GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
          data: {
            ...data,
            currentUserFollowedPostings: [
              ...data.currentUserFollowedPostings,
              followPosting,
            ],
          },
        });
      },
    });
  }

  return (
    <IconButton
      aria-label={`follow the posting: ${postingTitle}`}
      className={classes.icon}
      onClick={() => handleFollow(postingId)}
    >
      <StarBorder />
    </IconButton>
  );
}

export default FollowButton;
