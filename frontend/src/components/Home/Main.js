import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreBtn from "./MoreBtn";

const MainStyle = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  transition: all 1.5s ease-in-out;
  opacity: ${(props) => props.opacity};
  .slogan {
    transition: all 1s ease-in-out;
    opacity: ${(props) => (props.scroll > 300 ? 0 : 1)};
    width: 80%;
    min-width: 290px;
    height: 200px;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    padding-right: 30px;

    .slogan__main {
      color: #585858;
      font-size: 80px;
      font-weight: bold;
      font-family: "Kcc", sans-serif !important;
      margin: 0;
      text-align: end;
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
      text-align: end;
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
      <MoreBtn />
    </MainStyle>
  );
};

export default Main;
