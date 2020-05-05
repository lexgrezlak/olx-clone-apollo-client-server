import React from "react";
import { TextField } from "@material-ui/core";

export default function Search({ filter }: any) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      id="standard-search"
      label="Search for anything"
      {...filter}
    />
  );
}
