// import React from "react";
// import KakaoLogin from "react-kakao-login";
// import { kakao_SignIn, kakaosignInRequest } from "../../actions/auth";
// import { useDispatch, useSelector } from "react-redux";
//
// const KakaoLo = () => {
//   const dispatch = useDispatch();
//
//   const responseKakao = async (res) => {
//     await dispatch(kakaosignInRequest({ res }));
//   };
//   const responseFail = (err) => {
//     alert(err);
//   };
//
//   return (
//     <>
//       <KakaoLogin
//         jsKey={"aa70349a6dc59493a45fc12e6ca3a220"}
//         buttonText={"Kakao 계정으로 로그인"}
//         onSuccess={responseKakao}
//         onFailure={responseFail}
//         getProfile={true}
//       />
//     </>
//   );
// };
// export default KakaoLo;
