import React from "react";
import moment from "moment";
import { Trans } from "@lingui/macro";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import useStyles from "./styles";
import { EmptyState } from "./EmptyState";
import { Loading } from "./Loading";
import { SensorDataConsumer } from "../../model";

export const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>
        <Trans>Date</Trans>
      </TableCell>
      <TableCell>
        <Trans>Time</Trans>
      </TableCell>
      <TableCell>
        <Trans>Pollutant</Trans>
      </TableCell>
      <TableCell>
        <Trans>Per hour average</Trans>
      </TableCell>
      <TableCell>
        <Trans>Value [µg/m³]</Trans>
      </TableCell>
    </TableRow>
  </TableHead>
);

const DataTable = ({ sensorData, loading }: SensorDataConsumer) => {
  const classes = useStyles({});

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} stickyHeader={true} size={"small"}>
        <TableHeader />
        <TableBody>
          {loading ? (
            <Loading />
          ) : sensorData.length > 0 ? (
            sensorData.map(({ from, to, pollutant, hourAvg, value }, key) => {
              const dateStamp =
                moment(from).format("DD/MM/YYYY") ===
                moment(to).format("DD/MM/YYYY")
                  ? moment(from).format("DD/MM/YYYY")
                  : String(
                      moment(from).format("DD") +
                        "-" +
                        moment(to).format("DD/MM/YYYY")
                    );
              return (
                <TableRow key={key}>
                  <TableCell>{dateStamp}</TableCell>
                  <TableCell>
                    {moment(from).format("HH:mm") +
                      "-" +
                      moment(to).format("HH:mm")}
                  </TableCell>
                  <TableCell>{pollutant}</TableCell>
                  <TableCell>{hourAvg}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DataTable;
