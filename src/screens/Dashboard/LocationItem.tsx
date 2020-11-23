import React, { ReactNode } from "react";
import {
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { MapRounded, MyLocationRounded } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coordsContainer: {
      display: "flex"
    }
  })
);

export function LocationItem({
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
    <div>
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
    </div>
  );
}
