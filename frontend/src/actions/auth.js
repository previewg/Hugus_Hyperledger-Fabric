import axios from 'axios';
import * as types from './ActionTypes';
import {signInBtnIsClicked, signUpBtnIsClicked} from "./user";

export const signIn = () => {
    return {type: types.AUTH_SIGNIN}
}

export const signUp = () => {
    return {type: types.AUTH_SIGNUP};
}

export const signInSuccess = (nickname) => {
    return {
        type: types.AUTH_SIGNIN_SUCCESS,
        nickname:nickname
    };
}

export const signInFailure = (error) => {
    return {type: types.AUTH_SIGNIN_FAILURE,error:error};
}

export const signUpSuccess = () => {
    return {type: types.AUTH_SIGNUP_SUCCESS};
}

export const signUpFailure = (error) => {
    return {type: types.AUTH_SIGNUP_FAILURE,error:error};
}

export const signOut = () => {
    return {type: types.AUTH_SIGNOUT};
}

export const signOutError = (error) => {
    return {type: types.AUTH_SIGNOUT_ERROR,error:error};
}

// 회원가입
export const signUpRequest = ({user}) => async dispatch => {
    dispatch(signUp());
    await axios.post('/auth/signup', {...user})
    .then(response => {
        dispatch(signUpSuccess());
    }).catch(error => {
        dispatch(signUpFailure(error.response.data.code));
    });
};

// 로그인
export const signInRequest = ({user}) => async dispatch => {
    dispatch(signIn());
    await axios.post('/auth/signin', {...user})
    .then(response => {
        dispatch(signInSuccess(response.data.nickname));
        dispatch(signInBtnIsClicked());
    }).catch(error => {
        dispatch(signInFailure(error));
    });
}

// 로그아웃
export const signOutRequest = () => async dispatch => {
    await axios.post('/auth/signout')
        .then(response => {
            dispatch(signOut());
        }).catch(error=>{
            dispatch(signOutError(error));
        });
};