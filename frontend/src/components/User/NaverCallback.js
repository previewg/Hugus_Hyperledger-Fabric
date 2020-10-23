import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { naverSignInRequest } from "../../actions/auth";

const NaverCallback = (props) => {
  const naverObj = useSelector((state) => state.auth.naverObj);
  const dispatch = useDispatch();

  const NaverCallback = () => {
    naverObj.getLoginStatus((status) => {
      console.log(status);
      if (status) {
        const email = naverObj.user.getEmail();
        const name = naverObj.user.getNickName();
        let profileImage = naverObj.user.getProfileImage();
        dispatch(
          naverSignInRequest({
            email: email,
            nickname: name,
            profile: profileImage,
          })
        );
      } else {
        console.log("AccessToken이 올바르지 않습니다.");
      }
    });
    props.history.push("/");
  };

  useEffect(() => {
    NaverCallback();
  }, []);

  return null;
};

export default NaverCallback;
