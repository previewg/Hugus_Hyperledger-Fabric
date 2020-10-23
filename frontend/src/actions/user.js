export const SIGNIN_BTN_IS_CLICKED = "SIGNIN_BTN_IS_CLICKED";
export const SIGNUP_BTN_IS_CLICKED = "SIGNUP_BTN_IS_CLICKED";

// 로그인 버튼 클릭
export const signInBtnIsClicked = () => {
  return { type: SIGNIN_BTN_IS_CLICKED };
};

// 회원가입 버튼 클릭
export const signUpBtnIsClicked = () => {
  return { type: SIGNUP_BTN_IS_CLICKED };
};
