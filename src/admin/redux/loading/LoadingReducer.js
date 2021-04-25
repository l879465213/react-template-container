import { loadingActionType } from "./LoadingActions";

const loadingState = {
  loading: false,
};

export default function loading(state = loadingState, action) {
  switch (action.type) {
    case loadingActionType.start:
      return { ...state, loading: true };
    case loadingActionType.stop:
      return { ...state, loading: false };
    default:
      return state;
  }
}
