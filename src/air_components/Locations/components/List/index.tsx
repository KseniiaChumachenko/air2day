import React from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TableChart, ShowChart } from "@material-ui/icons";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "50%",
      margin: theme.spacing(1),
      overflow: 'scroll',
    },
    panel: {
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4)
    },
    details: {
      display: 'flex',
      justifyContent: 'center',
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
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
