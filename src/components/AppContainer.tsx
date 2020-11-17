import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("md")]: {
        display: "flex"
      },
      display: "block",
      height: "100vh",
      overflow: "hidden",
      background: theme.palette.background.default
    },
    content: {
      flexGrow: 1,
      overflow: "auto",
      height: "100%"
    }
  })
);

interface P {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: P) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <main className={classes.content}>{children}</main>
    </div>
  );
};
