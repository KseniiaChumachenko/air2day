import { PaletteType } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const lightTheme = {
  palette: {
    type: "light" as PaletteType,
    background: {
      default: "#f9f9f9"
    },

    primary: {
      main: "#3d5af1",
      light: "#7e87ff",
      dark: "#0031bd",
      contrastText: ""
    },
    secondary: {
      main: "#22d1ee",
      light: "#71ffff",
      dark: "#009fbb",
      contrastText: ""
    },
    text: {
      primary: "#000000",
      secondary: "#212121",
      disabled: "#484848",
      hint: ""
    },

    ////////////////// TBD ///////////////////
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: ""
    },
    error: {
      main: red[600],
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: ""
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: ""
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: ""
    }
    /////////////////////////////////////
  },
  typography: {
    fontFamily: "'Roboto', 'Roboto Mono', serif"
  }
};

export const darkTheme = {
  palette: {
    type: "dark" as PaletteType,
    background: {
      paper: "#090f2b",
      default: "#0e153a"
    },

    primary: {
      main: "#3d5af1",
      light: "#7e87ff",
      dark: "#0031bd",
      contrastText: ""
    },
    secondary: {
      main: "#22d1ee",
      light: "#71ffff",
      dark: "#009fbb",
      contrastText: ""
    },
    text: {
      primary: "#ffffff",
      secondary: "#eceff1",
      disabled: "#484848",
      hint: ""
    },

    ////////////////// TBD ///////////////////
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: ""
    },
    error: {
      main: red[600],
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: ""
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: ""
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: ""
    }
    /////////////////////////////////////
  },
  typography: {
    fontFamily: "'Roboto', 'Roboto Mono', serif"
  }
};

export const analogousColors = [
  "#22D1EE",
  "#F17A3D",
  "#226BEE",
  "#EE22D1",
  "#EE226B",
  "#A522EE",
  "#3F22EE",
  "#7A3DF1",
  "#D43DF1",
  "#F13DB4",
  "#F13D5A",
  "#3D5AF1"
];
