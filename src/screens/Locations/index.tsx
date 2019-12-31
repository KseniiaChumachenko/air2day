import React from "react";
import { Container, createStyles, Theme, makeStyles } from "@material-ui/core";

import { SelectMenu } from "./components/TableTab/components/Selectors";
import { Map } from "./components/Map";
import { Loading } from "src/components/LoadingState";
import { Error } from "src/components/Error";
import { useSensorsQuery } from "../../graphql/generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: 0,
      margin: 0,
      display: "flex",
      flex: 1,

      flexDirection: "column"
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
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <Container className={classes.container} maxWidth={false}>
      <Map data={data} />
      <div className={classes.dataColumn}>
        <SelectMenu initialID={data?.sensors[0].id} />
      </div>
    </Container>
  );
};
