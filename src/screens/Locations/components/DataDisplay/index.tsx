import React, { useMemo } from "react";
import {
  createStyles,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  Theme,
  Typography
} from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { Alert } from "@material-ui/lab";

import Table from "../TableTab";
import ChartTab from "../CartsTab";
import { SensorDataConsumer } from "../../model";
import { useGetSensorsData } from "./useGetSensorsData";
import { TabIds } from "./constants";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";

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
    },
    noSensors: {
      margin: theme.spacing(4),
      display: "flex",
      justifyContent: "center"
    }
  })
);

export const DataDisplay = ({ tabId }: { tabId: string }) => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(tabId);

  const { searchData } = useUpdateSearchData();
  const { locations } = useMemo(() => searchData, [searchData]);

  const { data, loading, error } = useGetSensorsData();

  const tabProps: SensorDataConsumer = {
    data,
    loading
  };
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue);
  };

  const isEmptyState = locations?.length === 0;

  return isEmptyState ? (
    <NoSensorsSelected />
  ) : (
    <div className={classes.root}>
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
      <Snackbar open={!!error && !isEmptyState}>
        <Alert severity="error">
          <Trans>Something went wrong! Sensor data are not available.</Trans>
        </Alert>
      </Snackbar>
    </div>
  );
};

const NoSensorsSelected = () => {
  const classes = useStyles();
  return (
    <Typography
      variant={"h5"}
      color={"textPrimary"}
      className={classes.noSensors}
    >
      <Trans>No sensors selected</Trans>
    </Typography>
  );
};
