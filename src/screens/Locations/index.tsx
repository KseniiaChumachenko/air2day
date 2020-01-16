import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Container, createStyles, Theme, makeStyles } from "@material-ui/core";

import { SelectMenu } from "./SelectionFlow";
import { Map } from "./components/Map";
import { Error } from "src/components/Error";
import { useSensorsQuery } from "../../graphql/generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 0,
      margin: 0,
      display: "flex",
      flex: 1,
      height: "100%",

      flexDirection: "column",

      background: theme.palette.background.default
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

  const { data, loading, error } = useSensorsQuery();

  if (loading) {
    return (
      <Skeleton
        variant={"rect"}
        width={"100%"}
        height={"100%"}
        className={classes.dataColumn}
      />
    );
  }

  return (
    <Container className={classes.container} maxWidth={false}>
      {error ? (
        <Error message={error.message} />
      ) : (
        <>
          <Map data={data} />
          <div className={classes.dataColumn}>
            <SelectMenu sensorList={data?.sensors} />
          </div>
        </>
      )}
    </Container>
  );
};
