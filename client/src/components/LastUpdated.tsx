import React from "react";
import Typography from "@material-ui/core/Typography";

function LastUpdated({ updatedAt }: any) {
  const updatedAtDate = new Date(updatedAt);
  const now = new Date();

  const msSinceUpdated = now.getTime() - updatedAtDate.getTime();
  const daysSinceUpdated = Math.floor(msSinceUpdated / (1000 * 60 * 60 * 24));

  return (
    <Typography variant="subtitle2" color="textSecondary">
      Last updated: {/* eslint-disable-next-line no-nested-ternary */}
      {daysSinceUpdated === 0
        ? "today"
        : daysSinceUpdated === 1
        ? "yesterday"
        : `${daysSinceUpdated} days ago`}
    </Typography>
  );
}

export default LastUpdated;
