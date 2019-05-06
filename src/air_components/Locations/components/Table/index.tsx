import React from "react";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { withStyles, WithStyles } from "@material-ui/core";

import { SensorsQuery } from "../../../../generated/graphql";



import styles from "./styles";
import Link from "@material-ui/core/Link";

interface SensorsTableProps extends WithStyles<typeof styles> {
  data: SensorsQuery;
}

const Sensors: React.FC<SensorsTableProps> = ({ data, classes }) => (
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
);

export const SensorsTable = withStyles(styles)(Sensors);
