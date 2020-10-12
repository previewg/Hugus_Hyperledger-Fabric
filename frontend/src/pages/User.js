import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SignIn, SignUp } from "components";

const User = () => {
  const signInBtn = useSelector((state) => state.user.signInBtn);
  const signUpBtn = useSelector((state) => state.user.signUpBtn);

  useEffect(() => {}, [signInBtn, signUpBtn]);

  if (signUpBtn) return <SignUp />;
  if (signInBtn) return <SignIn />;
  return null;
};

export default User;
