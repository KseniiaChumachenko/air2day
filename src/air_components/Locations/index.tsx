import React from "react";

import { SensorsComponent } from "../../generated/graphql";
import { Loading } from "../components";
import ErrorBanner from "../components/ErrorBanner";

import { SensorsTable } from "./components/Table";
import Map from "./components/Map";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { List } from "./components/List";

const styles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    width: '100%',
    height: '94vh',
    display: "flex",
  }
});

const Provider: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
  <ScreenWrapper>
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
              <List data={data}/>
              {/*<SensorsTable data={data} />*/}
            </div>
          );
        }
      }}
    </SensorsComponent>
  </ScreenWrapper>
);

export const Locations = withStyles(styles)(Provider);
