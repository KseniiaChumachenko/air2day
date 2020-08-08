import React from "react";
import groupBy from "lodash.groupby";
import { Trans } from "@lingui/macro";
import moment from "moment";
import { Skeleton } from "@material-ui/lab";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

import { SensorDataConsumer } from "../../model";
import { Chart } from "./Chart";
import { EmptyState } from "../TableTab/EmptyState";

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
      width: "100%",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(3)
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

  const pollutants = [...new Set(sensorData.map(item => item.pollutant))];
  const hourAvg = [...new Set(sensorData.map(item => item.hourAvg))];

  const restructuredData: ChartData = hourAvg
    .map(hour =>
      pollutants.map(pollutant => {
        return {
          id: pollutant + " ( " + hour + " 🕒 ) ",
          data: sensorData
            .map(item => {
              if (item.pollutant === pollutant && item.hourAvg === hour) {
                return { x: moment(item.from).toDate(), y: item.value };
              }
            })
            .filter(item => item)
        };
      })
    )
    .flat()
    .filter(chartData => chartData.data.length > 0);
  return (
    <div className={classes.chart}>
      {mapKeys.length > 0 ? (
        <Chart
          data={restructuredData}
          axesLeftTitle={<Trans>Value [µg/m³]</Trans>}
          axesBottomTitle={<Trans>Timestamp</Trans>}
          title={<Trans>Pollution over time</Trans>}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ChartTab;
