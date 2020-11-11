import React from "react";
import { makeStyles, Theme } from "@material-ui/core";

import { LanguageProps } from "../../hooks/useLanguageSetup";
import { SearchContainer } from "./SearchContainer";
import { Switches } from "./Switches";
import { Logo } from "./Logo";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap"
    }
  }
}));

export interface Props {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
  locale: LanguageProps;
  setLocale: React.Dispatch<React.SetStateAction<LanguageProps>>;
  mobile?: boolean;
}

export const Header = ({ locale, setLocale, theme, setTheme }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo />
      <Switches
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        setTheme={setTheme}
        mobile={true}
      />
      <SearchContainer />
      <Switches
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
};
