import React from "react";
import useStyles from "./styles";
import { TableCell, TableRow, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

export const EmptyState = () => {
  const classes = useStyles({});
  return (
    <TableRow>
      <TableCell className={classes.emptyState}>
        <Typography className={classes.emptyState} color={"textPrimary"}>
          <FormattedMessage {...messages.noData} />
        </Typography>
      </TableCell>
    </TableRow>
  );
};
