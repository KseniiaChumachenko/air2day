import React, { ReactNode } from "react";
import { Grid } from "@material-ui/core";
import { CardView } from "./Card";

export const DefaultDashboardCard = ({
  data,
  message
}: {
  data?: ReactNode;
  message: ReactNode;
}) => (
  <Grid item md={6}>
    <CardView media={data} text={message} />
  </Grid>
);
