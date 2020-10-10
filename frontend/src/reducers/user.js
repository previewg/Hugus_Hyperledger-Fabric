import { SIGNIN_BTN_IS_CLICKED, SIGNUP_BTN_IS_CLICKED } from "../actions/user";

const initialState = {
  signInBtn: false,
  signUpBtn: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_BTN_IS_CLICKED:
      if (state.signInBtn) {
        return { signInBtn: false };
      } else {
        return { signInBtn: true, signUpBtn: false };
      }
    case SIGNUP_BTN_IS_CLICKED:
      if (state.signUpBtn) {
        return { signUpBtn: false };
      } else {
        return { signUpBtn: true, signInBtn: false };
      }
    default:
      return state;
  }
}
