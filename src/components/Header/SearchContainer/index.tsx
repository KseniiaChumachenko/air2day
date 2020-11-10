import React from "react";
import moment, { Moment } from "moment";
import { Button, makeStyles } from "@material-ui/core";
import { Autocomplete } from "./Autocomplete";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Trans } from "@lingui/macro";
import { PlaceType } from "./Autocomplete/model";
import { useHistory } from "react-router-dom";
import { LocationParams } from "../../../screens/Locations/model";
import { useRouterParamsQuery } from "../../../hooks/useRouterParamsQuery";

export const QUERY_PARAMS = [LocationParams.locations, LocationParams.dates];

const formatDate = (date: string | Moment) =>
  moment(date, "YYYY-MM-DDTHH:mm:ss").format("YYYY/MMM/DD");

const useStyles = makeStyles(theme => ({
  searchContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 1200,
    width: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "unset"
    }
  },
  selectorsContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  autocomplete: {
    width: "100%",
    maxWidth: 500
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 140,
    maxWidth: 140,
    display: "flex",
    flexGrow: 1
  },

  scaledButton: {
    margin: "auto"
  }
}));

export interface State {
  selectedFromDate: string;
  selectedToDate: string;
}

export const SearchContainer = () => {
  const paramsQuery = useRouterParamsQuery(QUERY_PARAMS);
  const classes = useStyles();
  const history = useHistory();

  const [locations, setLocations] = React.useState<PlaceType[]>(
    paramsQuery?.locations || []
  );
  const [dates, setDates] = React.useState<State>(
    paramsQuery?.dates || {
      selectedFromDate: moment()
        .subtract(1, "month")
        .format(),
      selectedToDate: moment().format()
    }
  );

  const handleFromDateChange = (date: Moment) =>
    setDates({ ...dates, selectedFromDate: date.format() });

  const handleToDateChange = (date: Moment) =>
    setDates({ ...dates, selectedToDate: date.format() });

  const commonPickerProps = {
    variant: "inline" as any,
    ampm: false,
    className: classes.select,
    format: "DD/MM/YYYY"
  };

  const handleSearch = () =>
    history.push(
      `/locations?${LocationParams.locations}="${JSON.stringify(locations)}"&${
        LocationParams.dates
      }="${JSON.stringify(dates)}"`
    );

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        value={locations}
        setValue={setLocations}
        className={classes.autocomplete}
      />
      <div className={classes.selectorsContainer}>
        <KeyboardDatePicker
          label={<Trans>Start date</Trans>}
          value={formatDate(dates.selectedFromDate)}
          onChange={handleFromDateChange}
          {...commonPickerProps}
        />
        <KeyboardDatePicker
          label={<Trans>End date</Trans>}
          value={formatDate(dates.selectedToDate)}
          onChange={handleToDateChange}
          {...commonPickerProps}
        />
        <Button
          color={"primary"}
          variant={"contained"}
          className={classes.scaledButton}
          onClick={handleSearch}
        >
          <Trans>Search</Trans>
        </Button>
      </div>
    </div>
  );
};
