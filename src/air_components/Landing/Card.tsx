import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      margin: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto"
    },
    media: {
      height: 140,
      fontSize: 80,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      color: theme.palette.error.light
    }
  });

interface CardViewProps extends WithStyles<typeof styles> {
  media: React.ReactNode;
  text: React.ReactNode;
}

export const CardView = withStyles(styles)(
  ({ text, media, classes }: CardViewProps) => {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.media}>{media}</CardContent>
        <Divider />
        <CardContent>
          <Typography>{text}</Typography>
        </CardContent>
      </Card>
    );
  }
);
