import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      zIndex: 3,
      width: "100%",
      backgroundColor: theme.palette.background.default
    },
    appBar: {
      display: "flex",
      flexDirection: "row",
      maxHeight: "10vh"
    },
    grow: {
      flexGrow: 1
    },
    title: {
      fontFamily: '"Leckerli One", cursive',
      fontSize: 30,

      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2)
    }
  });

export default styles;
