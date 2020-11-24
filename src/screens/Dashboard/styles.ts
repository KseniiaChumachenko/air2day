import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },

    container: {
      padding: theme.spacing(3)
    },

    title: {
      color: theme.palette.secondary.main,
      lineHeight: 1.5,
      marginLeft: theme.spacing(1),
      letterSpacing: "0.1em",

      [theme.breakpoints.down("sm")]: {
        lineHeight: 1,
        marginLeft: "auto",
        fontSize: 24,
        textAlign: "center"
      }
    },

    subtitle: {
      lineHeight: 1.5,
      marginLeft: theme.spacing(8),
      color: theme.palette.secondary.main,

      letterSpacing: "0.1em",

      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
        marginLeft: "auto",
        textAlign: "center"
      }
    },

    intro: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(12),
      marginRight: theme.spacing(12),
      lineHeight: 1.5,
      letterSpacing: "0.05em",
      textAlign: "justify",

      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(1),
        maxWidth: "90%",
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    media: {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: theme.spacing(1),
      color: theme.palette.secondary.main
    },
    content: {
      display: "flex",
      alignItems: "center"
    },
    cardActions: {
      flex: 1,
      justifyContent: "flex-end"
    }
  })
);

export default useStyles;
