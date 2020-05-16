import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { DELETE_POSTING } from "../../graphql/queries";

function DeletePostingButton({ postingId, css }: any) {
  const client = useApolloClient();

  const [deletePosting] = useMutation(DELETE_POSTING, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleDelete(id: string) {
    await deletePosting({ variables: { id } });
    await client.resetStore();
  }

  return (
    <IconButton aria-label="delete" onClick={() => handleDelete(postingId)}>
      <Delete className={css} />
    </IconButton>
  );
}

export default DeletePostingButton;
