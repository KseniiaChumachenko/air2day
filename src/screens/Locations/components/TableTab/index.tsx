import React from "react";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import useStyles from "./styles";
import messages from "./messages";
import { EmptyState } from "./EmptyState";
import { Loading } from "./Loading";
import { SensorDataConsumer } from "../../model";

export const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>
        <FormattedMessage {...messages.date} />
      </TableCell>
      <TableCell>
        <FormattedMessage {...messages.time} />
      </TableCell>
      <TableCell>
        <FormattedMessage {...messages.pollut} />
      </TableCell>
      <TableCell>
        <FormattedMessage {...messages.hourAvg} />
      </TableCell>
      <TableCell>
        <FormattedMessage {...messages.value} />
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
