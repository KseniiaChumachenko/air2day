import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from "./air_components/Navbar";
import { Locations } from "./air_components/Locations";
import { Landing } from "./air_components/Landing";

import { ThemeProvider } from "@material-ui/styles";

import theme from "./theme";
import "./App.css";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
