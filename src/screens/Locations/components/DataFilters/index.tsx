import React from "react";
import { Trans } from "@lingui/macro";
import omit from "lodash.omit";
import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography
} from "@material-ui/core";
import { SensorDataConsumer } from "../../model";
import { INITIAL_FILTER_STATE, SensorDataKey } from "../../SelectionFlow";

const messages = {
  from: <Trans>From</Trans>,
  to: <Trans>To</Trans>,
  pollutant: <Trans>Pollutant</Trans>,
  hourAvg: <Trans>Per hour average</Trans>,
  value: <Trans>Value</Trans>
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectorContainer: {
      marginLeft: 0,
      padding: theme.spacing(2),
      minWidth: 160,

      [theme.breakpoints.down("md")]: {
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-end"
      }
    },
    select: {
      minWidth: 80,
      maxWidth: 220,
      margin: theme.spacing(1),
      display: "flex",
      flexGrow: 1
    },
    clearAllButton: {
      margin: "auto auto 0"
    }
  })
);

type ActiveFilters = { [K in SensorDataKey]?: string };

interface Props extends SensorDataConsumer {
  activeFilters: ActiveFilters;
  setActiveFilter: React.Dispatch<React.SetStateAction<ActiveFilters>>;
}

export const DataFilters = ({
  sensorData,
  activeFilters,
  setActiveFilter
}: Props) => {
  const classes = useStyles({});

  const keysToMap = Object.keys(sensorData[0]).filter(
    item => !(item === "__typename" || item === "id")
  ) as SensorDataKey[]; //deserves better approach i.e. TODO: generic exclude?!

  return (
    <div className={classes.selectorContainer}>
      <Typography variant={"h6"} color={"textPrimary"}>
        <Trans>Filters: </Trans>
      </Typography>
      {keysToMap.map((key, index) => {
        const filterItems = [...new Set(sensorData?.map(data => data[key]))]; // ind. values for filter
        return (
          <FormControl className={classes.select} key={index}>
            <InputLabel htmlFor={key}>
              {/* TODO: localization for generic filters is not generic enough */}
              {(messages as any)[key]}
            </InputLabel>
            <Select
              value={activeFilters[key]}
              onChange={e =>
                setActiveFilter(prevState => {
                  if (prevState[key] && prevState[key] === e.target.value) {
                    return omit(prevState, key);
                  } else {
                    return { ...prevState, [key]: e.target.value };
                  }
                })
              }
              inputProps={{ name: key, id: key }}
            >
              <MenuItem value={""}>
                <em>
                  <Trans>All</Trans>
                </em>
              </MenuItem>
              {filterItems.map((item, key) => (
                <MenuItem value={item} key={key}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      <Button
        className={classes.clearAllButton}
        color={"primary"}
        onClick={() => setActiveFilter(INITIAL_FILTER_STATE)}
      >
        <Trans>Clear all</Trans>
      </Button>
    </div>
  );
};
