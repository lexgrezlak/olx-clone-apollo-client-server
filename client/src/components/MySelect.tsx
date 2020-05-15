import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { useField } from "formik";

interface CustomSelectProps {
  selectValues: string[];
  name: string;
  type: string;
  label: string;
  autoFocus?: boolean;
  required?: boolean;
}

function MySelect({ selectValues, name, type, label }: CustomSelectProps) {
  const [field, { error, touched }] = useField({ name, type });
  const isError = (error && touched) as boolean;

  return (
    <TextField
      select
      label={label}
      variant="outlined"
      fullWidth
      error={isError}
      helperText={isError ? error : ""}
      margin="normal"
      {...field}
    >
      {selectValues.map((selectValue) => (
        <MenuItem key={selectValue} value={selectValue}>
          {selectValue}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default MySelect;
