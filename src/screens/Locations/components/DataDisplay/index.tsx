import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Tab, Tabs } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import Table from "../TableTab";
import ChartTab from "../CartsTab";
import { ExportTab } from "../ExportTab";
import { SensorDataKey } from "../../SelectionFlow";
import { DataFilters } from "../DataFilters";
import { SensorDataConsumer } from "../../model";
import {
  SensorData,
  useDataTableLazyQuery
} from "../../../../graphql/generated/graphql";
import moment from "moment";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { useTheme } from "../../../../store/ThemeProvider/useTheme";

export enum TabIds {
  tables = "tables",
  charts = "charts",
  export = "export"
}

export const INITIAL_FILTER_STATE = {
  from: "",
  to: "",
  hourAvg: "",
  pollutant: "",
  value: ""
};

function useFilters(
  data?: SensorData[],
  filters?: { [K in SensorDataKey]?: string }
): SensorData[] {
  const [filteredData, setFilteredData] = React.useState(data);

  useEffect(() => {
    setFilteredData(
      data
        ? data.filter(item => {
            return Object.keys(filters).every(key =>
              filters[key as SensorDataKey]
                ? Object.is(
                    item[key as SensorDataKey],
                    filters[key as SensorDataKey]
                  )
                : true
            );
          })
        : null
    );
  }, [data, filters, setFilteredData]);

  return filteredData;
}

export interface State {
  sensorId: string;
  tab: string;
  filtersOpen: boolean;
}

export const DataDisplay = ({
  tabId,
  getSensorData,
  sensorData
}: {
  tabId: string;
  getSensorData: any;
  sensorData: any;
}) => {
  const { searchData } = useUpdateSearchData();
  const { sensors, locations, selectedFromDate, selectedToDate } = useMemo(
    () => searchData,
    [searchData]
  );

  const [state, update] = React.useState<State>({
    sensorId: sensors[0]?.id,
    tab: tabId,
    filtersOpen: true
  });

  const [activeFilters, setActiveFilter] = React.useState<
    { [K in SensorDataKey]?: string }
  >(INITIAL_FILTER_STATE);
  const [data, setData] = useState<any[]>([]);

  // todo: doesn't make needed requests, fix with requests in child components
  useEffect(() => {
    if (locations?.length > 0) {
      locations.map(l =>
        getSensorData({
          variables: {
            sensorId: l.id,
            from: moment(selectedFromDate, "YYYY-MM-DDTHH:mm:ss"),
            to: moment(selectedToDate, "YYYY-MM-DDTHH:mm:ss")
          }
        })
      );
    }
  }, [locations, selectedToDate, selectedFromDate, getSensorData]);

  useEffect(() => {
    if (sensorData?.data) {
      setData(
        !data.includes(sensorData.data)
          ? data.concat(sensorData?.data).filter(i => i)
          : data
      );
    }
  }, [sensorData]);

  const filteredData = useFilters(sensorData?.data?.sensorData, activeFilters);

  const tabProps: SensorDataConsumer = {
    sensorData: filteredData,
    loading: sensorData?.loading || !filteredData
  };

  const disableFilter = !(sensorData?.data?.sensorData.length > 0);
  const countAppliedFilters = Object.values(activeFilters).filter(
    value => !!value
  ).length;

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    update({ ...state, tab: newValue });
  };

  return (
    <div>
      {!disableFilter && (
        <Collapse in={state.filtersOpen}>
          <DataFilters
            sensorData={sensorData.data.sensorData}
            activeFilters={activeFilters}
            setActiveFilter={setActiveFilter}
          />
        </Collapse>
      )}
      <Tabs
        value={state.tab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={<Trans>Table</Trans>}
          aria-label="Tables"
          value={TabIds.tables}
        />
        <Tab
          label={<Trans>Charts</Trans>}
          aria-label="Charts"
          value={TabIds.charts}
        />
        <Tab
          label={<Trans>Export</Trans>}
          aria-label="Export"
          value={TabIds.export}
        />
      </Tabs>
      {state.tab === TabIds.tables && <Table {...tabProps} />}
      {state.tab === TabIds.charts && <ChartTab {...tabProps} />}
      {state.tab === TabIds.export && <ExportTab {...tabProps} />}
    </div>
  );
};
