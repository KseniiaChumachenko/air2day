import React from "react";

import { SensorsComponent } from "../../generated/graphql";
import { Loading } from "../components";
import ErrorBanner from "../components/ErrorBanner";

import { SensorsTable } from "./components/Table";
import Map from "./components/Map";
import { withStyles, WithStyles } from "@material-ui/core";
import styles from "./styles";

const Provider: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
  <SensorsComponent>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loading />;
      }
      if (error) {
        return <ErrorBanner />;
      }
      if (data) {
        return (
          <div className={classes.root}>
            <Map data={data} />
            <SensorsTable data={data} />
          </div>
        );
      }
    }}
  </SensorsComponent>
);

export const Locations = withStyles(styles)(Provider);
