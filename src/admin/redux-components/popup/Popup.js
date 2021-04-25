import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { popupClose } from "../../redux/popup/PopupActions";
export default function Popup() {
  const dispatch = useDispatch();
  const { open, buttons, title, message } = useSelector((s) => s.popup, []);

  const handleClose = () => {
    dispatch(popupClose);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ color: "black" }}
          id="alert-dialog-description"
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons &&
          buttons.map((x) => {
            return (
              <Button
                key={x.label}
                onClick={(e) => {
                  handleClose();
                  x.onClick && x.onClick(e);
                }}
                color={x.color || "primary"}
              >
                {x.label}
              </Button>
            );
          })}
      </DialogActions>
    </Dialog>
  );
}
