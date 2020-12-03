import React from "react";
import { Trans } from "@lingui/macro";
import { CSVLink } from "react-csv";
import { GetApp } from "@material-ui/icons";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";

import { SensorDataConsumer } from "../../model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      textDecoration: "none",
      color: theme.palette.primary.main
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

export const ExportButton = ({ loading, sensorData }: SensorDataConsumer) => {
  const classes = useStyles({});

  return (
    <CSVLink
      data={sensorData}
      filename={"air2day_export.csv"}
      className={classes.message}
    >
      <Button
        color="secondary"
        startIcon={<GetApp />}
        disabled={loading || !(sensorData.length > 0)}
        className={classes.button}
      >
        <Trans>Download as CSV</Trans>
      </Button>
    </CSVLink>
  );
};
