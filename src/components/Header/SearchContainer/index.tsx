import React from "react";
import { useHistory } from "react-router-dom";
import moment, { Moment } from "moment";
import { Button, makeStyles } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Trans } from "@lingui/macro";
import { useUpdateSearchData } from "src/store/SearchData";
import { Autocomplete } from "./Autocomplete";
import { LocationParams } from "../../../screens/Locations/model";

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

export const SearchContainer = () => {
  const classes = useStyles();
  const history = useHistory();

  const {
    searchData,
    setToDate,
    setFromDate,
    setLocations
  } = useUpdateSearchData();

  const handleFromDateChange = (date: Moment) => setFromDate(date.format());

  const handleToDateChange = (date: Moment) => setToDate(date.format());

  const commonPickerProps = {
    variant: "inline" as any,
    ampm: false,
    className: classes.select,
    format: "DD/MM/YYYY"
  };

  const handleSearch = () =>
    history.push(
      `/locations?${LocationParams.locations}="${JSON.stringify(
        searchData.locations
      )}"&${LocationParams.dates}="${JSON.stringify({
        selectedFromDate: searchData.selectedFromDate,
        selectedToDate: searchData.selectedToDate
      })}"`
    );

  console.log(searchData);

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        value={searchData.locations}
        setValue={setLocations}
        className={classes.autocomplete}
      />
      <div className={classes.selectorsContainer}>
        <KeyboardDatePicker
          label={<Trans>Start date</Trans>}
          value={formatDate(searchData.selectedFromDate)}
          onChange={handleFromDateChange}
          {...commonPickerProps}
        />
        <KeyboardDatePicker
          label={<Trans>End date</Trans>}
          value={formatDate(searchData.selectedToDate)}
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
