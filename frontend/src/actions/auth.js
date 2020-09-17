import axios from 'axios';
import {
    AUTH_SIGNIN,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_FAILURE,
    AUTH_SIGNOUT,
    AUTH_SIGNOUT_ERROR,
    AUTH_SIGNUP,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAILURE
} from './ActionTypes';


export const signIn = () => {
    return {type: AUTH_SIGNIN}
}

export const signUp = () => {
    return {type: AUTH_SIGNUP};
}

export const signInSuccess = (email) => {
    return {
        type: AUTH_SIGNIN_SUCCESS,
        email:email
    };
}

export const signInFailure = (error) => {
    return {type: AUTH_SIGNIN_FAILURE,error:error};
}

export const signUpSuccess = () => {
    return {type: AUTH_SIGNUP_SUCCESS};
}

export const signUpFailure = (error) => {
    return {type: AUTH_SIGNUP_FAILURE,error:error};
}

export const signOut = () => {
    return {type: AUTH_SIGNOUT};
}

export const signOutError = (error) => {
    return {type: AUTH_SIGNOUT_ERROR,error:error};
}

// 회원가입
export const signUpRequest = (email, nickname, password) => async dispatch => {
    dispatch(signUp());
    await axios.post('/auth/signup', {email, nickname, password})
    .then(response => {
        dispatch(signUpSuccess());
    }).catch(error => {
        dispatch(signUpFailure(error));
    });
};

// 로그인
export const signInRequest = (email, password) => async dispatch => {
    dispatch(signIn());
    await axios.post('/auth/login', {email, password})
    .then(response => {
        dispatch(signInSuccess(email));
    }).catch(error => {
        dispatch(signInFailure(error));
    });
}

// 로그아웃
export const signOutRequest = () => async dispatch => {
    await axios.post('/auth/signOut')
        .then(response => {
            dispatch(signOut());
        }).catch(error=>{
            dispatch(signOutError(error));
        });
};


