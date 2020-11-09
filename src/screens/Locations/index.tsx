import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Container, createStyles, Theme, makeStyles } from "@material-ui/core";

import { SelectMenu, TabIds } from "./SelectionFlow";
import { Map } from "./components/Map";
import { Error } from "src/components/Error";
import { useSensorsQuery } from "../../graphql/generated/graphql";
import { ScrollableContainer } from "../../components/ScrollableContainer";
import { useTabTitle } from "../../hooks/useTabTitle";
import { useParams } from "react-router";
import { useRouterParamsQuery } from "../../hooks/useRouterParamsQuery";
import { LocationParams } from "./model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: `0 0 ${theme.spacing(6)}px`,
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
  const query = useRouterParamsQuery();
  const locations = query.get(LocationParams.locations);
  const dates = query.get(LocationParams.dates);

  const { data, loading, error } = useSensorsQuery();
  useTabTitle("Locations");

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
    <ScrollableContainer>
      <Container className={classes.container} maxWidth={false}>
        {error ? (
          <Error message={error.message} />
        ) : (
          <>
            <Map data={data} />
            <div className={classes.dataColumn}>
              <SelectMenu sensorList={data?.sensors} tabId={TabIds.charts} />
            </div>
          </>
        )}
      </Container>
    </ScrollableContainer>
  );
};
