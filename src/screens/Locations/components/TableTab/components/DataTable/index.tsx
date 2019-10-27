import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
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

import { Error } from "src/components/Error";
import { Loading } from "src/components/LoadingState";
import { DataTableQuery } from "src/generated/graphql";
import { QueryInterface } from "types/queryInterface";

import useStyles from "./styles";
import messages from "./messages";

const GET_DATA_TABLE = gql`
  query DataTable(
    $from: OffsetDateTime
    $to: OffsetDateTime
    $sensorId: String
  ) {
    sensorData(from: $from, to: $to, sensorId: $sensorId) {
      from
      to
      pollutant
      hourAvg
      value
    }
  }
`;

interface DataTableProps {
  id: string;
  from: any;
  to: any;
}

export const DataTable = ({ id, from, to }: DataTableProps) => {
  const classes = useStyles({});

  const { data, loading, error }: QueryInterface<DataTableQuery> = useQuery(
    GET_DATA_TABLE,
    {
      variables: { sensorId: id, from, to }
    }
  );

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
