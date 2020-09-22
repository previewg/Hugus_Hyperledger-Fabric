import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';


function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: getCookie('hugus') || false,
        currentUser: parseJwt(getCookie('hugus')).nickname || ''
    }
};


export default function authentication(state = initialState, action) {
    switch (action.type) {
        // 회원가입
        case types.AUTH_SIGNUP:
            return update(state, {
                register: {
                    status: {$set: 'WAITING'},
                    error: {$set: -1}
                }
            });
        case types.AUTH_SIGNUP_SUCCESS:
            return update(state, {
                register: {
                    status: {$set: 'SUCCESS'},
                }
            });
        case types.AUTH_SIGNUP_FAILURE:
            return update(state, {
                register: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        
        // 로그인
        case types.AUTH_SIGNIN:
            return update(state, {
                login: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.AUTH_SIGNIN_SUCCESS:
            return update(state, {
                login: {
                    status: {$set: 'SUCCESS'}
                },
                status: {
                    isLoggedIn: {$set: true},
                    currentUser: {$set: action.nickname}
                },
            });
        case types.AUTH_SIGNIN_FAILURE:
            return update(state, {
                login: {
                    status: {$set: 'FAILURE'}
                }
            });
        
        // 로그아웃
        case types.AUTH_SIGNOUT:
            return update(state, {
                status: {
                    isLoggedIn: {$set: false},
                    currentUser: {$set: ''}
                }
            });

        case types.AUTH_SIGNOUT_ERROR:
            return update(state, {
                status: {
                    isLoggedIn: {$set: false},
                    currentUser: {$set: ''}
                }
            });
        default:
            return state;

    }
}