import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "94vh"
    }
  });

interface Props extends WithStyles {
  children: React.ReactNode;
}

export const ScreenWrapper = withStyles(styles)(
  ({ classes, children }: Props) => (
    <div className={classes.root}>{children}</div>
  )
);
