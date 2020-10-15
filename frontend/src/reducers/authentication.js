import {
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILURE,
  AUTH_KAKAO_SIGNIN,
  AUTH_KAKAO_SUCCESS,
  AUTH_KAKAO_FAILURE,
  AUTH_SIGN_DESTROY,
  AUTH_SIGN_DESTROY_SUCCESS,
  AUTH_SIGN_DESTROY_FAILURE,
  AUTH_SIGN_UPDATE,
  AUTH_SIGN_UPDATE_SUCCESS,
  AUTH_SIGN_UPDATE_FAILURE,
  CONFIRM,
  CONFIRM_PWD,
  CONFIRM_PWD_ERROR,
  PROFILE_ADD,
  PROFILE_ADD_SUCCESS,
  PROFILE_ADD_FAILURE,
  PROFILE_LOAD,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAILURE,
} from "../actions/auth";
import update from "react-addons-update";

function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function parseJwt(token) {
  if (!token) return { nickname: "" };
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const initialState = {
  signIn: {
    status: "INIT",
    error: -1,
  },
  signUp: {
    status: "INIT",
    error: -1,
  },
  status: {
    confirm_pwd: "INIT",
    profile_path: parseJwt(getCookie("hugus")).profile || null,
    valid: false,
    isLoggedIn: getCookie("hugus") || false,
    currentUser: parseJwt(getCookie("hugus")).nickname || "",
  },
  profile: {
    status: "INIT",
  },
  signOut: {
    status: "INIT",
  },
  signDestroy: {
    status: "INIT",
  },
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    // 회원가입
    case AUTH_SIGNUP:
      return update(state, {
        signUp: {
          status: { $set: "WAITING" },
        },
      });
    case AUTH_SIGNUP_SUCCESS:
      return update(state, {
        signUp: {
          status: { $set: "SUCCESS" },
        },
      });
    case AUTH_SIGNUP_FAILURE:
      return update(state, {
        signUp: {
          status: { $set: "FAILURE" },
          error: { $set: action.error },
        },
      });

    // 로그인
    case AUTH_SIGNIN:
      return update(state, {
        signIn: {
          status: { $set: "WAITING" },
        },
      });
    case AUTH_SIGNIN_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "SUCCESS" },
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.data.nickname },
          profile_path: { $set: action.data.profile },
        },
      });
    case AUTH_SIGNIN_FAILURE:
      return update(state, {
        signIn: {
          status: { $set: "FAILURE" },
          error: { $set: action.error },
        },
      });

    //카카오 로그인
    case AUTH_KAKAO_SIGNIN:
      return update(state, {
        signIn: {
          status: { $set: "WAITING" },
        },
      });
    case AUTH_KAKAO_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "SUCCESS" },
        },
        status: {
          currentUser: { $set: action.nickname },
          isLoggedIn: { $set: true },
        },
      });
    case AUTH_KAKAO_FAILURE:
      return update(state, {
        signIn: {
          status: { $set: "FAILURE" },
        },
      });

    // 로그아웃
    case AUTH_SIGNOUT:
      return update(state, {
        signOut: {
          status: { $set: "WAITING" },
        },
      });
    case AUTH_SIGNOUT_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "INIT" },
        },
        status: {
          isLoggedIn: { $set: false },
          currentUser: { $set: "" },
        },
        profile: {
          status: { $set: "INIT" },
          data: { $set: null },
        },
        signOut: {
          status: { $set: "SUCCESS" },
        },
      });

    case AUTH_SIGNOUT_FAILURE:
      return update(state, {
        signOut: {
          status: { $set: "FAILURE" },
        },
      });

    //회원탈퇴
    case AUTH_SIGN_DESTROY:
      return update(state, {
        signDestroy: {
          status: { $set: "WAITING" },
        },
      });

    case AUTH_SIGN_DESTROY_SUCCESS:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          currentUser: { $set: "" },
        },
        signDestroy: {
          status: { $set: "SUCCESS" },
        },
      });
    case AUTH_SIGN_DESTROY_FAILURE:
      return update(state, {
        signDestroy: {
          status: { $set: "FAILURE" },
        },
      });

    case CONFIRM:
      return update(state, {
        status: {
          confirm_pwd: { $set: "WAITING" },
        },
      });
    case CONFIRM_PWD:
      return update(state, {
        status: {
          confirm_pwd: { $set: "SUCCESS" },
        },
      });
    case CONFIRM_PWD_ERROR:
      return update(state, {
        status: {
          confirm_pwd: { $set: "FAILURE" },
        },
      });

    // 프로필 업로드
    case PROFILE_ADD:
      return update(state, {
        profile: {
          status: { $set: "WAITING" },
        },
      });
    case PROFILE_ADD_SUCCESS:
      return update(state, {
        profile: {
          status: { $set: "SUCCESS" },
        },
        status: {
          profile_path: { $set: action.data },
        },
      });

    case PROFILE_LOAD:
      return update(state, {
        profile: {
          status: { $set: "WAITING" },
        },
      });
    case PROFILE_LOAD_SUCCESS:
      return update(state, {
        profile: {
          status: { $set: "SUCCESS" },
          data: { $set: action.data.data.user_profile },
        },
      });
    case PROFILE_LOAD_FAILURE:
      return update(state, {
        profile: {
          status: { $set: "FAILURE" },
        },
      });

    default:
      return state;
  }
}
