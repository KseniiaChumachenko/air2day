import React, { useMemo } from "react";
import {
  createStyles,
  makeStyles,
  Snackbar,
  Theme,
  Typography
} from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { Alert } from "@material-ui/lab";

import { useGetSensorsData } from "./useGetSensorsData";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { useRemappedData } from "./useRemappedData";
import { DataCard } from "../DataCard";
import { LoadingDataCard } from "../DataCard/LoadingDataCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        display: "block"
      }
    },
    emptyState: {
      margin: theme.spacing(4),
      display: "flex",
      justifyContent: "center"
    }
  })
);

export const DataDisplay = () => {
  const classes = useStyles();

  const { searchData } = useUpdateSearchData();
  const { locations } = useMemo(() => searchData, [searchData]);

  const { data, loading, error } = useGetSensorsData();

  const {
    remappedData,
    pollutants,
    hourAvgs,
    fromDates,
    sensorIds
  } = useRemappedData(data);

  const isEmptyState = locations?.length === 0 || hourAvgs?.length < 1;

  return isEmptyState ? (
    <NoSensorsSelected />
  ) : (
    <div className={classes.root}>
      {loading ? (
        <LoadingDataCard />
      ) : (
        pollutants?.map((p, i) => (
          <DataCard
            key={i}
            pollutant={p}
            hourAvgs={hourAvgs}
            fromDates={fromDates}
            data={remappedData[p]}
            sensorIds={sensorIds}
          />
        ))
      )}

      <Snackbar open={!!error}>
        <Alert severity="error">
          <Trans>Something went wrong! Sensor data are not available.</Trans>
        </Alert>
      </Snackbar>
    </div>
  );
};

const NoSensorsSelected = () => {
  const classes = useStyles();
  return (
    <Typography
      variant={"h5"}
      color={"textPrimary"}
      className={classes.emptyState}
    >
      <Trans>No search results available</Trans>
    </Typography>
  );
};
