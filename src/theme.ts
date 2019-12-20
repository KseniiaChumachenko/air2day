import { createMuiTheme } from "@material-ui/core/styles";
import { blue, pink, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
      light: blue[200]
    },
    secondary: {
      main: pink[600],
      light: pink[200]
    },
    error: {
      main: red[600]
    }
  },
  typography: {
    fontFamily: "Open Sans, sans-serif"
  }
});

export default theme;
