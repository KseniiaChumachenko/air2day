import React from "react";
import {
  Button,
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

import { useSensorsQuery } from "src/graphql/generated/graphql";
import { DataTable } from "../DataTable";
import { ChartTab } from "../../../CartsTab";
import moment, { Moment } from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("sm")]: {
        height: "50vh"
      }
    },
    select: {
      maxWidth: 220,
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
    },
    confirmButton: {
      margin: `auto ${theme.spacing(2)}px`
    }
  })
);

export const SelectMenu = ({ initialID }: { initialID?: string }) => {
  const classes = useStyles({});
  const { data } = useSensorsQuery({
    fetchPolicy: "cache-first"
  });

  const [state, update] = React.useState({
    sensorId: initialID,
    tab: 0,
    selectedFromDate: moment()
      .subtract(1, "month")
      .format(),
    selectedToDate: moment().format()
  });
  const [confirmed, handleConfirm] = React.useState(state);

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

  return (
    <div className={classes.root}>
      <Container className={classes.selectorContainer}>
        <KeyboardDateTimePicker
          label="From"
          variant={"inline"}
          ampm={false}
          value={state.selectedFromDate}
          onChange={handleFromDateChange}
          className={classes.select}
          format="DD/MM/YYYY HH:mm"
        />
        <KeyboardDateTimePicker
          label="To"
          variant={"inline"}
          ampm={false}
          value={state.selectedToDate}
          onChange={handleToDateChange}
          className={classes.select}
          format="DD/MM/YYYY HH:mm"
        />
        <FormControl className={classes.select}>
          <InputLabel htmlFor="sensor">Select sensor</InputLabel>
          <Select
            value={state.sensorId}
            onChange={handleSensorChange}
            inputProps={{ name: "sensor", id: "sensor" }}
          >
            {data?.sensors.map((sensor, key) => (
              <MenuItem value={sensor!.id} key={key}>
                {sensor!.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() => handleConfirm(state)}
          className={classes.confirmButton}
          variant="contained"
          color="primary"
        >
          Apply
        </Button>
      </Container>
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
      {state.tab === 0 && confirmed && (
        <DataTable
          id={confirmed.sensorId}
          from={confirmed.selectedFromDate}
          to={confirmed.selectedToDate}
        />
      )}
      {state.tab === 1 && confirmed && (
        <ChartTab
          id={confirmed.sensorId}
          from={confirmed.selectedFromDate}
          to={confirmed.selectedToDate}
        />
      )}
    </div>
  );
};
