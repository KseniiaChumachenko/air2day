import { useEffect, useState } from "react";
import { now } from "moment";

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
  timestamp: now()
};

export function usePositioning() {
  const [state, setState] = useState<Position | undefined>(Prague);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(position);
        },
        () => setState(Prague),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return state;
}
