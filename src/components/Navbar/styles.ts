import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "sticky",
      top: 0,
      left: 0,
      height: '3em',
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
    title: {
      cursor: "pointer",
      fontFamily: '"Leckerli One", cursive',
      fontSize: 30,
      color: theme.palette.primary.main,

      [theme.breakpoints.down("sm")]: {
        fontSize: 25
      }
    },
    themeSwitch: {
      height: "2em"
    }
  })
);

export default useStyles;
