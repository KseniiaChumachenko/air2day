import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import { useDataTableQuery } from "src/graphql/generated/graphql";
import { Error } from "src/components/Error";
import { Loading } from "src/components/LoadingState";

import useStyles from "./styles";
import messages from "./messages";

interface DataTableProps {
  id: string;
  from: any;
  to: any;
}

export const DataTable = ({ id, from, to }: DataTableProps) => {
  const classes = useStyles({});

  const { data, loading, error } = useDataTableQuery({
    variables: { sensorId: id, from, to }
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
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
          {data ? (
            data.sensorData!.map((data, key) => (
              <TableRow key={key}>
                <TableCell>{data!.from.slice(11, 16)}</TableCell>
                <TableCell>{data!.to.slice(11, 16)}</TableCell>
                <TableCell>{data!.pollutant}</TableCell>
                <TableCell>{data!.hourAvg}</TableCell>
                <TableCell>{data!.value}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <Typography>
                  <FormattedMessage {...messages.noData} />
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
