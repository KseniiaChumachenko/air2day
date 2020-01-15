import { createMuiTheme } from "@material-ui/core/styles";
import { blue, pink, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
      light: blue[200],
      dark: '',
      contrastText: ''
    },
    secondary: {
      main: pink[600],
      light: pink[200]
    },
    error: {
      main: red[600],
      light:'#e57373',
      dark: '#d32f2f',
      contrastText: ''
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: ''
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: ''
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: ''
    }
  },
  typography: {
    fontFamily: "Open Sans, sans-serif"
  }
});

export default theme;
