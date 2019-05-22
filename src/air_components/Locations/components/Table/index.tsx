import React from "react";

import { SensorsQuery } from "../../../../generated/graphql";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Link,
  withStyles,
  WithStyles
} from "@material-ui/core";

import styles from "./styles";

interface SensorsTableProps extends WithStyles<typeof styles> {
  data: SensorsQuery;
}

export const SensorsTable = withStyles(styles)(
  ({ data, classes }: SensorsTableProps) => (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Altitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sensors!.map((sensor, key) => (
            <TableRow key={key}>
              <TableCell>
                <Link href={sensor!.web as string}>{sensor!.code}</Link>
              </TableCell>
              <TableCell>{sensor!.latitude}</TableCell>
              <TableCell>{sensor!.longitude}</TableCell>
              <TableCell>{sensor!.altitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
);
