import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      overflow: "scroll",
      background: theme.palette.background.default
    }
  })
);

interface Props {
  children: React.ReactNode;
}

export const ScrollableContainer = ({ children }: Props) => {
  const classes = useStyles({});
  return <div className={classes.container}>{children}</div>;
};
