import React from "react";
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
import { MapRounded, MyLocation, MyLocationRounded } from "@material-ui/icons";
import { useAddressFromCoordinates } from "../../components/GoogleApi/useAddressFromCoordinates";
import { Skeleton } from "@material-ui/lab";
import { useSensorGeocoding } from "../../components/GoogleApi/useSensorGeocoding";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
);

interface AboutCurrentLocationCardProps {
  userPosition: Position;
  nearestSensor: Sensor;
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
          <Typography variant={"h6"}>
            <Trans>About your current location:</Trans>
          </Typography>
          <ListItem>
            <ListItemIcon>
              <MapRounded />
            </ListItemIcon>
            <ListItemText
              primary={
                <Trans>
                  <b>Address: </b>
                  {userAddress || <Skeleton variant={"text"} width={120} />}
                </Trans>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MyLocationRounded />
            </ListItemIcon>
            <ListItemText
              primary={
                <Trans>
                  <b>Coordinates: </b>
                  {userPosition?.coords?.latitude || (
                    <Skeleton variant={"text"} width={120} />
                  )}
                  ,
                  {userPosition?.coords?.longitude || (
                    <Skeleton variant={"text"} width={120} />
                  )}
                </Trans>
              }
            />
          </ListItem>
          <Typography variant={"h6"}>
            <Trans>About nearest sensor:</Trans>
          </Typography>
          <ListItem>
            <ListItemIcon>
              <MapRounded />
            </ListItemIcon>
            <ListItemText
              primary={
                <Trans>
                  <b>Address: </b>
                  {sensorAddress || <Skeleton variant={"text"} width={120} />}
                </Trans>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MyLocationRounded />
            </ListItemIcon>
            <ListItemText
              primary={
                <Trans>
                  <b>Coordinates: </b>
                  {nearestSensor?.latitude || (
                    <Skeleton variant={"text"} width={120} />
                  )}
                  ,
                  {nearestSensor?.longitude || (
                    <Skeleton variant={"text"} width={120} />
                  )}
                </Trans>
              }
            />
          </ListItem>
        </CardContent>
      </Card>
    </Grid>
  );
}
