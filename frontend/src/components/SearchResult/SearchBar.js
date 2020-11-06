import React, { useEffect, useState } from "react";
import Hangul from "hangul-js";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchBarStyle = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  .layout {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content {
      height: 250px;
      width: 40%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .logo {
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .title_text {
        p:nth-child(1) {
          font-weight: bold;
          font-size: 25px;
        }
        p:nth-child(2) {
        }
      }
    }

    .search__bar {
      margin-top: 20px;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        min-width: 300px;
        font-size: 15px;
        padding: 12px;
        width: 100%;
        height: 35px;
        border-radius: 4px;
        transition: 0.3s ease-in-out;
        border: solid orange 3px;
        :focus {
          outline: none;
        }
        margin-left: 30px;
      }
      img {
        cursor: pointer;
        width: 30px;
        position: relative;
        z-index: 1;
        right: 45px;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        :hover {
          color: orange;
          transform: scale(1.2);
        }
      }
    }
    .live__suggestion {
      display: ${(props) => (props.search ? "flex" : "none")};
      position: absolute;
      top: 184px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40%;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        input {
          cursor: pointer;
          width: 100%;
          min-width: 300px;
          margin-left: 30px;
          padding: 12px;
          outline: none;
          border: solid 0.1px lightgray;
          border-top: none;
          :hover {
            color: orange;
            font-weight: bold;
            background-color: #faf4e7;
          }
        }
        img {
          width: 30px;
          position: relative;
          z-index: -100;
          right: 30px;
        }
        :nth-child(${(props) => props.now}) {
          input {
            background-color: #faf4e7;
            color: orange;
            font-weight: bold;
          }
        }
      }
    }

    .suggestion {
      margin-top: 15px;
      display: flex;
      p {
        color: gray;
        font-size: 13px;
        border: none;
        margin-right: 15px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        :hover {
          color: orange;
          transform: scale(1.2);
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .layout {
      .content {
        width: 80%;
        .logo {
          display: none;
        }
      }
    }
  }
`;

const LoaderStyle = styled.div`
  width: 40%;
  height: 20vh;
  display: flex;
  backdrop-filter: blur(6px);
  justify-content: center;
  align-items: center;
`;

const SearchBar = ({ history }) => {
  const [hashtagList, setHashtagList] = useState([]);
  const [matchedList, setMatchedList] = useState([]);
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(0);

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    const matchedList = hashtagList.filter((row) =>
      compare(row.hashtag, e.target.value)
    );
    setMatchedList(matchedList.slice(0, 10));
  };

  const onClick = () => {
    history.push(`/search/${search}`);
  };

  const compare = (hashtag, inputWord) => {
    const dis = Hangul.disassemble(hashtag);
    if (hashtag.match(inputWord) || dis.includes(inputWord)) return true;
    else return false;
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "ArrowDown") {
      if (now < matchedList.length) {
        setSearch(document.getElementById(`suggest${now}`).value);
        setNow((now) => now + 1);
      } else if (now === matchedList.length && matchedList.length !== 0) {
        setNow(1);
        setSearch(document.getElementById(`suggest0`).value);
      }
    }
    if (e.key === "ArrowUp") {
      if (now > 0) {
        if (now > 1) {
          setSearch(document.getElementById(`suggest${now - 2}`).value);
        }
        setNow((now) => now - 1);
      }
    }
    if (e.key === "Enter") {
      setMatchedList([]);
      setNow(0);
      history.push(`/search/${search}`);
    }
  };

  const initLoad = async () => {
    const initData = await axios.get("/hashtag/all");
    setHashtagList(initData.data.list);
  };

  const LiveSuggestion = () => {
    if (hashtagList.length === 0) {
      return (
        <LoaderStyle className="live__suggestion">
          <HashLoader
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
            size={40}
            color={"#f69a53"}
            loading={true}
          />
        </LoaderStyle>
      );
    }
    return (
      <div className="live__suggestion">
        {matchedList.map((row, key) => {
          return (
            <div key={key}>
              <input
                id={`suggest${key}`}
                value={row.hashtag}
                readOnly
                onClick={() => {
                  history.push(`/search/${row.hashtag}`);
                }}
              />
              {search !== "" ? (
                <a>
                  <img alt="search__icon" src="/icons/Search.png" />
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    initLoad();
  }, []);

  return (
    <SearchBarStyle search={search} now={now}>
      <div className="layout">
        <div className="search__bar">
          <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            placeholder="해시태그로 검색해보세요!"
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
          />
          <Link to="/search/result">
            <div onClick={onClick}>
              <img alt="search__icon" src="/icons/Search.png" />
            </div>
          </Link>
        </div>
        <LiveSuggestion />
      </div>
    </SearchBarStyle>
  );
};

export default SearchBar;
