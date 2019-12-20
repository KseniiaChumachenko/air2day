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
      marginTop: theme.spacing(2),
      marginBottom:theme.spacing(4),
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

      color: theme.palette.primary.main
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
