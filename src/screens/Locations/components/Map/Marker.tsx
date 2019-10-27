import React from "react";
import { Coords } from "google-map-react";

import { Tooltip } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

interface MarkerProps extends Coords {
  code: string;
}

export const Marker: React.FC<MarkerProps> = ({ ...props }) => (
  <Tooltip title={`${props.code}, lat: ${props.lat}, lng: ${props.lng}`}>
    <div {...props}>
      <LocationOn color={"error"} />
    </div>
  </Tooltip>
);
