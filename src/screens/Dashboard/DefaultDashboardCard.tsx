import React, { ReactNode } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardProps,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import useStyles from "./styles";
interface P extends CardProps {
  data?: ReactNode;
  message: ReactNode;
  action?: ReactNode;
}
export const DefaultDashboardCard = ({
  data,
  message,
  action,
  ...restProps
}: P) => {
  const classes = useStyles();

  return (
    <Grid item md={6}>
      <Card
        className={classes.root}
        square={true}
        variant={"outlined"}
        elevation={0}
        {...restProps}
      >
        {data && (
          <CardContent className={classes.media}>
            <Typography variant={"h3"}>{data}</Typography>
          </CardContent>
        )}
        <CardContent classes={{ root: classes.content }}>{message}</CardContent>
        {action && (
          <CardActions className={classes.cardActions}>{action}</CardActions>
        )}
      </Card>
    </Grid>
  );
};
