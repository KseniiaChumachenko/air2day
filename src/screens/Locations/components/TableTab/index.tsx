import React, { useMemo } from "react";
import { Trans } from "@lingui/macro";
import { Paper } from "@material-ui/core";

import useStyles from "./styles";
import { EmptyState } from "./EmptyState";
import { SensorDataConsumer } from "../../model";
import { useRemappedData } from "../DataDisplay/useRemappedData";
import { TableWithPagination } from "./TableWithPagination";

const DataTable = ({ data, loading }: SensorDataConsumer) => {
  const classes = useStyles({});
  const { remappedData, pollutants, hourAvgs, sensorIds } = useRemappedData(
    data
  );

  const withData = useMemo(
    () =>
      !loading &&
      pollutants.length > 0 &&
      Math.max(
        ...pollutants
          .map(p => hourAvgs.map(h => remappedData[p][h as any].length))
          .flat()
      ),
    [loading, pollutants, hourAvgs, remappedData]
  );

  return withData ? (
    <>
      {pollutants.map((p, index) => (
        <Paper className={classes.root} key={index}>
          <TableWithPagination
            title={<Trans>{p} pollution</Trans>}
            loading={loading}
            data={remappedData[p]}
            hourAvgs={hourAvgs}
            sensorIds={sensorIds}
          />
        </Paper>
      ))}
    </>
  ) : (
    <EmptyState />
  );
};

export default DataTable;
