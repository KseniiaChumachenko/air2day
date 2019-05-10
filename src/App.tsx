import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./air_components/Navbar";
import { Locations } from "./air_components/Locations";
import ContactUs from "./air_components/ContactUs";
import Home from "./air_components/Home";

import { ThemeProvider } from '@material-ui/styles';
import theme from "./theme";
import "./App.css";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <div className="container">
              <NavBar/>
              <Route exact path="/" component={Home}/>
              <Route path="/locations" component={Locations}/>
              <Route path="/contactus" component={ContactUs}/>
            </div>
          </ThemeProvider>
        </BrowserRouter>
    );
  }
}

export default App;