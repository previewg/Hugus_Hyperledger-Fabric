import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpBtnIsClicked } from "../../actions/user";

const HugusInfoStyle = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  height: 300px;
  background-color: #e9e9e9;
  margin-top: 100px;
  align-items: center;
  margin-bottom: 200px;
  .info__left {
    justify-self: center;
    display: flex;
    align-items: center;
    .slogan {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 25px;
      cursor: pointer;
      > p {
        margin: 10px;
        :nth-child(1) {
          color: gray;
        }
        :nth-child(2) {
          font-weight: bold;
        }
      }
    }
    > div:nth-child(2) {
      cursor: pointer;
      margin-left: 50px;
      width: 70px;
      height: 70px;
      border-radius: 35px;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 40px;
      }
    }
  }
  .info__right {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: space-around;

    a {
      outline: none;
      text-decoration: none;
      border: none;
      font-size: 16px;
      width: 250px;
      height: 250px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      background-size: 30%;
      background-repeat: no-repeat;
      background-position: center;
      align-items: center;
      transition: all 0.3s ease-in-out;
      :nth-child(2) {
        background-size: 40%;
      }
      > p {
        color: black;
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
        font-size: 20px;
        border-radius: 100px;
        background-color: rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        color: white;
      }
      :hover {
        color: orange;
        background-size: 40%;
        :nth-child(2) {
          background-size: 50%;
        }
        > p {
          color: transparent;
          font-size: 25px;
          backdrop-filter: blur(1px);
          width: 250px;
          height: 250px;
          border-radius: 125px;
          background-color: transparent;
        }
      }
    }
  }
`;

const HugusInfo = () => {
  const dispatch = useDispatch();
  return (
    <HugusInfoStyle>
      <article className="info__left">
        <div className="slogan" onClick={() => dispatch(signUpBtnIsClicked())}>
          <p>회원가입하고</p>
          <p>허그에 참여하세요!</p>
        </div>
        <div onClick={() => dispatch(signUpBtnIsClicked())}>
          <img src="/icons/Nexticon.png" />
        </div>
      </article>
      <article className="info__right">
        <Link to="/info" style={{ backgroundImage: 'url("/icons/hugus.png")' }}>
          <p>허그 소개</p>
        </Link>
        <Link
          to="/block"
          style={{ backgroundImage: 'url("/icons/blockchain.svg")' }}
        >
          <p>실시간 블록체인 정보</p>
        </Link>
      </article>
    </HugusInfoStyle>
  );
};

export default React.memo(HugusInfo);
