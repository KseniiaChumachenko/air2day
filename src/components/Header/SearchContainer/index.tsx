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
  const query = useRouterParamsQuery();
  const classes = useStyles();
  const history = useHistory();

  const [locations, setLocations] = React.useState<PlaceType[]>(
    /*query.get(LocationParams.locations) ||*/ []
  );
  const [dates, setDates] = React.useState<State>(
    /*JSON.parse(query.get(LocationParams.dates)) || */ {
      selectedFromDate: moment()
        .subtract(1, "month")
        .format(),
      selectedToDate: moment().format()
    }
  );

  function handleFromDateChange(date: Moment) {
    setDates({ ...dates, selectedFromDate: date.format() });
  }
  function handleToDateChange(date: Moment) {
    setDates({ ...dates, selectedToDate: date.format() });
  }

  const commonPickerProps = {
    variant: "inline" as any,
    ampm: false,
    className: classes.select,
    format: "DD/MM/YYYY"
  };

  // TODO: export route composition to avoid mistakes?
  // locations to be joined ?
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
          value={dates.selectedFromDate}
          onChange={handleFromDateChange}
          {...commonPickerProps}
        />
        <KeyboardDatePicker
          label={<Trans>End date</Trans>}
          value={dates.selectedToDate}
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
