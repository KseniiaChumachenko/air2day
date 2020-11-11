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
import { Header } from "./components/Header";
import { SearchDataProvider } from "./store/SearchData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("md")]: {
        display: "flex"
      },
      display: "block",
      height: "100vh",
      overflow: "hidden"
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
    uri: `/graphql`,
    headers: {
      authorization: process.env.AUTH_TOKEN
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
              <SearchDataProvider>
                <div className={classes.root}>
                  <main className={classes.content}>
                    <Header
                      theme={theme}
                      setTheme={setTheme}
                      locale={locale}
                      setLocale={setLocale}
                    />
                    <Route exact path="/" component={Dashboard} />
                    <Route path={"/locations"} component={Locations} />
                  </main>
                </div>
              </SearchDataProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </I18nProvider>
  );
};
export default App;
