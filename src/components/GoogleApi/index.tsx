import React from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Map,
  IMapProps,
  IInfoWindowProps,
  IMarkerProps,
  Marker
} from "google-maps-react";
import { nativeGoogleMapStyles, useStyles } from "./styles";

interface P extends Partial<IMapProps> {
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
      <Map
        {...props}
        google={(window as any).google}
        styles={nativeGoogleMapStyles}
      >
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
