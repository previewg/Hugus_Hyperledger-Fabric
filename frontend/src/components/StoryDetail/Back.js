import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BackStyle = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .back_btn {
    position: absolute;
    color: black;
    text-decoration: none;
    margin-top: 15px;
    border: none;
    background: white;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    :hover {
      color: orange;
    }
  }
`;

const Back = () => {
  return (
    <BackStyle>
      <Link className="back_btn" to="/story">
        글목록
      </Link>
    </BackStyle>
  );
};

export default Back;
