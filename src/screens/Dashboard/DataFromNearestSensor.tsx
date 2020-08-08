import React from "react";
import moment from "moment";
import { Sensor, useDataTableQuery } from "../../graphql/generated/graphql";
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme
} from "@material-ui/core";
import DataTable from "../Locations/components/TableTab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
);

interface DataFromNearestSensorProps {
  nearestSensor: Pick<Sensor, "id" | "code" | "latitude" | "longitude">;
}

export function DataFromNearestSensor({
  nearestSensor
}: DataFromNearestSensorProps) {
  const classes = useStyles();

  const { data, loading } = useDataTableQuery({
    variables: {
      sensorId: nearestSensor.id,
      from: moment().subtract("1", "months"),
      to: moment()
    },
    fetchPolicy: "no-cache"
  });

  return (
    <Grid item xs={6}>
      <Card className={classes.root}>
        <CardContent>
          <DataTable sensorData={data as any} loading={loading} />
        </CardContent>
      </Card>
    </Grid>
  );
}
