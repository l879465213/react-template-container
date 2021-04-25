export const loadingActionType = {
  start: "loading/start",
  stop: "loading/stop",
};

export const loadingStart = (dispatch) => {
  dispatch({ type: loadingActionType.start });
};

export const loadingStop = (dispatch) => {
  dispatch({ type: loadingActionType.stop });
};
