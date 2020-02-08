import "regenerator-runtime/runtime";
import React, { useEffect, useState, Suspense } from "react";
import { IntlProvider } from "react-intl";
import { Route, BrowserRouter } from "react-router-dom";
import {
  CircularProgress,
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
    <Suspense fallback={<CircularProgress />}>
      <ApolloProvider client={client}>
        <IntlProvider locale="en">
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.root}>
                  <NavBar setTheme={setState} />
                  <Route exact path="/" component={Landing} />
                  <Route path="/locations" component={Locations} />
                </div>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </BrowserRouter>
        </IntlProvider>
      </ApolloProvider>
    </Suspense>
  );
};
export default App;
