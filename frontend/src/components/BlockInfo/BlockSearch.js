import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const BlockSearchStyle = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;
  > div {
    width: ${(props) => (props.isClicked ? "650px" : "320px")};
    border-radius: 20px;
    border: solid 0.1px orange;
    transition: all 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    .search_type {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: solid 0.1px orange;
      width: 80px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      p {
        color: orange;
        font-weight: bold;
        margin: 0px;
        width: 80px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        background-color: ${(props) =>
          props.typeChangeReady ? "orange" : "transparent"};
        color: ${(props) => (props.typeChangeReady ? "white" : "orange")};
      }
      p:nth-child(1) {
        border: 1px solid orange;
        border-top-left-radius: 20px;
        border-bottom-left-radius: ${(props) =>
          props.typeChangeReady ? 0 : "20px"};
      }
      p:nth-child(2) {
        background-color: #fdbe49;
        opacity: ${(props) => (props.typeChangeReady ? 1 : 0)};
        position: absolute;
        border: 1px solid #fdbe49;
        border-top: white solid 0.1px;
        border-bottom: white solid 0.1px;
        top: ${(props) => (props.typeChangeReady ? "161px" : "121px")};
      }
      p:nth-child(3) {
        background-color: #ffd98f;
        opacity: ${(props) => (props.typeChangeReady ? 1 : 0)};
        position: absolute;
        top: ${(props) => (props.typeChangeReady ? "203px" : "163px")};
        border-left: 1px solid #ffd98f;
        border-right: 1px solid #ffd98f;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
    input {
      transition: all 0.5s ease-in-out;
      margin-left: 10px;
      width: ${(props) => (props.isClicked ? "550px" : "200px")};
      border: none;
      height: 38px;
      outline: none;
      font-size: 16px;
    }
    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-right: 15px;
    }
  }
`;

const BlockSearch = ({ history }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [placeholder, setPlaceholder] = useState("SEARCH");
  const [img, setImg] = useState("/icons/Search.png");
  const [search, setSearch] = useState("");
  const [typeChangeReady, setTypeChangeReady] = useState(false);
  const [typeList, setTypeList] = useState(["BLOCK", "TX", "USER"]);

  const here = useRef();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.key === "Enter") {
      history.push(`/search/${typeList[0].toLowerCase()}/${e.target.value}`);
    }
  };

  const typeChangeHandler = (idx) => {
    if (!typeChangeReady) {
      setTypeChangeReady(true);
    } else {
      let type = typeList[idx];
      let newTypeList = typeList.filter((picked) => picked !== type);
      newTypeList.unshift(type);
      setTypeList(newTypeList);
      if (type === "BLOCK") setPlaceholder("BLOCK HASH");
      else if (type === "TX") setPlaceholder("TX HASH");
      else if (type === "USER") setPlaceholder("USER HASH");
      setTypeChangeReady(false);
    }
  };

  const inputOpen = () => {
    setIsClicked(true);
    if (typeList[0] === "BLOCK") setPlaceholder("BLOCK HASH");
    else if (typeList[0] === "TX") setPlaceholder("TX HASH");
    else if (typeList[0] === "USER") setPlaceholder("USER HASH");
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
    <BlockSearchStyle isClicked={isClicked} typeChangeReady={typeChangeReady}>
      <div>
        <div className="search_type">
          <p onClick={() => typeChangeHandler(0)}>{typeList[0]}</p>
          <p onClick={() => typeChangeHandler(1)}>{typeList[1]}</p>
          <p onClick={() => typeChangeHandler(2)}>{typeList[2]}</p>
        </div>
        <input
          ref={here}
          name="search"
          value={search}
          className="search_form"
          type="text"
          placeholder={placeholder}
          onChange={onChangeHandler}
          onKeyPress={onChangeHandler}
          onClick={inputOpen}
        />
        <img onClick={inputClose} src={img} />
      </div>
    </BlockSearchStyle>
  );
};

export default BlockSearch;
