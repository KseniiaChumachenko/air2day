import React from "react";
import { Coords } from "google-map-react";

import { Tooltip } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

interface MarkerProps extends Coords {}

export const Marker: React.FC<MarkerProps> = ({ ...props }) => (
  <Tooltip title={`lat: ${props.lat}<br/>, lng: ${props.lng}`}>
    <div {...props}>
      <LocationOn color={"error"} />
    </div>
  </Tooltip>
);
