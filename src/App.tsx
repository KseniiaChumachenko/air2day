import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./air_components/Navbar";
import { Locations } from "./air_components/Locations";
import ContactUs from "./air_components/ContactUs";
import Home from "./air_components/Home";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./App.css";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div className="container">
              <NavBar/>
              <Route exact path="/" component={Home}/>
              <Route path="/locations" component={Locations}/>
              <Route path="/contactus" component={ContactUs}/>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
    );
  }
}

export default App;