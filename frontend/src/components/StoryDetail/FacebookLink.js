import React, { useCallback } from "react";
import styled from "styled-components";

const FacebookLinkStyle = styled.div`
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

const FacebookLink = () => {
  const onClickHandler = useCallback(() => {
    // 배포시 수정
    // const url = document.location.href;
    const url = "hugus.ga";
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "",
      "scrollbars=no, width=600, height=600"
    );
    return false;
  }, []);

  return (
    <FacebookLinkStyle>
      <img src="/icons/facebook.png" onClick={onClickHandler} />
    </FacebookLinkStyle>
  );
};

export default FacebookLink;
