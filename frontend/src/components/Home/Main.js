import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MainStyle = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  justify-content: flex-end;
  align-items: center;
  transition: all 1.5s ease-in-out;
  opacity: ${(props) => props.opacity};
  .slogan {
    transition: all 1s ease-in-out;
    opacity: ${(props) => (props.scroll > 300 ? 0 : 1)};
    position: relative;
    top: 50px;
    left: ${(props) => (props.scroll > 300 ? 500 : 0)}px;
    width: 30%;
    min-width: 290px;
    height: 300px;
    display: ${(props) => (props.scroll > 600 ? "none" : "flex")};
    flex-direction: column;
    justify-content: space-around;
    .slogan__main {
      font-size: 80px;
      font-weight: bold;
      font-family: "Kcc", sans-serif !important;
      margin: 0;
      > p {
        margin: 10px;
        strong {
          color: orange;
        }
      }
    }
    .slogan__sub {
      color: gray;
      padding: 20px;
    }
  }
`;

const Main = ({ scroll }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <MainStyle
      scroll={scroll}
      opacity={opacity}
      style={{
        backgroundImage: 'url("/pics/main.jpg")',
      }}
    >
      <article className="slogan">
        <div className="slogan__main">
          <p>마음을 담는 기부</p>
          <p>
            <strong>허그</strong>에 담다
          </p>
        </div>
        <div className="slogan__sub">
          <p>투명하고 자율적인</p>
          <p>블록체인 기반 기부플랫폼</p>
        </div>
      </article>
    </MainStyle>
  );
};

export default Main;
