import React, { SetStateAction } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { message } from "./message";

interface P {
  open: boolean;
  onClose(): void;
}

export const PrivacyPolicyDialog = ({ open, onClose }: P) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      <Trans>Privacy Policy</Trans>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        <Trans>Close</Trans>
      </Button>
    </DialogActions>
  </Dialog>
);
