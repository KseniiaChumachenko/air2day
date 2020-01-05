import React, { useEffect } from "react";
import { mapKeys } from "lodash";
import {
  Collapse,
  createStyles,
  FormControlLabel,
  makeStyles,
  Switch,
  Tab,
  Tabs,
  Theme
} from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        height: "50vh"
      }
    }
  })
);

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

export const SelectMenu = ({ sensorList }: { sensorList?: Sensor[] }) => {
  const classes = useStyles({});

  const [state, update] = React.useState<State>({
    sensorId: sensorList[0].id,
    tab: 0,
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

  function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
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

  return (
    <div className={classes.root}>
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
          />
          <Collapse in={state.filtersOpen}>
            <DataFilters
              sensorData={sensorData?.data?.sensorData}
              loading={sensorData?.loading || !sensorData?.data?.sensorData}
              activeFilters={activeFilters}
              setActiveFilter={setActiveFilter}
            />
          </Collapse>
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
            />
            <Tab
              label={<FormattedMessage {...messages.chartTabLabel} />}
              aria-label="Charts"
            />
          </Tabs>
          {state.tab === 0 && confirmed && <Table {...tabProps} />}
          {state.tab === 1 && confirmed && <ChartTab {...tabProps} />}
        </>
      )}
    </div>
  );
};
