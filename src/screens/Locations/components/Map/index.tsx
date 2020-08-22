import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Sensor, SensorsQuery } from "src/graphql/generated/graphql";
import GoogleMap from "../../../../components/GoogleApi";
import { IMarkerProps } from "google-maps-react";
import { usePositioning } from "../../../../hooks/usePositioning";

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
  const userLocation = usePositioning();

  const [activeMarkerData, setActiveMarkerData] = useState<Sensor | null>(null);
  const { sensors } = data;

  const markers: IMarkerProps[] = sensors.map(sensor => {
    return {
      title: sensor.code,
      position: { lat: sensor.latitude, lng: sensor.longitude }
    };
  });

  const handleActiveMarker = (key: number) => setActiveMarkerData(sensors[key]);

  return (
    <div className={classes.container}>
      <GoogleMap
        initialCenter={{
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude
        }}
        markers={markers}
        handleActiveMarker={handleActiveMarker}
        activeMarkerData={activeMarkerData}
      />
    </div>
  );
}
