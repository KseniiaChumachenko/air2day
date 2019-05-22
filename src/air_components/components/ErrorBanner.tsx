import React from "react";

import {
  Paper,
  Typography,
  withStyles,
  WithStyles,
  createStyles
} from "@material-ui/core";

import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    },
    header: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(6),
      marginRight: theme.spacing(6),
      color: theme.palette.primary.main
    },
    message: {
      marginBottom: theme.spacing(3)
    }
  });

interface ErrorBannerProps extends WithStyles {}

const SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
  >
    <path d=" M 200 117.25 C 200 95.25 182.917 77.417 161.25 75.917 C 155.583 47.167 130.333 25.583 100 25.583 C 88.917 25.583 78.583 28.583 69.583 33.667 L 82 46.083 C 87.583 43.667 93.583 42.25 100 42.25 C 125.333 42.25 145.833 62.75 145.833 88.083 L 145.833 92.25 L 158.333 92.25 C 172.167 92.25 183.333 103.417 183.333 117.25 C 183.333 125.5 179.333 132.667 173.25 137.25 L 185 149 C 194.083 141.333 200 130.083 200 117.25 Z  M 36.75 24.417 L 25 36.167 L 48.083 59.25 L 44.583 59.25 C 19.5 61.917 0 83.167 0 108.917 C 0 136.5 22.417 158.917 50 158.917 L 147.75 158.917 L 164.417 175.583 L 176.167 163.833 L 36.75 24.417 Z  M 50 142.25 C 31.583 142.25 16.667 127.333 16.667 108.917 C 16.667 90.5 31.583 75.583 50 75.583 L 64.417 75.583 L 131.083 142.25 L 50 142.25 Z " />
  </svg>
);

export const ErrorBanner = withStyles(styles)(
  ({ classes }: ErrorBannerProps) => (
    <Paper className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Sorry, something went wrong...
      </Typography>
      {SVG}
      <Typography variant="subtitle1" className={classes.message}>
        An unexpected error has occurred. <br /> Please, try again!
      </Typography>
    </Paper>
  )
);
