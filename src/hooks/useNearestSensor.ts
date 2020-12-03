import { usePositioning } from "./usePositioning";
import { Sensor, useSensorsPositionQuery } from "../graphql/generated/graphql";
import { useEffect, useState } from "react";

// Convert Degress to Radians
function Deg2Rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function PythagorasEquirectangular(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = lat2 - lat1;
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

export function useNearestSensor() {
  const { data } = useSensorsPositionQuery();
  const position = usePositioning();
  const [state, setState] = useState<
    Pick<Sensor, "id" | "code" | "latitude" | "longitude">
  >();

  const sensorsCoords = data?.sensors;

  useEffect(() => {
    let minDif = 99999;
    let closest;
    let index;

    if (sensorsCoords && position) {
      for (index = 0; index < sensorsCoords.length; ++index) {
        var dif = PythagorasEquirectangular(
          position.coords.latitude,
          position.coords.longitude,
          sensorsCoords[index].latitude,
          sensorsCoords[index].longitude
        );
        if (dif < minDif) {
          closest = index;
          minDif = dif;
        }
      }
      setState(sensorsCoords[closest]);
    }
  }, [sensorsCoords, position]);

  return state;
}
