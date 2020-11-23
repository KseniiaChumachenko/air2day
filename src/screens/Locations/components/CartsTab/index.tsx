import React from "react";
import { Trans } from "@lingui/macro";
import { Skeleton } from "@material-ui/lab";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

import { SensorDataConsumer } from "../../model";
import { Chart } from "./Chart";
import { EmptyState } from "../TableTab/EmptyState";
import { useRemappedData } from "../DataDisplay/useRemappedData";

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
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      width: "100%",
      paddingBottom: theme.spacing(4)
    }
  })
);

export const ChartTabLoading = () => (
  <Skeleton variant={"rect"} width={"100%"} height={"100%"} />
);

const ChartTab = ({ data, loading }: SensorDataConsumer) => {
  const classes = useStyles({});

  const {
    remappedData,
    pollutants,
    hourAvgs,
    fromDates,
    sensorIds
  } = useRemappedData(data);

  if (loading) {
    return <ChartTabLoading />;
  }

  return (
    <div className={classes.chart}>
      {pollutants?.length < 1 ? (
        <EmptyState />
      ) : (
        pollutants?.map((p, i) => (
          <Chart
            key={i}
            data={remappedData[p]}
            hourAvgs={hourAvgs}
            sensorIds={sensorIds}
            fromDates={fromDates}
            axesLeftTitle={<Trans>Value [µg/m³]</Trans>}
            axesBottomTitle={<Trans>Timestamp</Trans>}
            title={<Trans>{p} pollution over time</Trans>}
          />
        ))
      )}
    </div>
  );
};

export default ChartTab;
