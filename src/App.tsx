import React from "react";
import WebFont from "webfontloader";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route } from "react-router-dom";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
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
import theme from "./theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://william.multimediatech.cz:8081/air2day-test/api/graphql",
    headers: {
      authorization: `fb4c1cd7-e219-48ef-be8f-5e31f125e64f`
    }
  }),
  cache: new InMemoryCache()
});

const App = () => {
  const classes = useStyles({});

  WebFont.load({
    google: {
      families: ["LeckerliOne", "VarelaRound"]
    }
  });

  return (
    <ApolloProvider client={client}>
      <IntlProvider locale="en">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  <NavBar />
                  <Route exact path="/" component={Landing} />
                  <Route path="/locations" component={Locations} />
                </Grid>
              </div>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </BrowserRouter>
      </IntlProvider>
    </ApolloProvider>
  );
};
export default App;
