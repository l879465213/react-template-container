import { userActionTypes } from "./UserActions";

const initUser = {
  signed: false,
  init: false,
};

export default function user(state = initUser, action) {
  switch (action.type) {
    case userActionTypes.update:
      return {
        ...state,
        ...action.user,
      };
    case userActionTypes.clear:
      return { ...initUser, init: true };
    case userActionTypes.signIn:
      return {
        ...state,
        init: true,
        signed: true,
        ...action.user,
      };
    case userActionTypes.init:
      return {
        ...state,
        init: true,
      };
    default:
      return state;
  }
}
