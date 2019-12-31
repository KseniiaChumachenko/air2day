import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import { Tab, Tabs, Typography, Grid } from "@material-ui/core";

import useStyles from "./styles";
import messages from "./messages";

export const NavBar = () => {
  const history = useHistory();
  const location = useLocation();

  const [value, update] = useState<string>(location.pathname);
  const classes = useStyles({});

  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    update(value);
    history.push(value);
  };

  return (
    <Grid item xs={12} className={classes.grid}>
      <div className={classes.appBar}>
        <Typography
          className={classes.title}
          color="inherit"
          onClick={() => {
            update("/");
            history.push("/");
          }}
        >
          <FormattedMessage {...messages.title} />
        </Typography>
        <div className={classes.grow} />
        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
          <Tab label={<FormattedMessage {...messages.home} />} value="/" />
          <Tab
            label={<FormattedMessage {...messages.locations} />}
            value="/locations"
          />
        </Tabs>
      </div>
    </Grid>
  );
};
