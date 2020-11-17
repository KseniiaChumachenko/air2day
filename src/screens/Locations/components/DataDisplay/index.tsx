import React from "react";
import {
  createStyles,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  Theme
} from "@material-ui/core";
import { Trans } from "@lingui/macro";
import Table from "../TableTab";
import ChartTab from "../CartsTab";
import { ExportButton } from "../ExportButton";
import { DataFilters } from "../DataFilters";
import { SensorDataConsumer } from "../../model";
import { useGetSensorsData } from "./useGetSensorsData";
import { useFilters } from "./useFilters";
import { TabIds } from "./constants";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        display: "block"
      }
    },
    tabs: {
      width: "100%"
    }
  })
);

/* TODO: remove SelectionFlow.tsx - it's old duplicate  */
/* TODO: data joined in one array: split fetched items  */
export const DataDisplay = ({ tabId }: { tabId: string }) => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(tabId);

  const { data, loading, error } = useGetSensorsData();
  const { filteredData, filters, setFilters } = useFilters(data);

  const tabProps: SensorDataConsumer = {
    sensorData: filteredData,
    loading: loading || !filteredData
  };
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <div>
        {data.length > 0 && (
          <>
            <DataFilters
              sensorData={data}
              activeFilters={filters}
              setActiveFilter={setFilters}
            />
            <ExportButton {...tabProps} />
          </>
        )}
      </div>
      <div className={classes.tabs}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={<Trans>Charts</Trans>}
            aria-label="Charts"
            value={TabIds.charts}
          />
          <Tab
            label={<Trans>Tables</Trans>}
            aria-label="Tables"
            value={TabIds.tables}
          />
        </Tabs>
        {tab === TabIds.charts && <ChartTab {...tabProps} />}
        {tab === TabIds.tables && <Table {...tabProps} />}
      </div>
      <Snackbar open={!!error}>
        <Alert severity="error">
          <Trans>Something went wrong! Sensor data are not available.</Trans>
        </Alert>
      </Snackbar>
    </div>
  );
};
