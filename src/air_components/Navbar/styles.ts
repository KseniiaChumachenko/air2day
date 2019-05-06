import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    position: "relative" as "relative",
    zIndex: 3,
    width: "100%",
    backgroundColor: theme.palette.background.default
  },
  appBar: {
    display: "flex" as "flex",
    flexDirection: "row" as "row",
    maxHeight: "10vh"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    fontFamily: '"Leckerli One", cursive' as '"Leckerli One", cursive',
    fontSize: 30,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex" as "flex",
      alignSelf: "center" as "center"
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  }
});

export default styles;
