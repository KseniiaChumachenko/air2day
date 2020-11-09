import React from "react";
import {
  Hidden,
  IconButton,
  makeStyles,
  MenuItem,
  Select
} from "@material-ui/core";
import { languages } from "../../../hooks/useLanguageSetup";
import { EmojiObjects, EmojiObjectsOutlined } from "@material-ui/icons";
import { Props } from "../index";

const useStyles = makeStyles(theme => ({
  selectorsContainer: {
    display: "flex"
  },
  languageSelector: {
    maxWidth: 45
  },
  scaledButton: {
    margin: "auto"
  }
}));

export const Switches = ({
  locale,
  setLocale,
  theme,
  setTheme,
  mobile
}: Props) => {
  const classes = useStyles();

  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setLocale(languages[event.target.value as string]);

  const handleThemeChange = () => setTheme((prevState: any) => !prevState);

  return (
    <Hidden smDown={!mobile} smUp={mobile}>
      <div className={classes.selectorsContainer}>
        <Select
          value={locale.language}
          onChange={handleLanguageChange}
          className={classes.languageSelector}
        >
          {Object.keys(languages).map((item, index) => (
            <MenuItem value={languages[item].language} key={index}>
              {languages[item].label}
            </MenuItem>
          ))}
        </Select>

        <IconButton
          onClick={handleThemeChange}
          className={classes.scaledButton}
        >
          {theme.palette.type === "light" ? (
            <EmojiObjectsOutlined />
          ) : (
            <EmojiObjects />
          )}
        </IconButton>
      </div>
    </Hidden>
  );
};
