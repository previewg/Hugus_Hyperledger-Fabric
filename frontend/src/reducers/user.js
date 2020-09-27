import * as types from "../actions/ActionTypes";

const initialState = {
  signInBtn: false,
  signUpBtn: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.SIGNIN_BTN_IS_CLICKED:
      if (state.signInBtn) {
        return { signInBtn: false };
      } else {
        return { signInBtn: true, signUpBtn: false };
      }
    case types.SIGNUP_BTN_IS_CLICKED:
      if (state.signUpBtn) {
        return { signUpBtn: false };
      } else {
        return { signUpBtn: true, signInBtn: false };
      }
    default:
      return state;
  }
}
