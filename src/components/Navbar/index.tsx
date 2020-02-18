import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { Tab, Tabs, useTheme, IconButton } from "@material-ui/core";
import { EmojiObjectsOutlined, EmojiObjects } from "@material-ui/icons";

import useStyles from "./styles";
import logo from "./assets/Combined_logo.svg";

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
      <img src={logo} alt={"logo"} className={classes.logo} />
      <div className={classes.grow} />
      <IconButton onClick={handleThemeChange} className={classes.themeSwitch}>
        {theme.palette.type === "light" ? (
          <EmojiObjectsOutlined />
        ) : (
          <EmojiObjects />
        )}
      </IconButton>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor={"primary"}
      >
        <Tab label={<Trans>Home</Trans>} value="/" />
        <Tab label={<Trans>Locations</Trans>} value="/locations" />
      </Tabs>
    </div>
  );
};
