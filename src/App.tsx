import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "@material-ui/styles";

import { NavBar } from "src/components/Navbar";
import { Locations } from "src/screens/Locations";
import { Landing } from "src/screens/Landing";

import theme from "./theme";
import "./App.css";

const client = new ApolloClient({
  uri: "http://william.multimediatech.cz:8081/air2day-test/graphql",
  headers: {
    authorization: `fb4c1cd7-e219-48ef-be8f-5e31f125e64f`
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <IntlProvider locale="en">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="container">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route path="/locations" component={Locations} />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  </ApolloProvider>
);

export default App;
