import React from "react";
import { Alert } from "@material-ui/lab";

interface NotificationProps {
  message: string;
}

export default function ErrorNotification({ message }: NotificationProps) {
  return (
    <Alert severity="error" variant="outlined">
      {message}
    </Alert>
  );
}
