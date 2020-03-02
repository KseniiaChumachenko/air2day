import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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