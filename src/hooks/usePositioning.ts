import { useEffect, useState } from "react";
import { now } from "moment";
import { Position } from "src/types/model";

const Prague: Position = {
  coords: {
    latitude: 50.073658,
    longitude: 14.41854,

    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  timestamp: new Date()
};

export function usePositioning() {
  const [state, setState] = useState<Position | undefined>(Prague);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(position as any);
        },
        () => setState(Prague),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return state;
}
