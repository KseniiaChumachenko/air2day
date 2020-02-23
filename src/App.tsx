import "regenerator-runtime/runtime";
import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import { I18nProvider } from "@lingui/react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
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

import { useThemingSetup } from "./hooks/useThemingSetup";
import { useLanguageSetup } from "./hooks/useLanguageSetup";

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
  const { theme, setTheme } = useThemingSetup();
  const { i18n, locale, setLocale } = useLanguageSetup();

  return (
    <I18nProvider i18n={i18n} language={locale.language}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div className={classes.root}>
                <NavBar
                  setTheme={setTheme}
                  locale={locale}
                  setLocale={setLocale}
                />
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
