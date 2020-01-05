import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import useStyles from "./styles";
import { TableHeader } from "./index";

export const Loading = () => (
  <TableRow>
    <TableCell>
      <Skeleton variant={"text"} width={"100%"} />
    </TableCell>
    <TableCell>
      <Skeleton variant={"text"} width={"100%"} />
    </TableCell>
    <TableCell>
      <Skeleton variant={"text"} width={"100%"} />
    </TableCell>
    <TableCell>
      <Skeleton variant={"text"} width={"100%"} />
    </TableCell>
    <TableCell>
      <Skeleton variant={"text"} width={"100%"} />
    </TableCell>
  </TableRow>
);

export const TableLoading = () => {
  const classes = useStyles({});
  return (
    <Table className={classes.table} stickyHeader={true} size={"small"}>
      <TableHeader />
      <TableBody>
        <Loading />
      </TableBody>
    </Table>
  );
};
