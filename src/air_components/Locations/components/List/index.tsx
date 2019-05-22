import React from "react";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Tabs,
  Tab,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";

import { TableChart, ShowChart, ExpandMore } from "@material-ui/icons";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "50%",
      margin: theme.spacing(1),
      overflow: "scroll"
    },
    panel: {},
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4)
    },
    details: {
      display: "flex",
      justifyContent: "center"
    }
  });

interface Props extends WithStyles {
  data: any;
}

export const List = withStyles(styles)(({ data, classes }: Props) => {
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      {data.sensors!.map((sensor: any, key: number) => (
        <ExpansionPanel key={key} className={classes.panel}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.heading}>{sensor!.code}</Typography>
            <Typography variant={"subtitle2"}>
              lat: {sensor!.latitude} , lng: {sensor!.longitude}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<TableChart />} aria-label="Tables" />
              <Tab icon={<ShowChart />} aria-label="Charts" />
            </Tabs>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
});
