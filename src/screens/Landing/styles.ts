import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      overflow: "scroll",
      flexDirection: "column",
      fontStyle: "normal",
      fontWeight: "normal",
      background: theme.palette.background.default
    },

    gridContainer: {
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center"
      }
    },

    title: {
      marginTop: 50,
      lineHeight: 2,
      marginLeft: theme.spacing(1),
      letterSpacing: "0.1em",
      fontFamily: "Varela Round",

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(4),
        marginLeft: "auto",
        fontSize: 24,
        textAlign: "center"
      }
    },

    subtitle: {
      fontFamily: "Varela Round",
      lineHeight: 2,
      marginLeft: theme.spacing(4),

      letterSpacing: "0.1em",

      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        marginLeft: "auto",
        textAlign: "center"
      }
    },

    intro: {
      fontFamily: "Varela Round",
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
        marginLeft: "auto",
        marginRight: "auto"
      }
    },

    cardView: {
      fontFamily: "Varela Round",
      display: "inline-flex",
      flexWrap: "wrap"
    }
  })
);

export default useStyles;
