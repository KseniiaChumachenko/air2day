import React, { SetStateAction } from "react";
import { Trans } from "@lingui/macro";
import {
  createStyles,
  FormControl,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Typography
} from "@material-ui/core";
import { TableChartOutlined, ShowChartOutlined } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import { UseRemappedDataResults } from "../../model";
import { ViewModes } from "../DataCard";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: theme.spacing(2)
    },
    title: {
      display: "flex",
      alignSelf: "center"
    },
    desc: {
      marginBottom: theme.spacing(2)
    },
    actions: {
      display: "flex"
    },
    selectHourAvg: {
      width: 120,
      marginRight: theme.spacing(2)
    }
  })
);

interface HeaderProps extends Pick<UseRemappedDataResults, "hourAvgs"> {
  title: React.ReactNode;
  description: React.ReactNode;
  hourAvg: number;
  setHourAvg: React.Dispatch<SetStateAction<number>>;
  viewMode: ViewModes;
  setViewMode: React.Dispatch<SetStateAction<ViewModes>>;
}

export const Header = ({
  title,
  description,
  hourAvgs,
  hourAvg,
  setHourAvg,
  viewMode,
  setViewMode
}: HeaderProps) => {
  const classes = useStyles({});

  const handleHourAvgChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setHourAvg(event.target.value as number);
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: ViewModes | null
  ) => {
    setViewMode(newAlignment);
  };
  return (
    <div>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6" component="div">
          <Trans>{title}</Trans>
        </Typography>

        <div className={classes.actions}>
          <FormControl className={classes.selectHourAvg}>
            <InputLabel>
              <Trans>Per hour average</Trans>
            </InputLabel>
            <Select value={hourAvg} onChange={handleHourAvgChange}>
              {hourAvgs.map((h, index) => (
                <MenuItem value={h} key={index}>
                  {h}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ToggleButtonGroup
            onChange={handleViewModeChange}
            value={viewMode}
            exclusive
          >
            <ToggleButton value={ViewModes.chart}>
              <ShowChartOutlined />
            </ToggleButton>
            <ToggleButton value={ViewModes.table}>
              <TableChartOutlined />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <Typography variant={"body1"} className={classes.desc}>
        {description}&nbsp;
        <Link href={"http://airqualitynow.eu"} target={"_blank"}>
          <Trans>[Source]</Trans>
        </Link>
      </Typography>
    </div>
  );
};
