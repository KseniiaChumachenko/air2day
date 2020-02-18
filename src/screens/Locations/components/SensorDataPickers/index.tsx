import React from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import {
  Badge,
  Button,
  Container,
  createStyles,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Theme,
  Typography
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import messages from "./messages";
import { Sensor } from "../../../../graphql/generated/graphql";
import { Moment } from "moment";

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
    },
    spacer: {
      flexGrow: 1
    }
  })
);

export interface State {
  sensorId: string;
  tab: string;
  selectedFromDate: string;
  selectedToDate: string;
  filtersOpen: boolean;
}

interface Props {
  state: State;
  handleFromDateChange(date: Moment): void;
  handleToDateChange(date: Moment): void;
  handleSensorChange(
    event: React.ChangeEvent<{ value: unknown; name?: unknown }>
  ): void;
  sensorList: Sensor[];
  handleConfirm: React.Dispatch<React.SetStateAction<State>>;
  handleFiltersOpen(): void;
  disabled: boolean;
  countAppliedFilters: number;
}

export const SensorDataPickers = ({
  state,
  handleFromDateChange,
  handleToDateChange,
  handleSensorChange,
  sensorList,
  handleConfirm,
  handleFiltersOpen,
  disabled,
  countAppliedFilters
}: Props) => {
  const classes = useStyles({});

  const commonPickerProps = {
    variant: "inline" as any,
    ampm: false,
    className: classes.select,
    format: "DD/MM/YYYY HH:mm"
  };

  return (
    <Container className={classes.selectorContainer}>
      <KeyboardDateTimePicker
        label={<FormattedMessage {...messages.fromDateTimePickerLabel} />}
        value={state.selectedFromDate}
        onChange={handleFromDateChange}
        {...commonPickerProps}
      />
      <KeyboardDateTimePicker
        label={<FormattedMessage {...messages.toDateTimePickerLabel} />}
        value={state.selectedToDate}
        onChange={handleToDateChange}
        {...commonPickerProps}
      />
      <FormControl className={classes.select}>
        <InputLabel htmlFor="sensor">
          <FormattedMessage {...messages.selectSensorLabel} />
        </InputLabel>
        <Select
          value={state.sensorId}
          onChange={handleSensorChange}
          inputProps={{ name: "sensor", id: "sensor" }}
        >
          {sensorList.map((sensor, key) => (
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
        <FormattedMessage {...messages.applyButtonLabel} />
      </Button>
      <div className={classes.spacer} />

      <FormControlLabel
        control={
          <Switch
            checked={state.filtersOpen}
            onChange={handleFiltersOpen}
            color="primary"
            disabled={disabled}
          />
        }
        label={
          <Badge badgeContent={countAppliedFilters} color={"primary"}>
            <Typography color={"textPrimary"}>
              <FormattedMessage {...messages.addFiltersCheckboxLabel} />
            </Typography>
          </Badge>
        }
      />
    </Container>
  );
};
