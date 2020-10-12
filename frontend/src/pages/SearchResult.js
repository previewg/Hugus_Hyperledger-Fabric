import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { hashtagAll } from "actions/hashtag";
import * as Hangul from "hangul-js";

const SearchResultStyle = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  .layout {
    margin-top: 180px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;

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
        border: solid orange 6px;
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
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
      }
    }
  }
`;

const SearchResult = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.hashtag.list.data);
  const [search, setSearch] = useState("");
  console.log(list);
  useEffect(() => {
    dispatch(hashtagAll());
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const compare = (hashtag) => {
    const dis = Hangul.disassemble(hashtag);
    if (hashtag.match(search) || dis.includes(search)) return true;
    else return false;
  };

  return (
    <SearchResultStyle search={search}>
      <div className="layout">
        <div className="search__bar">
          <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            placeholder="해시태그로 검색해보세요!"
            onChange={onChangeHandler}
          />
          <img alt="search__icon" src="/icons/search.png" />
        </div>
        <div className="live__suggestion">
          {list.map((row) => {
            if (compare(row.hashtag))
              return (
                <div>
                  <input value={row.hashtag} readOnly />
                  <img alt="search__icon" src="/icons/search.png" />
                </div>
              );
          })}
        </div>
      </div>
    </SearchResultStyle>
  );
};

export default SearchResult;
