import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import moment, { Moment } from "moment";
import { Button, makeStyles } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Trans } from "@lingui/macro";
import { useUpdateSearchData } from "src/store/SearchDataProvider";
import { Autocomplete } from "./Autocomplete";
import { redirectQueryComposer } from "../../../utils/redirectQueryComposer";

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

  const { searchData, setToDate, setFromDate } = useUpdateSearchData();

  const { locations, selectedToDate, selectedFromDate } = useMemo(
    () => searchData,
    [searchData]
  );

  const handleFromDateChange = (date: Moment) => setFromDate(date.format());

  const handleToDateChange = (date: Moment) => setToDate(date.format());

  const commonPickerProps = {
    variant: "inline" as any,
    ampm: false,
    className: classes.select,
    format: "DD/MM/YYYY"
  };

  const handleSearch = () =>
    redirectQueryComposer(history, locations, selectedFromDate, selectedToDate);

  return (
    <div className={classes.searchContainer}>
      <Autocomplete className={classes.autocomplete} />
      <div className={classes.selectorsContainer}>
        <KeyboardDatePicker
          label={<Trans>Start date</Trans>}
          value={formatDate(selectedFromDate)}
          onChange={handleFromDateChange}
          {...commonPickerProps}
        />
        <KeyboardDatePicker
          label={<Trans>End date</Trans>}
          value={formatDate(selectedToDate)}
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
