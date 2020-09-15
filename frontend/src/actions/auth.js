import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';
/* ====== AUTH ====== */

/* LOGIN */
export function loginRequest(email, password) {
    return (dispatch) => {
        dispatch(login());

        return axios.post('http://localhost:3000/auth/login', {email, password})
            .then((response) => {
                dispatch(loginSuccess(email));
            }).catch((error) => {
                dispatch(loginFailure());
            });
    }
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(email, nickname, password) {
    return (dispatch) => {
        //inform register API is starting
        dispatch(register());
        return axios.post('http://localhost:3000/auth/signup', {email, nickname, password})
            .then((response) => {
                dispatch(registerSuccess());
            }).catch((error) => {
                //error.response.data.code
                dispatch(registerFailure());
            });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        // error
    };
}

/* LOGOUT thunk함수
*/
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('http://localhost:3000/auth/logout')
            .then((response) => {
                dispatch(logout());
            });
    };
}

//action.type값이 'AUTH_LOGOUT'인 객체를 리턴하는 액션생성자 함수
export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

