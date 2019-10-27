import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  Container,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Theme
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Error } from "src/components/Error";
import { Loading } from "src/components/LoadingState";
import { QueryInterface } from "types/queryInterface";
import { SensorListQuery } from "src/generated/graphql";

import { SensorInfo } from "../SensorInfo/SensorInfo";
import { DataTable } from "../DataTable";
import { ChartTab } from "../../../CartsTab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        height: "50vh"
      }
    },
    select: {
      maxWidth: 200,
      margin: theme.spacing(1),
      display: "flex",
      flexGrow: 1
    },
    selectorContainer: {
      marginTop: theme.spacing(3),
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: 0
    }
  })
);

const GET_SENSOR_LIST = gql`
  query SensorList {
    sensors {
      code
      id
    }
  }
`;

export const SelectMenu = () => {
  const classes = useStyles({});
  const { data, loading, error }: QueryInterface<SensorListQuery> = useQuery(
    GET_SENSOR_LIST
  );

  const [state, update] = React.useState({
    sensorId: "5ce6d500659d5e1303f3ac6a",
    tab: 0,
    selectedFromDate: new Date(),
    selectedToDate: new Date()
  });

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
  function handleFromDateChange(date: Date | null) {
    update({ ...state, selectedFromDate: date });
  }
  function handleToDateChange(date: Date | null) {
    update({ ...state, selectedToDate: date });
  }
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.selectorContainer}>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="sensor">Select sensor</InputLabel>
          <Select
            value={state.sensorId}
            onChange={handleSensorChange}
            inputProps={{ name: "sensor", id: "sensor" }}
          >
            {data.sensors.map(sensor => (
              <MenuItem value={sensor!.id}>{sensor!.code}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            label="From"
            value={state.selectedFromDate}
            onChange={handleFromDateChange}
            className={classes.select}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="To"
              value={state.selectedToDate}
              onChange={handleToDateChange}
              className={classes.select}
            />
          </MuiPickersUtilsProvider>
        </MuiPickersUtilsProvider>
      </Container>
      <SensorInfo id={state.sensorId} />
      <Tabs
        value={state.tab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={"Tables"} aria-label="Tables" />
        <Tab label={"Charts"} aria-label="Charts" />
      </Tabs>
      {state.tab === 0 && (
        <DataTable
          id={state.sensorId}
          from={state.selectedFromDate}
          to={state.selectedToDate}
        />
      )}
      {state.tab === 1 && (
        <ChartTab
          id={state.sensorId}
          from={state.selectedFromDate}
          to={state.selectedToDate}
        />
      )}
    </div>
  );
};
