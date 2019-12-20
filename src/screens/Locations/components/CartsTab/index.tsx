import React from "react";
import { FormattedMessage } from "react-intl";

import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

import { Error } from "src/components/Error";
import { Loading } from "src/components/LoadingState";

import messages from "./messages";
import { Chart } from "./Chart";
import { useChartRepresentationQuery } from "src/graphql/generated/graphql";

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

interface ChartTabProps {
  id: string;
  from: any;
  to: any;
}

export const ChartTab = ({ id, from, to }: ChartTabProps) => {
  const classes = useStyles({});

  const { data, loading, error } = useChartRepresentationQuery({
    variables: { sensorId: id, from, to }
  });

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
        <Chart data={lineNO2} />
      </div>
      <Typography className={classes.title}>
        <FormattedMessage {...messages.PM10} />
      </Typography>
      <div className={classes.chart}>
        <Chart data={linePM10} />
      </div>
    </>
  );
};
