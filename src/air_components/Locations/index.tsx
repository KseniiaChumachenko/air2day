import React from "react";

import {
  Container,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core";

import { SensorsComponent } from "../../generated/graphql";
import { Loading, ErrorBanner } from "../components";

import { List } from "./components/List";
import Map from "./components/Map";

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      width: "100%",
      height: "94vh",
      display: "flex"
    }
  });

export const Locations = withStyles(styles)(
  ({ classes }: WithStyles<typeof styles>) => (
    <Container>
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
                <List data={data} />
              </div>
            );
          }
        }}
      </SensorsComponent>
    </Container>
  )
);
