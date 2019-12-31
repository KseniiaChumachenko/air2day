import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Sensor, SensorsQuery } from "src/graphql/generated/graphql";
import GoogleMap from "../../GoogleApi";
import { MarkerProps } from "google-maps-react";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "40vh"
    }
  })
);

interface MapProps {
  data: SensorsQuery;
}

export function Map({ data }: MapProps) {
  const classes = useStyles({});

  const [activeMarkerData, setActiveMarkerData] = useState<Sensor | null>(null);
  const { sensors } = data;

  const markers: MarkerProps[] = sensors.map(sensor => {
    return {
      name: sensor.code,
      position: { lat: sensor.latitude, lng: sensor.longitude }
    };
  });

  const handleActiveMarker = (key: number) => setActiveMarkerData(sensors[key]);


  return (
    <div className={classes.container}>
      <GoogleMap
        initialCenter={{
          lat: sensors[0].latitude,
          lng: sensors[0].longitude
        }}
        zoom={11}
        markers={markers}
        handleActiveMarker={handleActiveMarker}
        activeMarkerData={activeMarkerData}
      />
    </div>
  );
}
