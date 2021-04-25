import { popupActionType } from "./PopupActions";

const initPopup = {
  buttons: [{ label: "확인" }],
  title: "",
  message: "",
  open: false,
};

export default function popup(state = initPopup, action) {
  switch (action.type) {
    case popupActionType.open:
      return { ...state, ...action, open: true, type: null };
    case popupActionType.close:
      return { ...initPopup };
    default:
      return state;
  }
}
