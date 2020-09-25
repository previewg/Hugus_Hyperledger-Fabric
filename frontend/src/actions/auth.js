import axios from 'axios';
import * as types from './ActionTypes';
import {signInBtnIsClicked, signUpBtnIsClicked} from "./user";


export const signIn = () => {
    return {type: types.AUTH_SIGNIN}
}

export const signUp = () => {
    return {type: types.AUTH_SIGNUP};
}

export const signInSuccess = (nickname, password) => {
    return {
        type: types.AUTH_SIGNIN_SUCCESS,
        nickname: nickname,
        password: password
    };
}

export const signInFailure = (error) => {
    return {type: types.AUTH_SIGNIN_FAILURE, error: error};
}

export const signUpSuccess = () => {
    return {type: types.AUTH_SIGNUP_SUCCESS};
}

export const signUpFailure = (error) => {
    return {type: types.AUTH_SIGNUP_FAILURE, error: error};
}

export const signOut = () => {
    return {type: types.AUTH_SIGNOUT};
}

export const signOutError = (error) => {
    return {type: types.AUTH_SIGNOUT_ERROR, error: error};
}
export const signDestroy = () => {
    return {type: types.AUTH_SIGN_DESTORY};
}
export const signDestroyError = () => {
    return {type: types.AUTH_SIGN_DESTORY_ERROR};
}
export const signUpdate = () => {
    return {type: types.AUTH_SIGN_UPDATE};
}
export const signUpdateError = () => {
    return {type: types.AUTH_SIGN_UPDATE_ERROR};
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
            dispatch(signInSuccess(response.data.nickname, response.data.password));
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
        }).catch(error => {
            dispatch(signOutError(error));
        });
};
// 삭제

export const signDestroyRequest = (username) => async dispatch => {
    await axios.post('/auth/destroy', {username})
        .then(username => {
            dispatch(signDestroy());
        }).catch(error => {
            dispatch(signDestroyError(error));
        })
}
export const signUpdateRequest = () => async dispatch => {
    await axios.post('/auth/update')
        .then(response => {
            dispatch(signUpdate());
        }).catch(error => {
            dispatch(signUpdateError(error));
        })
}
export const profileUpload = (formData) => async dispatch => {
    await axios.put('auth/profile', formData, {headers: {'content-type': 'multipart/form-data'}})
        .then(response => {
            alert('프로필 업로드 완료')
        }).catch(error => {
            alert('실패!!!!!!!!!!!!!')
        })
}