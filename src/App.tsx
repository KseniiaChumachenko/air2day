import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import { setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { ThemeProvider } from "@material-ui/styles";

import { NavBar } from "src/components/Navbar";
import { Locations } from "src/screens/Locations";
import { Landing } from "src/screens/Landing";
/*import enMessages from "src/locales/en/messages.js";
import ruMessages from "src/locales/ru/messages.js";
import csMessages from "src/locales/cs/messages.js";
import ukMessages from "src/locales/uk/messages.js";*/

import { darkTheme, lightTheme } from "./theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      overflow: "hidden",
      background: theme.palette.background.default
    }
  })
);

const client = new ApolloClient({
  link: new HttpLink({
    uri: `/api/graphql`,
    headers: {
      authorization: `fb4c1cd7-e219-48ef-be8f-5e31f125e64f`
    }
  }),
  cache: new InMemoryCache()
});

const App = () => {
  const classes = useStyles({});
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, setState] = useState(prefersDarkMode);

  const defaultLocale = "en";
  const i18n = setupI18n({
    language: "en",
    catalogs: {
/*      en: enMessages,
      ru: ruMessages,
      cs: csMessages,
      uk: ukMessages*/
    }
  });

  useEffect(() => {
    setState(prevState => {
      if (prevState !== prefersDarkMode) {
        return prefersDarkMode;
      }
    });
  }, [prefersDarkMode]);

  const theme = React.useMemo(
    () => createMuiTheme(state ? darkTheme : lightTheme),
    [state]
  );

  return (
    <I18nProvider i18n={i18n} language={defaultLocale}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div className={classes.root}>
                <NavBar setTheme={setState} />
                <Redirect from={"/locations"} to={"/locations/tables"} />
                <Route exact path="/" component={Landing} />
                <Route path={"/locations/:tabId"} component={Locations} />
              </div>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </I18nProvider>
  );
};
export default App;
