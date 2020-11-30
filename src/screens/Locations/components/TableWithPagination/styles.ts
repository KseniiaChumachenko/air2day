import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      overflowX: "auto"
    },
    containerHeader: {
      display: "flex",
      justifyContent: "space-between"
    },
    title: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    selectHourAvg: {
      width: 120
    },
    table: {
      minWidth: 700
    },
    emptyState: {
      padding: theme.spacing(2),
      display: "flex",
      alignContent: "center",
      justifyContent: "center"
    }
  })
);

export default useStyles;
