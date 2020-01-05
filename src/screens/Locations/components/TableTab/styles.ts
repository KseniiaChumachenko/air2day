import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      overflowX: "auto",
      maxHeight: "80vh"
    },
    table: {
      minWidth: 700
    },
    emptyState: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      width: "100%"
    }
  })
);

export default useStyles;
