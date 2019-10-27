import React from "react";
import { FormattedMessage } from "react-intl";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Error } from "src/components/Error";
import { Loading } from "src/components/LoadingState";
import { ChartRepresentationQuery } from "src/generated/graphql";
import { QueryInterface } from "types/queryInterface";

import messages from "./messages";

const useStyles = makeStyles((theme: Theme) =>
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
      height: 300,
      width: "100%"
    }
  })
);

const GET_CHART_REPRESENTATION = gql`
  query ChartRepresentation(
    $from: OffsetDateTime
    $to: OffsetDateTime
    $sensorId: String
  ) {
    sensorData(from: $from, to: $to, sensorId: $sensorId) {
      from
      pollutant
      value
    }
  }
`;

interface ChartTabProps {
  id: string;
  from: any;
  to: any;
}

export const ChartTab = ({ id, from, to }: ChartTabProps) => {
  const classes = useStyles({});

  const {
    data,
    loading,
    error
  }: QueryInterface<ChartRepresentationQuery> = useQuery(
    GET_CHART_REPRESENTATION,
    { variables: { sensorId: id, from, to } }
  );
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  const lineNO2 = data.sensorData
    .filter(item => item!.pollutant === "NO2")
    .map(item => {
      return { ...item, from: item!.from.slice(11, 16) };
    });

  const linePM10 = data.sensorData
    .filter(item => item!.pollutant === "PM10")
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
};
