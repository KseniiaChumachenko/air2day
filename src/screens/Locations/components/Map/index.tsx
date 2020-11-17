import React, { useMemo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import GoogleMap from "../../../../components/GoogleApi";
import { IMarkerProps } from "google-maps-react";
import { usePositioning } from "../../../../hooks/usePositioning";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { useTheme } from "../../../../store/ThemeProvider/useTheme";
import { OptionType } from "../../../../store/SearchDataProvider/constants";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "40vh"
    }
  })
);

const SensorIcon =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

export function Map() {
  const classes = useStyles({});
  const userLocation = usePositioning();
  const { searchData, setLocations } = useUpdateSearchData();
  const { theme } = useTheme();

  const { sensors, locations } = useMemo(() => searchData, [searchData]);

  const activeSensorColor = (sensorId: string) => {
    const index = searchData.locations.findIndex(s => s.id === sensorId);
    if (index === -1) {
      return "black";
    } else if (index % 2) {
      return theme.palette.primary.main;
    } else {
      return theme.palette.secondary.main;
    }
  };

  const filteredLocations = locations.filter(
    l => l.type === OptionType.location
  );

  const markers: IMarkerProps[] = sensors
    .concat(filteredLocations)
    .map(sensor => ({
      title: sensor.code,
      // label: sensor.code,
      icon: {
        path: SensorIcon,
        fillColor: activeSensorColor(sensor.id),
        strokeColor: activeSensorColor(sensor.id),
        fillOpacity: 1
      },
      position: { lat: sensor.latitude, lng: sensor.longitude },
      onClick: () =>
        setLocations(
          locations.includes(sensor)
            ? locations.filter(l => l.id === sensor.id)
            : [...locations, sensor]
        )
    }));

  return (
    <div className={classes.container}>
      <GoogleMap
        initialCenter={{
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude
        }}
        zoom={12}
        markers={markers}
      />
    </div>
  );
}
