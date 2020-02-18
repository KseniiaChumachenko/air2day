import React from "react";
import { Trans } from "@lingui/macro";
import { CSVLink } from "react-csv";
import { GetApp, CloudQueue } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

import { SensorDataConsumer } from "../../model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "30vh"
    },
    icon: {
      margin: "auto 10px"
    },
    typography: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "30vh"
    },
    message: {
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily
    }
  })
);

export const ExportTab = ({ loading, sensorData }: SensorDataConsumer) => {
  const classes = useStyles({});

  return loading ? (
    <Skeleton variant={"text"} className={classes.root} />
  ) : sensorData.length > 0 ? (
    <CSVLink
      data={sensorData}
      filename={"air2day_export.csv"}
      className={classes.message}
    >
      <Typography variant={"h4"} className={classes.typography}>
        <GetApp
          color={"primary"}
          fontSize={"inherit"}
          className={classes.icon}
        />
        <Trans>Download as CSV</Trans>
      </Typography>
    </CSVLink>
  ) : (
    <Typography variant={"h4"} className={classes.typography} color={"primary"}>
      <CloudQueue
        color={"primary"}
        fontSize={"inherit"}
        className={classes.icon}
      />
      <Trans>Nothing to download</Trans>
    </Typography>
  );
};
