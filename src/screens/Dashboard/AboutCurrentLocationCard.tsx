import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import { Sensor } from "../../graphql/generated/graphql";
import { Trans } from "@lingui/macro";
import { MapRounded, MyLocationRounded } from "@material-ui/icons";
import { useAddressFromCoordinates } from "../../components/GoogleApi/useAddressFromCoordinates";
import { Skeleton } from "@material-ui/lab";
import { useSensorGeocoding } from "../../components/GoogleApi/useSensorGeocoding";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    coordsContainer: {
      display: "flex"
    }
  })
);

interface AboutCurrentLocationCardProps {
  userPosition: Position;
  nearestSensor: Sensor;
}

function LocationItem({
  title,
  address,
  latitude,
  longitude
}: {
  title: ReactNode;
  address?: string;
  latitude?: string | number;
  longitude?: string | number;
}) {
  const classes = useStyles({});
  return (
    <React.Fragment>
      <Typography variant={"h6"}>{title}</Typography>
      <ListItem>
        <ListItemIcon>
          <MapRounded />
        </ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.coordsContainer}>
              <Trans>
                <b>Address: </b>
              </Trans>
              &nbsp;
              {address || <Skeleton variant={"text"} width={120} />}
            </div>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <MyLocationRounded />
        </ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.coordsContainer}>
              <Trans>
                <b>Coordinates: </b>
              </Trans>
              &nbsp;
              {latitude || <Skeleton variant={"text"} width={120} />}
              ,&nbsp;
              {longitude || <Skeleton variant={"text"} width={120} />}
            </div>
          }
        />
      </ListItem>
    </React.Fragment>
  );
}

export function AboutCurrentLocationCard({
  userPosition,
  nearestSensor
}: AboutCurrentLocationCardProps) {
  const classes = useStyles({});

  const userAddress = useAddressFromCoordinates(userPosition?.coords);
  const sensorAddress = useSensorGeocoding(nearestSensor);

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent>
          <LocationItem
            title={<Trans>About your current location:</Trans>}
            latitude={userPosition?.coords?.latitude}
            longitude={userPosition?.coords?.longitude}
            address={userAddress}
          />
          <LocationItem
            title={<Trans>About nearest sensor:</Trans>}
            latitude={nearestSensor?.latitude}
            longitude={nearestSensor?.longitude}
            address={sensorAddress}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
