import React from "react";
import { Trans } from "@lingui/macro";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import useStyles from "./styles";

export const EmptyState = () => {
  const classes = useStyles({});
  return (
    <Typography
      className={classes.emptyState}
      variant={"h6"}
      color={"textPrimary"}
    >
      <Trans>No data occurred!</Trans>
    </Typography>
  );
};
