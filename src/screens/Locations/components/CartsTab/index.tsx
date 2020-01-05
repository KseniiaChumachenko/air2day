import React from "react";
import { FormattedMessage } from "react-intl";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

import { SensorDataConsumer } from "../../model";
import messages from "./messages";
import { Chart } from "./Chart";
import { Skeleton } from "@material-ui/lab";

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

export const ChartTabLoading = () => (
  <Skeleton variant={"rect"} width={"100%"} height={"100%"} />
);

const ChartTab = ({ sensorData, loading }: SensorDataConsumer) => {
  const classes = useStyles({});

  if (loading) {
    return <ChartTabLoading />;
  }
  const lineNO2 = sensorData
    .filter(item => item!.pollutant === "NO2")
    .map(item => {
      return { ...item, from: item!.from.slice(11, 16) };
    });

  const linePM10 = sensorData
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

export default ChartTab;
