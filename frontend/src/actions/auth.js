import axios from "axios";
import { signInBtnIsClicked } from "./user";

// Action Types
// SignUp
export const AUTH_SIGNUP = "AUTH_SIGNUP";
export const AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS";
export const AUTH_SIGNUP_FAILURE = "AUTH_SIGNUP_FAILURE";

// SignIn
export const AUTH_SIGNIN = "AUTH_SIGNIN";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE";

// SignOut
export const AUTH_SIGNOUT = "AUTH_SIGNOUT";
export const AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS";
export const AUTH_SIGNOUT_FAILURE = "AUTH_SIGNOUT_FAILURE";

// KakaoSignIn
export const AUTH_KAKAO_SIGNIN = "AUTH_KAKAO_SIGNIN";
export const AUTH_KAKAO_SUCCESS = "AUTH_KAKAO_SUCCESS";
export const AUTH_KAKAO_FAILURE = "AUTH_KAKAO_FAILURE";

// SignDestroy
export const AUTH_SIGN_DESTROY = "AUTH_SIGN_DESTROY";
export const AUTH_SIGN_DESTROY_SUCCESS = "AUTH_SIGN_DESTROY_SUCCESS";
export const AUTH_SIGN_DESTROY_FAILURE = "AUTH_SIGN_DESTROY_FAILURE";

// SignUpdate
export const AUTH_SIGN_UPDATE = "AUTH_SIGN_UPDATE";
export const AUTH_SIGN_UPDATE_SUCCESS = "AUTH_SIGN_UPDATE_SUCCESS";
export const AUTH_SIGN_UPDATE_FAILURE = "AUTH_SIGN_UPDATE_FAILURE";

// Confirm Password At MyInfo
export const CONFIRM = "CONFIRM";
export const CONFIRM_PWD = "CONFIRM_PWD";
export const CONFIRM_PWD_ERROR = "CONFIRM_PWD_ERROR";

// Profile Add
export const PROFILE_ADD = "ADD_PROFILE";
export const PROFILE_ADD_SUCCESS = "ADD_PROFILE_SUCCESS";
export const PROFILE_ADD_FAILURE = "ADD_PROFILE_FAILURE";

// Profile Load
export const PROFILE_LOAD = "PROFILE_LOAD";
export const PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS";
export const PROFILE_LOAD_FAILURE = "PROFILE_LOAD_FAILURE";

// 회원가입
export const signUpStart = () => {
  return { type: AUTH_SIGNUP };
};

export const signUpSuccess = () => {
  return { type: AUTH_SIGNUP_SUCCESS };
};

export const signUpFailure = (error) => {
  return { type: AUTH_SIGNUP_FAILURE, error: error };
};

// 로그인
export const signInStart = () => {
  return { type: AUTH_SIGNIN };
};

export const signInSuccess = (data) => {
  return {
    type: AUTH_SIGNIN_SUCCESS,
    data: data,
  };
};
// 로그인 실패
export const signInFailure = (error) => {
    return {type: AUTH_SIGNIN_FAILURE, error: error};
};

// 카카오 로그인
export const kakao_SignIn = () => {
  return { type: AUTH_KAKAO_SIGNIN };
};
export const kakao_Success = (data) => {
  return {
    type: AUTH_KAKAO_SUCCESS,
    nickname: data,
  };
    return {
        type: AUTH_KAKAO_SUCCESS,
        nickname: data
    }
}


// 로그아웃
export const signOutStart = () => {
  return { type: AUTH_SIGNOUT };
};
export const signOutSuccess = () => {
  return { type: AUTH_SIGNOUT_SUCCESS };
};

export const signOutFailure = () => {
  return { type: AUTH_SIGNOUT_FAILURE };
};

// 회원 탈퇴
export const signDestroyStart = () => {
  return { type: AUTH_SIGN_DESTROY };
};

export const signDestroySuccess = () => {
  return { type: AUTH_SIGN_DESTROY_SUCCESS };
};

export const signDestroyFailure = () => {
  return { type: AUTH_SIGN_DESTROY_FAILURE };
};

// 회원 정보수정
export const signUpdateStart = () => {
  return { type: AUTH_SIGN_UPDATE };
};

export const signUpdateSuccess = () => {
  return { type: AUTH_SIGN_UPDATE_SUCCESS };
};

export const signUpdateFailure = () => {
  return { type: AUTH_SIGN_UPDATE_FAILURE };
};

export const confirm = () => {
  return { type: CONFIRM };
};
export const confirmPassword = () => {
  return { type: CONFIRM_PWD };
};
export const confirmPasswordError = () => {
  return { type: CONFIRM_PWD_ERROR };
};

//프로필 추가
export const profileAddStart = () => {
  return { type: PROFILE_ADD };
};
export const profileAddSuccess = (data) => {
  return {
    type: PROFILE_ADD_SUCCESS,
    data: data,
  };
};
export const profileAddFailure = () => {
  return { type: PROFILE_ADD_FAILURE };
};

// 프로필 로드
export const profileLoadStart = () => {
  return { type: PROFILE_LOAD };
};
export const profileLoadSuccess = (data) => {
  return {
    type: PROFILE_LOAD_SUCCESS,
    data: data,
  };
};
export const profileLoadFailure = () => {
  return { type: PROFILE_LOAD_FAILURE };
};

// 회원가입요청
export const signUpRequest = ({ user }) => async (dispatch) => {
  dispatch(signUpStart());
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
export const signInRequest = ({user}) => async (dispatch) => {
    dispatch(signInStart());
    await axios
        .post("/auth/signIn", {...user})
        .then((response) => {
            if (response.data.success === 1) {
                dispatch(signInSuccess(response.data.session));
                dispatch(signInBtnIsClicked());
            }
        })
        .catch((error) => {
            dispatch(signInFailure(error.response.data.code));
        });
};
// 카카오 로그인 요청
export const kakaosignInRequest = ({ res }) => async (dispatch) => {
  dispatch(kakao_SignIn());
  await axios
    .post("/auth/kakao", { ...res })
    .then((response) => {
      if (response.data.success === 1) {
        dispatch(kakao_Success(response.data.nickname));
      }
      dispatch(signInBtnIsClicked());
    })
    .catch((error) => {
      dispatch(signInFailure(error));
    });
};

// 로그아웃요청
export const signOutRequest = () => async (dispatch) => {
  dispatch(signOutStart());
  await axios
    .post("/auth/signOut")
    .then((response) => {
      dispatch(signOutSuccess());
    })
    .catch((error) => {
      dispatch(signOutFailure());
    });
};

// 회원탈퇴요청
export const signDestroyRequest = (username) => async (dispatch) => {
  dispatch(signDestroyStart());
  await axios
    .post("/auth/destroy", { username })
    .then((username) => {
      dispatch(signDestroySuccess());
    })
    .catch((error) => {
      dispatch(signDestroyFailure());
    });
};

// 회원 정보 수정요청
export const signUpdateRequest = () => async (dispatch) => {
  dispatch(signUpdateStart());
  await axios
    .put("/auth/update")
    .then((response) => {
      dispatch(signUpdateSuccess());
    })
    .catch((error) => {
      dispatch(signUpdateFailure());
    });
};

// 비밀번호 확인요청
export const confirmPwd = ({ user }) => async (dispatch) => {
  dispatch(confirm());
  await axios
    .post("auth/confirm", { ...user })
    .then(() => {
      dispatch(confirmPassword());
    })
    .catch((error) => {
      dispatch(confirmPasswordError(error));
    });
};

// 프로필사진 수정요청
export const profileUpload = (formData) => async (dispatch) => {
  dispatch(profileAddStart());
  await axios
    .put("auth/profile", formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      dispatch(profileAddSuccess(response.data.profile));
      alert("프로필 업로드 완료");
    })
    .catch((error) => {
      dispatch(profileAddFailure());
      console.error(error);
    });
};

// 프로필사진 로드요청
export const profileViewer = ({ username }) => async (dispatch) => {
  dispatch(profileLoadStart());
  await axios
    .post("/auth/profile/view", { username })
    .then((response) => {
      if (response.data.success === 1) {
        dispatch(profileLoadSuccess(response.data));
      }
    })
    .catch((error) => {
      dispatch(profileLoadFailure());
      console.error(error);
    });
};
