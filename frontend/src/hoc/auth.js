import React from "react";
import { useSelector } from "react-redux";

export default (Component, option, admin = null) => {
  // null -> 누구나 출입이 가능한 페이지 (home)
  // true -> 로그인한 유저만 출입이 가능한 페이지
  // false -> 로그인한 유저는 출입이 불가능한 페이지

  const AuthenticateCheck = (props) => {
    const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
    const email = useSelector((state) => state.auth.user.email);

    if (option) {
      if (!isLoggedIn) props.history.goBack();
      else {
        if (admin) {
          if (email === "admin@admin") {
            return <Component isLoggedIn={isLoggedIn} {...props} />;
          } else props.history.goBack();
        }
        return <Component isLoggedIn={isLoggedIn} {...props} />;
      }
    } else {
      return <Component isLoggedIn={isLoggedIn} {...props} />;
    }
  };

  return AuthenticateCheck;
};
