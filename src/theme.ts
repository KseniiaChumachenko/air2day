import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[600]
        },
        secondary: {
            main: blue[200]
        }
    },
    typography: {
        fontFamily: "Open Sans, sans-serif"
    }
});

export default theme;
