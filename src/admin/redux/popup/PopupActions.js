import { InfoSharp } from "@material-ui/icons";

export const popupActionType = {
  open: "popup/open",
  close: "popup/close",
};

export const popupError = (error) => (dispatch) => {
  let message = error ? error.message || error.msg || error : error;
  if (typeof message === "object") {
    message = JSON.stringify(message);
  }
  dispatch(
    popupMessage({
      title: "오류",
      message,
    })
  );
};

export const popupAction = ({
  title,
  message,
  labelCancel = "취소",
  labelConfirm = "확인",
  onClickConfirm,
  onClickCancel,
}) => (dispatch) => {
  dispatch({
    type: popupActionType.open,
    buttons: [
      { label: labelCancel, onClick: onClickCancel },
      { label: labelConfirm, onClick: onClickConfirm },
    ],
    title,
    message,
  });
};

export const popupMessage = ({ title, message, label = "확인", onClick }) => (
  dispatch
) => {
  dispatch({
    type: popupActionType.open,
    buttons: [{ label, onClick }],
    title,
    message,
  });
};

export const popupClose = (dispatch) => {
  dispatch({ type: popupActionType.close });
};
