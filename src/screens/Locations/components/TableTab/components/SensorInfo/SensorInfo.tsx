import React from "react";
import { FormattedMessage } from "react-intl";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  createStyles,
  Paper,
  Theme,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";

import { QueryInterface } from "types/queryInterface";
import { SensorInfoQuery } from "src/generated/graphql";
import { Loading } from "src/components/LoadingState";

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

const GET_SENSOR_INFO = gql`
  query SensorInfo($id: String) {
    sensor(id: $id) {
      code
      altitude
      latitude
      longitude
      web
    }
  }
`;

export const SensorInfo = ({ id }: { id: string }) => {
  const classes = useStyles({});

  const { data, loading, error }: QueryInterface<SensorInfoQuery> = useQuery(
    GET_SENSOR_INFO,
    { variables: id }
  );
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div />;
  }

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        <FormattedMessage {...messages.title} />
      </Typography>
      <div className={classes.properties}>
        <Typography>
          <FormattedMessage {...messages.code} />
          <Link href={data!.sensor!.web as string}>{data.sensor.code}</Link>
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
};
