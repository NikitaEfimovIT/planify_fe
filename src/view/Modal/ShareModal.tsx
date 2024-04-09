import { Alert, Button, Dialog, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_SHARE_MODAL_STATE } from "@src/store/modals/modalsTypes";
import { makeStyles } from "tss-react/mui";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: "1.5em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  copyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonsContainer: {
    marginTop: "1em",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export const ShareModal = () => {
  const dispatch = useDispatch<any>();
  const isOpen = useSelector((state: any) => state.modals.openShareModal);
  const room = useSelector((state: any) => state.room.room);
  const { classes } = useStyles();
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

  const devUrl = "localhost:3006/invite";
  const prodUrl = "https://planify.today/invite";

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };
  return (
    <Dialog open={isOpen} onClose={() => dispatch({ type: CHANGE_SHARE_MODAL_STATE })}>
      <form className={classes.root}>
        <h3 style={{ marginBlockStart: 0 }}>Share access to this room with your friends</h3>
        <div className={classes.copyContainer}>
          <TextField disabled size={"small"} fullWidth value={`${prodUrl}/${room?.key}`}></TextField>
          <CopyToClipboard text={`${prodUrl}/${room?.key}`} onCopy={onCopyText}>
            <Button variant={"contained"}>Copy</Button>
          </CopyToClipboard>
        </div>
        <div className={classes.buttonsContainer}>
          <Button variant={"outlined"} onClick={() => dispatch({ type: CHANGE_SHARE_MODAL_STATE })}>
            Close
          </Button>
        </div>
        <Snackbar open={copyStatus} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Copied!
          </Alert>
        </Snackbar>
      </form>
    </Dialog>
  );
};
