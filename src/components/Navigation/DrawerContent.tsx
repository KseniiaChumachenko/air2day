import React from "react";
import clsx from "clsx";
import { Trans } from "@lingui/macro";
import { makeStyles } from "@material-ui/core/styles";
import {
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Theme
} from "@material-ui/core";
import {
  DashboardRounded,
  EmojiObjects,
  EmojiObjectsOutlined,
  MapRounded
} from "@material-ui/icons";
import { LanguageProps, languages } from "../../hooks/useLanguageSetup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectorContainer: {
      paddingLeft: "4px",
      paddingRight: "4px"
    },
    languageSelector: {
      width: "inherit"
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
    placeEnd: {
      alignSelf: "flex-end",
      fontSize: "12px"
    }
  })
);

export const DrawerContent = ({
  expanded,
  locale,
  setLocale,
  theme,
  setTheme
}: {
  expanded: boolean;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
  locale: LanguageProps;
  theme: Theme;
  setLocale: React.Dispatch<React.SetStateAction<LanguageProps>>;
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleRouteChange = (path: string) => history.push(path);

  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setLocale(languages[event.target.value as string]);

  const handleThemeChange = () => setTheme((prevState: any) => !prevState);

  return (
    <List className={classes.listContainer}>
      <ListItem button={true} onClick={() => handleRouteChange("/")}>
        <ListItemIcon>
          <DashboardRounded />
        </ListItemIcon>
        <ListItemText primary={<Trans>Dashboard</Trans>} />
      </ListItem>
      <ListItem
        button={true}
        onClick={() => handleRouteChange("/locations/tables")}
      >
        <ListItemIcon>
          <MapRounded />
        </ListItemIcon>
        <ListItemText primary={<Trans>Locations</Trans>} />
      </ListItem>

      <ListItem className={classes.placeEnd} button onClick={handleThemeChange}>
        {theme.palette.type === "light" ? (
          <>
            <ListItemIcon>
              <EmojiObjectsOutlined />
            </ListItemIcon>
            <ListItemText primary={<Trans>Light OFF</Trans>} />
          </>
        ) : (
          <>
            <ListItemIcon>
              <EmojiObjects />
            </ListItemIcon>
            <ListItemText primary={<Trans>Light ON</Trans>} />
          </>
        )}
      </ListItem>
      <ListItem
        className={clsx(classes.placeEnd, {
          [classes.selectorContainer]: !expanded
        })}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
      </ListItem>
    </List>
  );
};
