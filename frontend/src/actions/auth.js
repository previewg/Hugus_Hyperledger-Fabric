import axios from "axios";
import { signInBtnIsClicked } from "./user";

export const AUTH_INIT = "AUTH_INIT";

// SignIn
export const AUTH_SIGNIN = "AUTH_SIGNIN";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAILURE = "AUTH_SIGNIN_FAILURE";

// SignOut
export const AUTH_SIGNOUT = "AUTH_SIGNOUT";
export const AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS";
export const AUTH_SIGNOUT_FAILURE = "AUTH_SIGNOUT_FAILURE";

// KakaoSignIn
export const AUTH_KAKAO_SIGNIN_SUCCESS = "AUTH_KAKAO_SIGNIN_SUCCESS";
// NaverSignIn
export const AUTH_NAVER_SIGNIN_SUCCESS = "AUTH_NAVER_SIGNIN_SUCCESS";

// SignDestroy
export const AUTH_SIGN_DESTROY = "AUTH_SIGN_DESTROY";
export const AUTH_SIGN_DESTROY_SUCCESS = "AUTH_SIGN_DESTROY_SUCCESS";
export const AUTH_SIGN_DESTROY_FAILURE = "AUTH_SIGN_DESTROY_FAILURE";

// SignUpdate
export const AUTH_SIGN_UPDATE = "AUTH_SIGN_UPDATE";
export const AUTH_SIGN_UPDATE_SUCCESS = "AUTH_SIGN_UPDATE_SUCCESS";
export const AUTH_SIGN_UPDATE_FAILURE = "AUTH_SIGN_UPDATE_FAILURE";

// Profile Add
export const PROFILE_ADD = "ADD_PROFILE";
export const PROFILE_ADD_SUCCESS = "ADD_PROFILE_SUCCESS";
export const PROFILE_ADD_FAILURE = "ADD_PROFILE_FAILURE";

// Profile Load
export const PROFILE_LOAD = "PROFILE_LOAD";
export const PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS";
export const PROFILE_LOAD_FAILURE = "PROFILE_LOAD_FAILURE";

//Update Profile Information
export const MY_INFO_UPDATE = "MY_INFO_UPDATE";
export const MY_INFO_UPDATE_SUCCESS = "MY_INFO_UPDATE_SUCCESS";
export const MY_INFO_UPDATE_FAILURE = "MY_INFO_UPDATE_FAILURE";

export const authInit = () => {
  return { type: AUTH_INIT };
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

export const signInFailure = (error) => {
  return { type: AUTH_SIGNIN_FAILURE, error: error };
};

// 카카오 로그인
export const kakaoSignInSuccess = (data) => {
  return {
    type: AUTH_KAKAO_SIGNIN_SUCCESS,
    data: data,
  };
};

// 네이버 로그인
export const naverSignInSuccess = (data) => {
  return {
    type: AUTH_NAVER_SIGNIN_SUCCESS,
    data: data,
  };
};

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
//UPDATE INFO
export const updateInfoStart = () => {
  return { type: MY_INFO_UPDATE };
};
export const updateInfoSuccess = (data) => {
  return { type: MY_INFO_UPDATE_SUCCESS, data: data };
};
export const updateInfoFailure = (code) => {
  return { type: MY_INFO_UPDATE_FAILURE, code:code };
};

// 로그인 요청
export const signInRequest = ({ user }) => async (dispatch) => {
  dispatch(signInStart());
  await axios
    .post("/auth/signIn", { ...user })
    .then((response) => {
      if (response.data.success === 1) {
        dispatch(signInSuccess(response.data));
        dispatch(signInBtnIsClicked());
      }
    })
    .catch((error) => {
      dispatch(signInFailure(error.response.data.code));
    });
};

// 카카오 로그인 요청
export const kakaoSignInRequest = ({ res }) => async (dispatch) => {
  dispatch(signInStart());
  await axios
    .post("/auth/kakao", { ...res })
    .then((response) => {
      if (response.data.success === 1) {
        dispatch(kakaoSignInSuccess(response.data));
      }
    })
    .catch((error) => {
      dispatch(signInFailure(error));
    });
};

// 네이버 로그인 요청
export const naverSignInRequest = (res) => async (dispatch) => {
  dispatch(signInStart());
  await axios
    .post("/auth/naver", { ...res })
    .then((response) => {
      if (response.data.success === 1) {
        dispatch(naverSignInSuccess(response.data));
      }
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
export const signDestroyRequest = (email) => async (dispatch) => {
  dispatch(signDestroyStart());
  await axios
    .post("/auth/destroy", { email: email })
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

// 프로필사진 수정요청
export const profileUpload = (formData) => async (dispatch) => {
  // document.cookie = "hugus=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  dispatch(profileAddStart());
  await axios
    .put("myPage/profile", formData, {
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

//UPDATE INFO 요청
export const updateInfo = (userInfo) => async (dispatch) => {
  dispatch(updateInfoStart());
  await axios
      .post("/myPage/update",{userInfo})
      .then((response)=>{
        if(response.data.success===1){
          dispatch(updateInfoSuccess(response.data));
        }else dispatch(updateInfoFailure(response.data.code))
      })
      .catch((error)=>{
        dispatch(updateInfoFailure(error))
      })
}

