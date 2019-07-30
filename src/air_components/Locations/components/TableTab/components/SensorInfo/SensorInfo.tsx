import React from "react";
import { FormattedMessage } from "react-intl";

import {
  createStyles,
  Paper,
  Theme,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";

import { SensorInfoComponent } from "../../../../../../generated/graphql";
import { Loading } from "../../../../../components";
import messages from "./messages";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(1),
      color: theme.palette.primary.dark
    },
    container: {
      padding: theme.spacing(2),
      letterSpacing: "0.1em",
      lineHeight: 2
    },
    properties: {
      marginLeft: theme.spacing(2)
    }
  })
);

export const SensorInfo = ({ id }: { id: string }) => {
  const classes = useStyles();

  return (
    <SensorInfoComponent variables={{ id: id }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <div />;
        }
        if (data) {
          return (
            <Paper className={classes.container}>
              <Typography variant="h5" className={classes.title}>
                <FormattedMessage {...messages.title} />
              </Typography>
              <div className={classes.properties}>
                <Typography>
                  <FormattedMessage {...messages.code} />
                  <Link href={data.sensor!.web as string}>
                    {data.sensor.code}
                  </Link>
                </Typography>
                <Typography>
                  <FormattedMessage {...messages.latitude} />
                  {data.sensor.latitude}
                </Typography>
                <Typography>
                  <FormattedMessage {...messages.longitude} />
                  {data.sensor.longitude}
                </Typography>
                <Typography>
                  <FormattedMessage {...messages.altitude} />
                  {data.sensor.altitude}
                </Typography>
              </div>
            </Paper>
          );
        }
      }}
    </SensorInfoComponent>
  );
};
