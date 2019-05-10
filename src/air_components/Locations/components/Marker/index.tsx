import React from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import Tooltip from "@material-ui/core/Tooltip";

import { Coords } from "google-map-react";
interface MarkerProps extends Coords {}

export const Marker: React.FC<MarkerProps> = ({ ...props }) => (
  <Tooltip title={`lat: ${props.lat}<br/>, lng: ${props.lng}`}>
    <div {...props}>
      <LocationOnIcon color={"error"} />
    </div>
  </Tooltip>
);
