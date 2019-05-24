import React from "react";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  Container,
  Tabs,
  Tab
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { SensorListComponent } from "../../../../../../generated/graphql";
import { ErrorBanner, Loading } from "../../../../../components";
import { SensorInfo } from "../SensorInfo/SensorInfo";
import { DataTable } from "../DataTable";
import { ChartTab } from "../../../CartsTab";

const styles = (theme: Theme) =>
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
  });

export const SelectMenu = withStyles(styles)(
  ({ classes }: WithStyles<typeof styles>) => {
    const [value, setValue] = React.useState(0);

    function handleTabChange(event: React.ChangeEvent<{}>, newValue: number) {
      setValue(newValue);
    }

    const [values, setValues] = React.useState({
      id: "5ce6d500659d5e1303f3ac6a"
    });

    function handleChange(
      event: React.ChangeEvent<{ value: unknown; name?: unknown }>
    ) {
      setValues({
        id: event.target.value as string
      });
    }

    const [selectedFromDate, setSelectedFromDate] = React.useState<Date | null>(
      new Date()
    );

    const [selectedToDate, setSelectedToDate] = React.useState<Date | null>(
      new Date()
    );

    function handleFromDateChange(date: Date | null) {
      setSelectedFromDate(date);
    }
    function handleToDateChange(date: Date | null) {
      setSelectedToDate(date);
    }

    return (
      <SensorListComponent>
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <ErrorBanner />;
          }
          if (data) {
            return (
              <div className={classes.root}>
                <Container className={classes.selectorContainer}>
                  <FormControl className={classes.select}>
                    <InputLabel htmlFor="sensor">Select sensor</InputLabel>
                    <Select
                      value={values.id}
                      onChange={handleChange}
                      inputProps={{ name: "sensor", id: "sensor" }}
                    >
                      {data.sensors!.map(sensor => (
                        <MenuItem value={sensor!.id}>{sensor!.code}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      label="From"
                      value={selectedFromDate}
                      onChange={handleFromDateChange}
                      className={classes.select}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        label="To"
                        value={selectedToDate}
                        onChange={handleToDateChange}
                        className={classes.select}
                      />
                    </MuiPickersUtilsProvider>
                  </MuiPickersUtilsProvider>
                </Container>
                <SensorInfo id={values.id} />
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label={"Tables"} aria-label="Tables" />
                  <Tab label={"Charts"} aria-label="Charts" />
                </Tabs>
                {value === 0 && (
                  <DataTable
                    id={values.id}
                    from={selectedFromDate}
                    to={selectedToDate}
                  />
                )}
                {value === 1 && (
                  <ChartTab
                    id={values.id}
                    from={selectedFromDate}
                    to={selectedToDate}
                  />
                )}
              </div>
            );
          }
        }}
      </SensorListComponent>
    );
  }
);
