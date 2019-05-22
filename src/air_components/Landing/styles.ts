import { createStyles, Theme } from "@material-ui/core";
import background from "./background.jpg";

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      display: "flex",
      overflow: 'scroll',
      flexDirection: "column",
      fontFamily: "Varela Round",
      fontStyle: "normal",
      fontWeight: "normal",

      background: `url(${background}) no-repeat center center fixed`,
      backgroundSize: "cover",

      [theme.breakpoints.down("sm")]: {
        background: 'unset',
      }
    },

    gridContainer: {
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center"
      }
    },

    title: {
      marginTop: 50,
      fontSize: 35,
      lineHeight: 2,
      marginLeft: theme.spacing(1),
      letterSpacing: "0.1em",
      color: "#FF4081",

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(4),
        marginLeft: "auto",
        fontSize: 24,
        textAlign: "center"
      }
    },

    subtitle: {
      fontSize: 30,
      lineHeight: 2,
      marginLeft: theme.spacing(4),

      letterSpacing: "0.1em",
      color: "#FF79BD",

      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        marginLeft: "auto",
        textAlign: "center"
      }
    },

    intro: {
      fontSize: 20,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(8),
      marginBottom: theme.spacing(6),
      lineHeight: 1.5,
      letterSpacing: "0.05em",
      maxWidth: "60%",
      textAlign: "justify",

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
        maxWidth: "90%",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto",
      }
    },

    cardView: {
      display: "inline-flex",
      flexWrap: "wrap"
    }
  });