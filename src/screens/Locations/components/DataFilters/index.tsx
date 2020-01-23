import React from "react";
import { FormattedMessage } from "react-intl";
import omit from "lodash.omit";
import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme
} from "@material-ui/core";
import { SensorDataConsumer } from "../../model";
import { INITIAL_FILTER_STATE, SensorDataKey } from "../../SelectionFlow";
import messages from "./messages";

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
      marginLeft: 0,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      padding: 0
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
      {keysToMap.map((key, index) => {
        const filterItems = [...new Set(sensorData?.map(data => data[key]))]; // ind. values for filter
        return (
          <FormControl className={classes.select} key={index}>
            <InputLabel htmlFor={key}>
              {/* TODO: localization for generic filters is not generic enough */}
              <FormattedMessage {...(messages as any)[key]} />
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
                  <FormattedMessage {...messages.selectorEmptyState} />
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
        <FormattedMessage {...messages.clearFiltersButtonLabel} />
      </Button>
    </div>
  );
};
