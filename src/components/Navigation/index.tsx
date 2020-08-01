import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  ListItem,
  Theme
} from "@material-ui/core";
import {
  ArrowBackRounded,
  ArrowForward,
  MenuRounded
} from "@material-ui/icons";

import logo from "./assets/Combined_logo.png";
import logoSmall from "./assets/Cloud_logo.png";
import { LanguageProps } from "../../hooks/useLanguageSetup";
import { DrawerContent } from "./DrawerContent";

const drawerWidth = 255;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      top: 0,
      position: "sticky",
      display: "block",
      background: theme.palette.background.paper
    },
    drawerPaper: {
      width: drawerWidth
    },
    logo: {
      height: "1.5em",
      [theme.breakpoints.up("md")]: {
        height: 30,
        width: 200,
        margin: theme.spacing(1),
        alignSelf: "center"
      }
    },
    logoCollapsed: {
      alignSelf: "center",
      width: 38,
      height: 30,
      margin: theme.spacing(1)
    },
    expandIcon: {
      paddingLeft: theme.spacing(24)
    },
    hidePadding: {
      paddingTop: 0,
      paddingBottom: 0
    },
    spacing: {
      height: theme.spacing(6)
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(5) + 1,
      [theme.breakpoints.up("md")]: {
        width: theme.spacing(7) + 1
      }
    }
  })
);

interface Props {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
  locale: LanguageProps;
  setLocale: React.Dispatch<React.SetStateAction<LanguageProps>>;
}

export const Navigation = ({ locale, setTheme, theme, setLocale }: Props) => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <nav aria-label="navigation list" className={classes.root}>
      <CssBaseline />
      <Hidden mdUp implementation="css">
        <AppBar className={classes.appBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuRounded color={"primary"} />
          </IconButton>
          <IconButton edge={"start"}>
            <img src={logo} alt={"logo"} className={classes.logo} />
          </IconButton>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <div className={classes.spacing} />
          <DrawerContent
            locale={locale}
            theme={theme}
            setLocale={setLocale}
            setTheme={setTheme}
            expanded={expanded}
          />
        </Drawer>
      </Hidden>

      {/*   Desktop version    */}
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: expanded,
            [classes.drawerClose]: !expanded
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: expanded,
              [classes.drawerClose]: !expanded
            })
          }}
        >
          {expanded ? (
            <>
              <img src={logo} alt={"logo"} className={classes.logo} />
              <Divider />
              <ListItem
                className={clsx(classes.expandIcon, classes.hidePadding)}
                onClick={handleExpanded}
              >
                <IconButton edge={"end"}>
                  <ArrowBackRounded />
                </IconButton>
              </ListItem>
            </>
          ) : (
            <>
              <img
                src={logoSmall}
                alt={"logo"}
                className={classes.logoCollapsed}
              />
              <Divider />
              <ListItem
                onClick={handleExpanded}
                className={classes.hidePadding}
              >
                <IconButton edge={"start"}>
                  <ArrowForward />
                </IconButton>
              </ListItem>
            </>
          )}
          <Divider />
          <DrawerContent
            locale={locale}
            theme={theme}
            setLocale={setLocale}
            setTheme={setTheme}
            expanded={expanded}
          />
        </Drawer>
      </Hidden>
    </nav>
  );
};
