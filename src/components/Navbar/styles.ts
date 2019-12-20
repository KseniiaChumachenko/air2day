import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      display: "flex",
      flexDirection: "row",
      maxHeight: "10vh"
    },
    grow: {
      flexGrow: 1
    },
    title: {
      cursor: "pointer",
      fontFamily: '"Leckerli One", cursive',
      fontSize: 30,
      color: theme.palette.primary.main,

      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),

      [theme.breakpoints.down("sm")]: {
        fontSize: 25
      }
    }
  })
);

export default useStyles;
