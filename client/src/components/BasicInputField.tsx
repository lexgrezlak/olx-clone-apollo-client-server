import React, { FunctionComponent } from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

interface Props {
  name: string;
  type: string;
  label: string;
}

const BasicInputField: FunctionComponent<Props> = ({ name, type, label }) => {
  const [field, { error, touched }] = useField({
    name,
    type,
  });

  const isError = (error && touched) as boolean;

  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      id={name}
      autoComplete={type}
      label={label}
      name={name}
      type={type}
      error={isError}
      helperText={isError ? error : ""}
      {...field}
    />
  );
};

export default BasicInputField;
