import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { LanguageProps } from "src/hooks/useLanguageSetup";

const font = ({ locale }: { locale: LanguageProps }) =>
  locale.language === "ru" ? "Varela Round" : "Roboto";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },

    container: {
      padding: theme.spacing(3)
    },

    title: {
      color: theme.palette.primary.light,
      lineHeight: 1.5,
      marginLeft: theme.spacing(1),
      letterSpacing: "0.1em",
      fontFamily: font,

      [theme.breakpoints.down("sm")]: {
        lineHeight: 1,
        marginLeft: "auto",
        fontSize: 24,
        textAlign: "center"
      }
    },

    subtitle: {
      fontFamily: font,
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
      fontFamily: font,
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
      color: theme.palette.primary.light
    },
    content: {
      display: "flex",
      alignItems: "center"
    }
  })
);

export default useStyles;
