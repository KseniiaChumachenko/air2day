import React from "react";
import { FormattedMessage } from "react-intl";
import { isEmpty } from "lodash";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  withStyles,
  WithStyles,
  Typography
} from "@material-ui/core";

import { DataTableComponent } from "../../../../../../generated/graphql";
import { ErrorBanner, Loading } from "../../../../../components";

import styles from "./styles";
import messages from "./messages";

interface DataTableProps extends WithStyles<typeof styles> {
  id: string;
  from: any;
  to: any;
}

export const DataTable = withStyles(styles)(
  ({ classes, id, from, to }: DataTableProps) => (
    <DataTableComponent variables={{ sensorId: id, from: from, to: to }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <ErrorBanner />;
        }
        if (data) {
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
                  {!isEmpty(data.sensorData) ? (
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
        }
      }}
    </DataTableComponent>
  )
);
