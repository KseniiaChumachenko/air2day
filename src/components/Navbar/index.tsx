import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";

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
    <div className={classes.root}>
      <AppBar position="static" color={"primary"} className={classes.appBar}>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
          onClick={() => {
            update("/");
            history.push('/');
          }}
        >
          <FormattedMessage {...messages.title} />
        </Typography>
        <div className={classes.grow} />
        <Tabs value={value} onChange={handleChange}>
          <Tab label={<FormattedMessage {...messages.home} />} value="/" />
          <Tab
            label={<FormattedMessage {...messages.locations} />}
            value="/locations"
          />
        </Tabs>
      </AppBar>
    </div>
  );
};
