import React, { useEffect } from "react";
import styled from "styled-components";

const InfoStyle = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 70px;
`;

const Info = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <InfoStyle>
      <div>여기 인포페이지</div>
    </InfoStyle>
  );
};

export default Info;
