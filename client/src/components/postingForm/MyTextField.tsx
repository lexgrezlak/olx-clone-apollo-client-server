import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

interface Props {
  name: string;
  type: string;
  label: string;
  autoFocus?: boolean;
  required?: boolean;
  rows?: number;
  multiline?: boolean;
  InputProps?: any;
}

const MyTextField: React.FC<Props> = ({
  name,
  type,
  label,
  autoFocus,
  required,
  multiline,
  rows,
  InputProps,
}) => {
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
      type={type}
      error={isError}
      helperText={isError ? error : ""}
      autoFocus={autoFocus}
      required={required}
      multiline={multiline}
      InputProps={InputProps}
      rows={rows || 1}
      {...field}
    />
  );
};

export default MyTextField;
