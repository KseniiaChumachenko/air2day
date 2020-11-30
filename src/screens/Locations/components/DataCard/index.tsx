import React from "react";
import { Paper } from "@material-ui/core";
import { Header } from "../Header";
import {
  POLLUTANTS_DESCRIPTIONS,
  pollutantTitle
} from "../../../../constants/POLLUTANTS_DESCRIPTIONS";
import { Chart } from "../Chart";
import { TableWithPagination } from "../TableWithPagination";
import {
  SensorPollutionDataOverHourAvg,
  UseRemappedDataResults
} from "../../model";
import { useStyles } from "./styles";

export enum ViewModes {
  "chart",
  "table"
}

interface P extends UseRemappedDataResults {
  pollutant: string;
  data: SensorPollutionDataOverHourAvg;
}

export const DataCard = ({
  pollutant,
  hourAvgs,
  data,
  sensorIds,
  fromDates
}: P) => {
  const classes = useStyles();
  const [viewMode, setViewMode] = React.useState<ViewModes>(ViewModes.chart);
  const [hourAvg, setHourAvg] = React.useState(hourAvgs[0]);

  const commonProps = {
    data,
    hourAvg,
    hourAvgs,
    sensorIds,
    pollutant
  };
  return (
    <Paper className={classes.root}>
      <Header
        title={pollutantTitle(pollutant)}
        description={(POLLUTANTS_DESCRIPTIONS as any)[pollutant] || ""}
        setHourAvg={setHourAvg}
        hourAvg={hourAvg}
        hourAvgs={hourAvgs}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === ViewModes.chart ? (
        <Chart fromDates={fromDates} {...commonProps} />
      ) : (
        <TableWithPagination {...commonProps} />
      )}
    </Paper>
  );
};
