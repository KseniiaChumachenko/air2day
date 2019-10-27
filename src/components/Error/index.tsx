import React from "react";
import { FormattedHTMLMessage } from "react-intl";

import {
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import cloud_img from "./cloud_img.svg";
import messages from "./messages";

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

interface ErrorBannerProps extends WithStyles {
  message?: string;
}

export const Error = withStyles(styles)(
  ({ classes, message }: ErrorBannerProps) => (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        <FormattedHTMLMessage {...messages.title} />
      </Typography>
      <img src={cloud_img} alt={"error_icon"} />
      <Typography variant="subtitle1" className={classes.message}>
        {message}
      </Typography>
    </div>
  )
);
