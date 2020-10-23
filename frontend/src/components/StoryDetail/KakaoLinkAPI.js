import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

const KakaoLinkStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  img {
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
`;

const KakaoLinkAPI = () => {
  const { Kakao } = window;

  const KakaoLinkAPI = useCallback(() => {
    Kakao.Link.createCustomButton({
      container: "#kakao__link",
      templateId: 39225,
      installTalk: true,
    });
  }, []);

  useEffect(() => {
    KakaoLinkAPI();
  }, []);
  return (
    <KakaoLinkStyle>
      <img
        id="kakao__link"
        alt="kakao__link"
        className="kakao__link"
        src="/icons/kakao.png"
      />
    </KakaoLinkStyle>
  );
};

export default KakaoLinkAPI;
