import "regenerator-runtime/runtime";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

import { Locations } from "src/screens/Locations";
import { Dashboard } from "src/screens/Dashboard";

import { useThemingSetup } from "./hooks/useThemingSetup";
import { useLanguageSetup } from "./hooks/useLanguageSetup";
import { Navigation } from "./components/Navigation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("md")]: {
        display: "flex"
      },
      display: "block",
      height: "100vh",
      overflow: "hidden",
      background: theme.palette.background.default
    },
    content: {
      flexGrow: 1,
      overflow: "auto",
      height: "100%"
    }
  })
);

const client = new ApolloClient({
  link: new HttpLink({
    uri: `/api/graphql`,
    headers: {
      authorization: `e9f0dcc5-1877-4570-960c-a3ae9f4a45b3`
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
                <Navigation
                  theme={theme}
                  setTheme={setTheme}
                  locale={locale}
                  setLocale={setLocale}
                />
                <main className={classes.content}>
                  <Route exact path="/" component={Dashboard} />
                  <Route path={"/locations/:tabId"} component={Locations} />
                </main>
              </div>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </I18nProvider>
  );
};
export default App;
