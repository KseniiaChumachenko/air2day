import React, { useEffect } from "react";
import { Collapse, Tab, Tabs } from "@material-ui/core";
import {
  Sensor,
  SensorData,
  useDataTableQuery
} from "src/graphql/generated/graphql";
import moment, { Moment } from "moment";
import Table from "./components/TableTab";
import ChartTab from "./components/CartsTab";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import { SensorDataPickers, State } from "./components/SensorDataPickers";
import { DataFilters } from "./components/DataFilters";
import { SensorDataConsumer } from "./model";
import { ExportTab } from "./components/ExportTab";

export type SensorDataKey = keyof SensorData;

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

export const SelectMenu = ({ sensorList, tabId }: { sensorList: Sensor[], tabId: string }) => {
  const [state, update] = React.useState<State>({
    sensorId: sensorList[0].id,
    tab: tabId,
    selectedFromDate: moment()
      .subtract(1, "month")
      .format(),
    selectedToDate: moment().format(),
    filtersOpen: false
  });

  const [confirmed, handleConfirm] = React.useState<State>(state);

  const sensorData = useDataTableQuery({
    variables: {
      sensorId: confirmed.sensorId,
      from: confirmed.selectedFromDate,
      to: confirmed.selectedToDate
    },
    fetchPolicy: "no-cache"
  });

  const [activeFilters, setActiveFilter] = React.useState<
    { [K in SensorDataKey]?: string }
  >(INITIAL_FILTER_STATE);

  const filteredData = useFilters(sensorData?.data?.sensorData, activeFilters);

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: string) {
    update({ ...state, tab: newValue });
  }
  function handleSensorChange(
    event: React.ChangeEvent<{ value: unknown; name?: unknown }>
  ) {
    update({
      ...state,
      sensorId: event.target.value as string
    });
  }
  function handleFromDateChange(date: Moment) {
    update({ ...state, selectedFromDate: date.format() });
  }
  function handleToDateChange(date: Moment) {
    update({ ...state, selectedToDate: date.format() });
  }
  function handleFiltersOpen() {
    update(prevState => {
      return { ...prevState, filtersOpen: !prevState.filtersOpen };
    });
  }

  const tabProps: SensorDataConsumer = {
    sensorData: filteredData,
    loading: sensorData?.loading || !filteredData
  };

  const disableFilter = !(sensorData?.data?.sensorData.length > 0);
  const countAppliedFilters = Object.values(activeFilters).filter(
    value => !!value
  ).length;

  return (
    <div>
      {filteredData && (
        <>
          <SensorDataPickers
            state={state}
            handleConfirm={handleConfirm}
            handleFromDateChange={handleFromDateChange}
            handleToDateChange={handleToDateChange}
            handleSensorChange={handleSensorChange}
            handleFiltersOpen={handleFiltersOpen}
            sensorList={sensorList}
            disabled={disableFilter}
            countAppliedFilters={countAppliedFilters}
          />
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
              label={<FormattedMessage {...messages.tableTabLabel} />}
              aria-label="Tables"
              value={"tables"}
            />
            <Tab
              label={<FormattedMessage {...messages.chartTabLabel} />}
              aria-label="Charts"
              value={"charts"}
            />
            <Tab
              label={<FormattedMessage {...messages.exportTabLabel} />}
              aria-label="Export"
              value={"export"}
            />
          </Tabs>
          {state.tab === "tables" && confirmed && <Table {...tabProps} />}
          {state.tab === "charts" && confirmed && <ChartTab {...tabProps} />}
          {state.tab === "export" && confirmed && <ExportTab {...tabProps} />}
        </>
      )}
    </div>
  );
};
