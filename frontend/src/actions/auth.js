import axios from "axios";
import * as types from "./ActionTypes";
import { signInBtnIsClicked } from "./user";

// 로그인 시작
export const signIn = () => {
  return { type: types.AUTH_SIGNIN };
};

// 로그인 성공
export const signInSuccess = (nickname) => {
  return {
    type: types.AUTH_SIGNIN_SUCCESS,
    nickname: nickname,
  };
};

// 로그인 실패
export const signInFailure = () => {
  return { type: types.AUTH_SIGNIN_FAILURE };
};

export const signUp = () => {
  return { type: types.AUTH_SIGNUP };
};

export const signUpSuccess = () => {
  return { type: types.AUTH_SIGNUP_SUCCESS };
};

export const signUpFailure = (error) => {
  return { type: types.AUTH_SIGNUP_FAILURE, error: error };
};

export const signOut = () => {
  return { type: types.AUTH_SIGNOUT };
};

export const signOutError = (error) => {
  return { type: types.AUTH_SIGNOUT_ERROR, error: error };
};
export const signDestroy = () => {
  return { type: types.AUTH_SIGN_DESTROY };
};
export const signDestroyError = () => {
  return { type: types.AUTH_SIGN_DESTROY_ERROR };
};
export const signUpdate = () => {
  return { type: types.AUTH_SIGN_UPDATE };
};
export const signUpdateError = () => {
  return { type: types.AUTH_SIGN_UPDATE_ERROR };
};
export const confirm = () => {
  return { type: types.CONFIRM };
};
export const confirmPassword = () => {
  return { type: types.CONFIRM_PWD };
};
export const confirmPasswordError = () => {
  return { type: types.CONFIRM_PWD_ERROR };
};
export const profilePath = () => {
  return { type: types.PROFILE_PATH };
};
export const profilePathSuccess = (profile_path) => {
  return { type: types.PROFILE_PATH_SUCCESS, profile_path: profile_path };
};

// 회원가입
export const signUpRequest = ({ user }) => async (dispatch) => {
  dispatch(signUp());
  await axios
    .post("/auth/signup", { ...user })
    .then((response) => {
      dispatch(signUpSuccess());
    })
    .catch((error) => {
      dispatch(signUpFailure(error.response.data.code));
    });
};

// 로그인
export const signInRequest = ({ user }) => async (dispatch) => {
  dispatch(signIn());
  await axios
    .post("/auth/signIn", { ...user })
    .then((response) => {
      if (response.data.success === 1) {
        dispatch(signInSuccess(response.data.nickname, response.data.password));
        dispatch(signInBtnIsClicked());
      }
    })
    .catch((error) => {
      dispatch(signInFailure(error));
    });
};

// 로그아웃
export const signOutRequest = () => async (dispatch) => {
  await axios
    .post("/auth/signOut")
    .then((response) => {
      dispatch(signOut());
    })
    .catch((error) => {
      dispatch(signOutError(error));
    });
};

// 삭제
export const signDestroyRequest = (username) => async (dispatch) => {
  await axios
    .post("/auth/destroy", { username })
    .then((username) => {
      dispatch(signDestroy());
    })
    .catch((error) => {
      dispatch(signDestroyError(error));
    });
};

export const signUpdateRequest = () => async (dispatch) => {
  await axios
    .put("/auth/update")
    .then((response) => {
      dispatch(signUpdate());
    })
    .catch((error) => {
      dispatch(signUpdateError(error));
    });
};
export const profileUpload = (formData) => async (dispatch) => {
  // dispatch(profilePath())
  await axios
    .put("auth/profile", formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      dispatch(profilePathSuccess(response.data.profile_path));
      alert("프로필 업로드 완료");
    })
    .catch((error) => {
      alert("실패!!!!!!!!!!!!!");
    });
};
export const confirmPwd = ({ user }) => async (dispatch) => {
  dispatch(confirm());
  await axios
    .post("auth/confirm", { ...user })
    .then((response) => {
      dispatch(confirmPassword());
    })
    .catch((error) => {
      dispatch(confirmPasswordError(error));
    });
};
