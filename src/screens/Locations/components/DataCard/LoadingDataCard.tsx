import React from "react";
import { useStyles } from "./styles";
import { useStyles as useHeaderStyles } from "../Header";
import { Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export const LoadingDataCard = () => {
  const classes = useStyles();
  const headerClasses = useHeaderStyles();
  return (
    <Paper className={classes.root}>
      <div className={headerClasses.header}>
        <Skeleton variant={"text"} height={32} width={200} />
        <div className={headerClasses.actions}>
          <Skeleton variant={"rect"} height={48} width={120} />
          <Skeleton variant={"rect"} height={48} width={95} />
        </div>
      </div>
      <div className={headerClasses.desc}>
        <Skeleton variant={"text"} height={24} width={"100%"} />
        <Skeleton variant={"text"} height={24} width={"100%"} />
        <Skeleton variant={"text"} height={24} width={"60%"} />
      </div>
      <Skeleton variant={"rect"} height={550} width={"100%"} />
    </Paper>
  );
};
