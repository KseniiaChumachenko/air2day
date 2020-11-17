import React from "react";
import { Trans } from "@lingui/macro";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import useStyles from "./styles";

export const EmptyState = () => {
  const classes = useStyles({});
  return (
    <TableRow>
      <TableCell className={classes.emptyState}>
        <Typography className={classes.emptyState} color={"textPrimary"}>
          <Trans>No data occurred!</Trans>
        </Typography>
      </TableCell>
    </TableRow>
  );
};
