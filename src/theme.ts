import { createMuiTheme } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600]
    },
    secondary: {
      main: blue[200],
      dark: pink.A200
    },
    error: {
      main: pink.A200
    }
  },
  typography: {
    fontFamily: "Open Sans, sans-serif"
  }
});

export default theme;
