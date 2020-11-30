import React, { useMemo } from "react";
import { Trans } from "@lingui/macro";
import Alert from "@material-ui/lab/Alert";
import { Link, makeStyles, Snackbar, Theme } from "@material-ui/core";
import { PrivacyPolicyDialog } from "./PrivacyPolicyDialog";

const TRUE = "true";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export const Cookies = () => {
  const classes = useStyles();
  const withLocalStorageValue = useMemo(
    () => localStorage.getItem("air2day_cookies_accepted") === TRUE,
    [localStorage]
  );

  const [open, setOpen] = React.useState(!withLocalStorageValue);
  const [openPolicy, setOpenPolicy] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    localStorage.setItem("air2day_cookies_accepted", TRUE);
    setOpen(false);
  };

  const handlePrivacyPolicyClick = () => setOpenPolicy(true);
  const handlePolicyModalClose = () => setOpenPolicy(false);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="warning">
          <Trans>
            By continue browsing or closing this warning, you accept the
          </Trans>
          &nbsp;
          <Link href="#" onClick={handlePrivacyPolicyClick} color={"inherit"}>
            <Trans>
              <strong>cookie and privacy policy</strong>
            </Trans>
          </Link>
          &nbsp;
          <Trans>on this page.</Trans>
        </Alert>
      </Snackbar>

      <PrivacyPolicyDialog open={openPolicy} onClose={handlePolicyModalClose} />
    </div>
  );
};
