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
    padding-left: 90px;
    input {
      transition: all 0.7s ease-in-out;
      margin-right: 70px;
      width: ${(props) => (props.isClicked ? "600px" : "320px")};
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
  const [search, setSearch] = useState("");
  const here = useRef();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const inputOpen = () => {
    setIsClicked(true);
    setPlaceholder("User ID, Tx ID");
    setImg("/icons/Multiple.png");
    here.current.focus();
  };

  const inputClose = () => {
    setSearch("");
    setIsClicked(false);
    setPlaceholder("SEARCH");
    setImg("/icons/Search.png");
  };
  return (
    <BlockSearchStyle isClicked={isClicked}>
      <div>
        <input
          ref={here}
          onClick={inputOpen}
          value={search}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
        <img onClick={inputClose} src={img} />
      </div>
    </BlockSearchStyle>
  );
};

export default BlockSearch;
