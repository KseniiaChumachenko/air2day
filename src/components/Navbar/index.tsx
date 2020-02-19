import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Trans } from "@lingui/macro";
import {
  Tab,
  Tabs,
  useTheme,
  IconButton,
  MenuItem,
  Select
} from "@material-ui/core";
import { EmojiObjectsOutlined, EmojiObjects } from "@material-ui/icons";

import useStyles from "./styles";
import logo from "./assets/Combined_logo.svg";
import { languages, LanguageProps } from "../../hooks/useLanguageSetup";

export const NavBar = ({
  setTheme,
  locale,
  setLocale
}: {
  setTheme: React.Dispatch<React.SetStateAction<any>>;
  locale: LanguageProps;
  setLocale: React.Dispatch<React.SetStateAction<LanguageProps>>;
}) => {
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
  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setLocale(languages[event.target.value as string]);

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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={locale.language}
        onChange={handleLanguageChange}
        className={classes.languageSelector}
      >
        {Object.keys(languages).map(item => (
          <MenuItem value={languages[item].language}>
            {languages[item].label}
          </MenuItem>
        ))}
      </Select>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor={"primary"}
      >
        <Tab label={<Trans>Dashboard</Trans>} value="/" />
        <Tab label={<Trans>Locations</Trans>} value="/locations" />
      </Tabs>
    </div>
  );
};
