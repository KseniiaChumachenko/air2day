import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: "3em",
      zIndex: 200000,
      display: "flex",
      flexDirection: "row",
      background: theme.palette.background.default,
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(3)
    },
    grow: {
      flexGrow: 1
    },
    logo: {
      height: "2em",
      alignSelf: "center"
    },
    themeSwitch: {
      height: "2em"
    }
  })
);

export default useStyles;
