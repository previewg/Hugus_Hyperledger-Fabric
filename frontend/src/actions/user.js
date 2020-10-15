// Action Types
import axios from "axios";

import {AUTH_SIGNUP, AUTH_SIGNUP_FAILURE, AUTH_SIGNUP_SUCCESS} from "./auth";

export const SIGNIN_BTN_IS_CLICKED = "SIGNIN_BTN_IS_CLICKED";
export const SIGNUP_BTN_IS_CLICKED = "SIGNUP_BTN_IS_CLICKED";
// 이메일 인증 메일 발송
export const EMAIL_SEND = "EMAIL_SEND";
export const EMAIL_SEND_SUCCESS = "EMAIL_SEND_SUCCESS";
export const EMAIL_SEND_FAILURE = "EMAIL_SEND_FAILURE";

// 이메일 인증
export const EMAIL_CONFIRM = "EMAIL_CONFIRM";
export const EMAIL_CONFIRM_SUCCESS = "EMAIL_CONFIRM_SUCCESS";
export const EMAIL_CONFIRM_FAILURE = "EMAIL_CONFIRM_FAILURE";

// 로그인 버튼 클릭
export const signInBtnIsClicked = () => {
    return {type: SIGNIN_BTN_IS_CLICKED};
};

// 회원가입 버튼 클릭
export const signUpBtnIsClicked = () => {
    return {type: SIGNUP_BTN_IS_CLICKED};
};

// 이메일 인증 메일 발송
export const emailSendStart = () => {
    return {type: EMAIL_SEND};
};

export const emailSendSuccess = () => {
    return {type: EMAIL_SEND_SUCCESS};
};

export const emailSendFailure = (error) => {
    return {type: EMAIL_SEND_FAILURE, error: error};
};
// 이메일 인증
export const emailConfirmStart = () => {
    return {type: EMAIL_CONFIRM};
};

export const emailConfirmSuccess = (data) => {
    return {type: EMAIL_CONFIRM_SUCCESS, data: data};
};

export const emailConfirmFailure = (error) => {
    return {type: EMAIL_CONFIRM_FAILURE, error: error};
};


export const emailSendRequest = ({user}) => async (dispatch) => {
    dispatch(emailSendStart());
    await axios
        .post("/auth/requestEmail", {...user})
        .then((response) => {
            dispatch(emailSendSuccess(response));
        })
        .catch((error) => {
            dispatch(emailSendFailure(error))
        });
};
//이메일 인증 확인
export const emailConfirmRequest = () => async (dispatch) => {
    dispatch(emailConfirmStart());
    await axios
        .get("/auth/confirmEmail")
        .then((response) => {
        })
        .catch((error) => {
            dispatch(emailConfirmFailure())
            console.log(error)
        })
}

