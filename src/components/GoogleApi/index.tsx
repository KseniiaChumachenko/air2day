import React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Map,
  GoogleApiWrapper,
  IMapProps,
  IInfoWindowProps,
  IMarkerProps,
  Marker
} from "google-maps-react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { GOOGLE_API_KEY } from "./const";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mapStyles: {
      height: "40vh",
      width: "100%",
      position: "relative"
    },
    header: {
      padding: theme.spacing(2)
    },
    listItem: {
      whiteSpace: "break-spaces",
      overflow: "hidden",
      maxWidth: "300px"
    },
    link: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "300px"
    }
  })
);

interface P extends IMapProps {
  markers?: IMarkerProps[];
  infoWindows?: IInfoWindowProps[];
}

export const MapContainer = (props: P) => {
  const classes = useStyles({});

  if (!(window as any).google) {
    return <LoadingContainer />;
  }

  return (
    <div className={classes.mapStyles}>
      <Map {...props} google={(window as any).google}>
        {props.markers?.map((marker, key) => (
          <Marker key={key} {...marker} />
        ))}
      </Map>
    </div>
  );
};

const LoadingContainer = () => (
  <Skeleton variant={"rect"} height={"40vh"} width={"100%"} />
);

export default MapContainer;
