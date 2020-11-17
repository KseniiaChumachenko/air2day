import React, { useEffect } from "react";
import moment from "moment";
import {
  useDataTableLazyQuery,
} from "../../graphql/generated/graphql";
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import DataTable from "../Locations/components/TableTab";
import { Trans } from "@lingui/macro";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
);

interface DataFromNearestSensorProps {
  sensorId: string;
}

export function DataFromNearestSensor({
  sensorId
}: DataFromNearestSensorProps) {
  const classes = useStyles();

  const [getData, { data, loading, error }] = useDataTableLazyQuery();

  useEffect(() => {
    if (sensorId) {
      getData({
        variables: {
          sensorId: sensorId,
          from: moment().subtract("1", "months"),
          to: moment()
        }
      });
    }
  }, [sensorId]);

  return (
    <Grid item xs={6}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant={"h6"}>
            <Trans>
              Last month data from the <strong>nearest sensor</strong>
            </Trans>
          </Typography>
          <DataTable sensorData={data as any} loading={loading} />
        </CardContent>
      </Card>
    </Grid>
  );
}
