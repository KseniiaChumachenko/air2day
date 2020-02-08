import React from "react";
import groupBy from "lodash.groupby";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

import { SensorDataConsumer } from "../../model";
import { Chart } from "./Chart";
import { Skeleton } from "@material-ui/lab";
import { EmptyState } from "../TableTab/EmptyState";
import moment from 'moment'

export type ChartData = Array<{
  id: string | number;
  data: Array<{ x: number | string | Date; y: number | string | Date }>;
}>;

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

  console.log(sensorData)

  const mapData = sensorData.map(item => {
    const pollutantName = item.pollutant;
    return {
      from: item.from,
      to: item.to,
      [pollutantName + "|" + item.hourAvg]: item.value
    };
  });
  const groupData = groupBy(mapData, "from");
  const mapKeys = Object.keys(groupData).map(key =>
    groupData[key].reduce(
      (result, current) => Object.assign(result, current),
      {}
    )
  );

  // TODO not counted on hourAvg

  const pollutants = [...new Set(sensorData.map(item => item.pollutant))];
  const hourAvg = [...new Set(sensorData.map(item => item.hourAvg))];

  const restructuredData: ChartData = pollutants.map(pollutant => {
    const data = sensorData
      .map(item => {
        if (item.pollutant === pollutant) {
          return { x: moment(item.from).toDate(), y: item.value };
        }
      })
      .filter(item => item);
    return {
      id: pollutant,
      data
    };
  });

  console.log(restructuredData);

  return (
    <div className={classes.chart}>
      {mapKeys.length > 0 ? <Chart data={restructuredData} /> : <EmptyState />}
    </div>
  );
};

export default ChartTab;
