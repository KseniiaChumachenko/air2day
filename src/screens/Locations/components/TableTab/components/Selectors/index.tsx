import React from "react";
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
import { KeyboardDateTimePicker } from "@material-ui/pickers";

import { useSensorListQuery } from "src/graphql/generated/graphql";
import { Error } from "src/components/Error";
import { Loading } from "src/components/LoadingState";

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
      marginLeft: 0,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      padding: 0
    }
  })
);

export const SelectMenu = () => {
  const classes = useStyles({});
  const { data, loading, error } = useSensorListQuery();

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
        <KeyboardDateTimePicker
          label="From"
          variant={"inline"}
          value={state.selectedFromDate}
          onChange={handleFromDateChange}
          className={classes.select}
          format="yyyy/MM/dd HH:mm"
        />
        <KeyboardDateTimePicker
          label="To"
          variant={"inline"}
          value={state.selectedToDate}
          onChange={handleToDateChange}
          className={classes.select}
          format="yyyy/MM/dd HH:mm"
        />
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
