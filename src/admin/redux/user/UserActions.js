import consts from "../../libs/consts";
import { requestGet, requestPost, requestPut } from "../../services/network";
import { popupError, popupMessage } from "../popup/PopupActions";

export const userActionTypes = {
  init: "user/init",
  signIn: "user/signIn",
  update: "user/update",
  clear: "user/clear",
};
export const signIn = (username, password) => (dispatch) => {
  if (!username || !password) {
    dispatch(popupMessage({ message: "아이디와 비밀번호를 입력해주세요." }));
    return;
  }
  requestPost({
    url: consts.apiUrl + "/admins/signin",
    body: {
      username,
      password,
    },
  })
    .then((response) => {
      localStorage.setItem("token", response.token);
      dispatch({
        type: userActionTypes.signIn,
        user: response.user,
      });
    })
    .catch((e) => {
      dispatch(popupError(e));
    });
};

export const userPatch = ({
  phone,
  managerName,
  password,
  address,
  id,
}) => async (dispatch) => {
  try {
    if (!phone || isNaN(phone)) {
      throw "휴대폰 번호를 입력해주세요.";
    } else if (!managerName) {
      throw "담당자를 입력해주세요.";
    } else if (!address) {
      throw "주소를 입력해주세요.";
    } else if (password && (password.length < 4 || password.length > 20)) {
      throw "비밀번호는 4~20자리로 입려해주세요.";
    }
    const columns = ["phone", "managerName", "address"];
    const values = [phone, managerName, address];
    if (password) {
      columns.push("password");
      values.push(password);
    }

    const user = await requestPut(consts.api + "/admins/" + id, {
      columns,
      values,
    });
    dispatch(popupMessage({ message: "저장 되었습니다." }));
    dispatch({ type: userActionTypes.update, user });
  } catch (error) {
    dispatch(popupError(error));
  }
};

export const signOut = (dispatch) => {
  localStorage.clear("token");
  dispatch({ type: userActionTypes.clear });
};

export const initUser = (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    requestGet({ url: consts.apiUrl + "/admins/tokens/" + token })
      .then((user) => {
        dispatch({
          type: userActionTypes.signIn,
          user,
        });
      })
      .catch((e) => {
        dispatch({
          type: userActionTypes.init,
        });
      });
  } else {
    dispatch({
      type: userActionTypes.init,
    });
  }
};
