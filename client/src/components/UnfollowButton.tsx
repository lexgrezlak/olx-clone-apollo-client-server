import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Star, StarBorder } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import {
  FOLLOW_POSTING,
  GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
  UNFOLLOW_POSTING,
} from "../graphql/queries";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "gold",
    },
  })
);

function UnfollowButton({ postingId, postingTitle }: any) {
  const classes = useStyles();
  const [unfollowPosting] = useMutation(UNFOLLOW_POSTING, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleUnfollow(id: string) {
    unfollowPosting({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        unfollowPosting: {
          __typename: "Posting",
          id,
        },
      },
      // eslint-disable-next-line no-shadow
      update: (proxy, { data: { unfollowPosting } }: any) => {
        const data = proxy.readQuery({
          query: GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
        }) as any;
        console.log(unfollowPosting);
        console.log(data);
        // console.log(data.currentUserFollowedPostings);
        proxy.writeQuery({
          query: GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
          data: {
            currentUserFollowedPostings: data.currentUserFollowedPostings.filter(
              (posting: any) => posting.id !== unfollowPosting.id
            ),
          },
        });
      },
    });
  }

  return (
    <IconButton
      aria-label={`follow the posting: ${postingTitle}`}
      className={classes.icon}
      onClick={() => handleUnfollow(postingId)}
    >
      <Star />
    </IconButton>
  );
}

export default UnfollowButton;
