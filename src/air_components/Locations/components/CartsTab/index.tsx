import React from "react";
import { FormattedMessage } from "react-intl";

import {
  withStyles,
  WithStyles,
  Theme,
  createStyles,
  Typography
} from "@material-ui/core";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { ChartRepresentationComponent } from "../../../../generated/graphql";
import { ErrorBanner, Loading } from "../../../components";
import messages from "./messages";

const styles = (theme: Theme) =>
  createStyles({
    title: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(1)
    },
    group: {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2)
    },
    radio: {
      flexDirection: "row",
      marginLeft: theme.spacing(2)
    },
    chart: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      height: 500,
      width: '100%'
    },
  });

interface DataTableProps extends WithStyles<typeof styles> {
  id: string;
  from: any;
  to: any;
}

export const ChartTab = withStyles(styles)(
  ({ classes, id, from, to }: DataTableProps) => {
    return (
      <ChartRepresentationComponent
        variables={{ sensorId: id, from: from, to: to }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <ErrorBanner />;
          }
          if (data) {
            const lineNO2 = data
              .sensorData!.filter(item => item!.pollutant === "NO2")
              .map(item => {
                return { ...item, from: item!.from.slice(0, 16) };
              });

            const linePM10 = data
              .sensorData!.filter(item => item!.pollutant === "PM10")
              .map(item => {
                return { ...item, from: item!.from.slice(11, 16) };
              });

            return (
              <>
                <Typography className={classes.title}>
                  <FormattedMessage {...messages.NO2} />
                </Typography>
                <div className={classes.chart}>
                  <ResponsiveContainer>
                    <LineChart
                      width={400}
                      height={250}
                      data={lineNO2}
                      margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="from" />
                      <YAxis
                        label={{
                          value: "[µg/m³]",
                          position: "center",
                          angle: -90
                        }}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#FF4081"
                        activeDot={{ r: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <Typography className={classes.title}>
                  <FormattedMessage {...messages.PM10} />
                </Typography>
                <div className={classes.chart}>
                  <ResponsiveContainer>
                    <LineChart
                      width={400}
                      height={250}
                      data={linePM10}
                      margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="from" />
                      <YAxis
                        label={{
                          value: "[µg/m³]",
                          position: "center",
                          angle: -90
                        }}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#FF4081"
                        activeDot={{ r: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            );
          }
        }}
      </ChartRepresentationComponent>
    );
  }
);
