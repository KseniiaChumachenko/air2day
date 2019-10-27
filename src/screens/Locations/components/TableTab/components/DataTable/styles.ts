import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    }
  })
);

export default useStyles;
