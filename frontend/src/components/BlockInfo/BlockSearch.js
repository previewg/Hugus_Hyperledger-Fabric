import React, { useRef, useState } from "react";
import styled from "styled-components";

const BlockSearchStyle = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;
  div {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      transition: all 1s ease-in-out;
      margin-right: 70px;
      width: ${(props) => (props.isClicked ? "600px" : "150px")};
      height: 40px;
      border-radius: 20px;
      border: solid 0.1px orange;
      outline: none;
      padding-left: 20px;
      font-size: 16px;
    }
    img {
      width: 20px;
      height: 20px;
      position: relative;
      right: 105px;
      cursor: pointer;
    }
  }
`;

const BlockSearch = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [placeholder, setPlaceholder] = useState("SEARCH");
  const [img, setImg] = useState("/icons/Search.png");
  const here = useRef();

  const inputOpen = () => {
    setIsClicked(true);
    setPlaceholder("User ID, Tx ID");
    setImg("/icons/Multiple.png");
    here.current.focus();
  };

  const inputClose = () => {
    setIsClicked(false);
    setPlaceholder("SEARCH");
    setImg("/icons/Search.png");
  };
  return (
    <BlockSearchStyle isClicked={isClicked}>
      <div>
        <input ref={here} onClick={inputOpen} placeholder={placeholder} />
        <img onClick={inputClose} src={img} />
      </div>
    </BlockSearchStyle>
  );
};

export default BlockSearch;
