import React, { ReactNode } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import useStyles from "./styles";

export const DefaultDashboardCard = ({
  data,
  message,
  action
}: {
  data?: ReactNode;
  message: ReactNode;
  action?: ReactNode;
}) => {
  const classes = useStyles();

  return (
    <Grid item md={6}>
      <Card className={classes.root}>
        {data && (
          <CardContent className={classes.media}>
            <Typography variant={"h3"}>{data}</Typography>
          </CardContent>
        )}
        <CardContent className={classes.content}>{message}</CardContent>
        {action && (
          <CardActions className={classes.cardActions}>{action}</CardActions>
        )}
      </Card>
    </Grid>
  );
};
