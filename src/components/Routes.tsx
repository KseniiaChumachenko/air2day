import React from "react";
import { Route } from "react-router-dom";
import { Dashboard } from "../screens/Dashboard";
import { Locations } from "../screens/Locations";
import { AppContainer } from "./AppContainer";

enum RoutesNames {
  root = "/",
  locations = "/locations"
}

export const Routes = () => {
  return (
    <>
      <Route exact path={RoutesNames.root} component={Dashboard} />
      <Route path={RoutesNames.locations} component={Locations} />
    </>
  );
};
