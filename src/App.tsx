import "regenerator-runtime/runtime";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "@lingui/react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { ThemeProvider } from "@material-ui/styles";

import { useTheme } from "./store/ThemeProvider/useTheme";
import { useLanguageSetup } from "./hooks/useLanguageSetup";
import { Header } from "./components/Header";
import { SearchDataProvider } from "./store/SearchDataProvider";
import { AppContainer } from "./components/AppContainer";
import { Routes } from "./components/Routes";
import { useGoogleApiScript } from "./components/GoogleApi/useGoogleApiScript";

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
  const { theme, setTheme } = useTheme();
  const { i18n, locale, setLocale } = useLanguageSetup();

  useGoogleApiScript();

  return (
    <I18nProvider i18n={i18n} language={locale.language}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <SearchDataProvider>
                <AppContainer>
                  <Header
                    theme={theme}
                    setTheme={setTheme}
                    locale={locale}
                    setLocale={setLocale}
                  />
                  <Routes />
                </AppContainer>
              </SearchDataProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </I18nProvider>
  );
};
export default App;
