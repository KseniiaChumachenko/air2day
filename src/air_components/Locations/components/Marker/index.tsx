import React from "react";

import LocationOnIcon from "@material-ui/icons/LocationOn";

import { Coords } from "google-map-react";
interface MarkerProps extends Coords {}

export const Marker: React.FC<MarkerProps> = ({ ...props }) => (
  <div {...props}>
    <LocationOnIcon color={'error'} />
  </div>
);
