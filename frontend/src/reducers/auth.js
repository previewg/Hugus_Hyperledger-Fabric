import {
  AUTH_INIT,
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILURE,
  AUTH_KAKAO_SIGNIN_SUCCESS,
  AUTH_NAVER_SIGNIN_SUCCESS,
  AUTH_SIGN_DESTROY,
  AUTH_SIGN_DESTROY_SUCCESS,
  AUTH_SIGN_DESTROY_FAILURE,
  AUTH_SIGN_UPDATE,
  AUTH_SIGN_UPDATE_SUCCESS,
  AUTH_SIGN_UPDATE_FAILURE,
  PROFILE_ADD,
  PROFILE_ADD_SUCCESS,
  PROFILE_ADD_FAILURE,
  MY_INFO_UPDATE,
  MY_INFO_UPDATE_SUCCESS,
  MY_INFO_UPDATE_FAILURE,
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
  },
  user: {
    isLoggedIn: getCookie("hugus") || false,
    nickname: parseJwt(getCookie("hugus")).nickname || "",
    profile: parseJwt(getCookie("hugus")).profile || "",
    email: parseJwt(getCookie("hugus")).email || "",
    social: parseJwt(getCookie("hugus")).social || "",
    hash_email: parseJwt(getCookie("hugus")).hash_email || "",
    phone_number: parseJwt(getCookie("hugus")).phone_number || "",
  },
  naverObj: new window.naver.LoginWithNaverId({
    clientId: "edTCgFsetZW7QgyeUmNJ",
    callbackUrl: "http://localhost:3001/auth/naver",
    isPopup: false,
    loginButton: { color: "green", type: 3, height: 60 },
  }),
  profileChange: {
    status: "INIT",
  },
  signOut: {
    status: "INIT",
  },
  signDestroy: {
    status: "INIT",
  },
  myPage_User: {
    status: "INIT",
    nickname:'',
    phone:'',
    success:'',
    code:'',
  }
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_INIT:
      return update(state, {
        signIn: {
          status: { $set: "INIT" },
        },
        signOut: {
          status: { $set: "INIT" },
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
        user: {
          isLoggedIn: { $set: true },
          nickname: { $set: action.data.nickname },
          profile: { $set: action.data.profile },
          email: { $set: action.data.email },
          hash_email: { $set: action.data.hash_email },
          phone_number:{$set:action.data.phone_number}

        },
      });
    case AUTH_SIGNIN_FAILURE:
      return update(state, {
        signIn: {
          status: { $set: "FAILURE" },
        },
      });

    //카카오 로그인
    case AUTH_KAKAO_SIGNIN_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "SUCCESS" },
        },
        user: {
          isLoggedIn: { $set: true },
          nickname: { $set: action.data.nickname },
          profile: { $set: action.data.profile },
          email: { $set: action.data.email },
          social: { $set: action.data.social },
          hash_email: { $set: action.data.hash_email },
        },
      });

    //네이버 로그인
    case AUTH_NAVER_SIGNIN_SUCCESS:
      return update(state, {
        signIn: {
          status: { $set: "SUCCESS" },
        },
        user: {
          isLoggedIn: { $set: true },
          nickname: { $set: action.data.nickname },
          profile: { $set: action.data.profile },
          email: { $set: action.data.email },
          social: { $set: action.data.social },
          hash_email: { $set: action.data.hash_email },
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
        user: {
          isLoggedIn: { $set: false },
          nickname: { $set: "" },
          profile: { $set: "" },
          email: { $set: "" },
          hash_email: { $set: "" },
        },
        profileChange: {
          status: { $set: "INIT" },
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
        user: {
          isLoggedIn: { $set: false },
          nickname: { $set: "" },
          profile: { $set: "" },
          email: { $set: "" },
          hash_email: { $set: "" },
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

    // 프로필 업로드
    case PROFILE_ADD:
      return update(state, {
        profileChange: {
          status: { $set: "WAITING" },
        },
      });
    case PROFILE_ADD_SUCCESS:
      return update(state, {
        profileChange: {
          status: { $set: "SUCCESS" },
        },
        user: {
          profile: { $set: action.data },
        },
      });
      //Update information
    case MY_INFO_UPDATE:
      return update(state, {
        myPage_User: {
          status: {$set: "WAITING"},
          code:{$set:''},
        },
      });

    case MY_INFO_UPDATE_SUCCESS:
      return update(state, {
        user:{
          nickname:{$set:action.data.user_nickname}
        },
        myPage_User: {
          status: {$set: "SUCCESS"},
          nickname: {$set:action.data.user_nickname},
          phone:{$set:action.data.phone_number},
          success:{$set:action.data.success},
        },
      });
    case MY_INFO_UPDATE_FAILURE:
      return update(state, {
        myPage_User: {
          code:{$set:action.code},
          status: {$set: "FAILURE"},
        }
      });

    default:
      return state;
  }
}
