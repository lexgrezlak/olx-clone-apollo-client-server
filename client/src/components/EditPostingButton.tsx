import React from "react";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function EditPostingButton({ id, css }: any) {
  const history = useHistory();
  return (
    <IconButton aria-label="delete" onClick={() => history.push(`/edit/${id}`)}>
      <Edit className={css} />
    </IconButton>
  );
}

export default EditPostingButton;
