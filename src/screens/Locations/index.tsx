import React from "react";
import { Container, createStyles, Theme, makeStyles } from "@material-ui/core";
import { Map } from "./components/Map";
import { useTabTitle } from "../../hooks/useTabTitle";
import { DataDisplay } from "./components/DataDisplay";
import { AQIndexesWidget } from "./components/AQIndexesWidget";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: `0 0 ${theme.spacing(6)}px`,
      flexDirection: "column",
      minHeight: "100%"
    },
    dataColumn: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  })
);

export const Locations = () => {
  const classes = useStyles({});
  useTabTitle("Locations");
  return (
    <Container className={classes.container} maxWidth={false}>
      <Map />
      <AQIndexesWidget />
      <DataDisplay />
    </Container>
  );
};
