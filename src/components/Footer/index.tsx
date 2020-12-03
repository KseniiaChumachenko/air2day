import React from "react";
import {
  createStyles,
  Link,
  makeStyles,
  Paper,
  Theme
} from "@material-ui/core";
import { CtuLogo } from "./CtuLogo";
import { Trans } from "@lingui/macro";
import { PrivacyPolicyDialog } from "../Cookies/PrivacyPolicyDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "8vh",
      padding: theme.spacing(2),
      display: "flex",
      alignItems: "center"
    },
    footerItem: {
      marginLeft: theme.spacing(2)
    }
  })
);

export const Footer = () => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);

  const handleCLick = () => setOpen(!open);

  return (
    <footer>
      <Paper square={true} className={classes.root}>
        <CtuLogo />
        <Link
          href={"http://www.fel.cvut.cz/"}
          variant={"body2"}
          className={classes.footerItem}
        >
          <Trans>University page</Trans>
        </Link>

        <Link
          href={"#"}
          onClick={handleCLick}
          variant={"body2"}
          className={classes.footerItem}
        >
          <Trans>Privacy policy</Trans>
        </Link>
      </Paper>

      <PrivacyPolicyDialog open={open} onClose={handleCLick} />
    </footer>
  );
};
