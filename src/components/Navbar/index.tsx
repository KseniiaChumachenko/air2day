import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import {
  Tab,
  Tabs,
  Typography,
  useTheme,
  IconButton
} from "@material-ui/core";
import { EmojiObjectsOutlined, EmojiObjects } from "@material-ui/icons";

import useStyles from "./styles";
import messages from "./messages";

export const NavBar = ({ setTheme }: { setTheme: any }) => {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();

  const [value, update] = useState<string>(location.pathname);
  const classes = useStyles({});

  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    update(value);
    history.push(value);
  };

  const handleThemeChange = () => setTheme((prevState: any) => !prevState);

  return (
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
      <IconButton onClick={handleThemeChange} className={classes.themeSwitch}>
        {theme.palette.type === "light" ? (
          <EmojiObjectsOutlined />
        ) : (
          <EmojiObjects />
        )}
      </IconButton>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor={"primary"}>
        <Tab label={<FormattedMessage {...messages.home} />} value="/" />
        <Tab
          label={<FormattedMessage {...messages.locations} />}
          value="/locations"
        />
      </Tabs>
    </div>
  );
};
