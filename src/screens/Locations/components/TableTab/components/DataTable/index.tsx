import React, { useEffect } from "react";
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

import { useDataTableQuery } from "src/graphql/generated/graphql";

import { Error } from "src/components/Error";
import useStyles from "./styles";
import messages from "./messages";
import { EmptyState } from "./EmptyState";
import { Loading } from "./Loading";

interface DataTableProps {
  id: string;
  from: any;
  to: any;
}

export const DataTable = ({ id, from, to }: DataTableProps) => {
  const classes = useStyles({});

  const { data, loading, error } = useDataTableQuery({
    variables: { sensorId: id, from, to },
    fetchPolicy: "no-cache"
  });

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} stickyHeader={true} size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage {...messages.from} />
            </TableCell>
            <TableCell>
              <FormattedMessage {...messages.to} />
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
        <TableBody>
          {loading ? (
            <Loading />
          ) : (
            data &&
            (data.sensorData.length > 0 ? (
              data.sensorData.map(
                ({ from, to, pollutant, hourAvg, value }, key) => (
                  <TableRow key={key}>
                    <TableCell>
                      {moment(from).format("DD/MM/YYYY")}
                      <b> {moment(from).format("HH:mm")}</b>
                    </TableCell>
                    <TableCell>
                      {moment(to).format("DD/MM/YYYY HH:mm")}
                      <b> {moment(to).format("HH:mm")}</b>
                    </TableCell>
                    <TableCell>{pollutant}</TableCell>
                    <TableCell>{hourAvg}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                )
              )
            ) : (
              <EmptyState />
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
