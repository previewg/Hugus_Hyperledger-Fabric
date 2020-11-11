import React, { useRef } from "react";
import styled from "styled-components";

const AdminActSearchStyle = styled.div`
  width: 62%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  .search_form {
    font-size: 13px;
    outline: none;
    width: 180px;
    height: 23px;
    border: none;
    border-bottom: solid 1px white;
    transition: all 0.5s ease-in-out;
    background-color: transparent;
    padding-left: 3px;
    color: white;
    :focus {
      background-color: transparent;
    }
  }
  .search__bar {
    background-color: transparent;
    font-size: 13px;
    width: 60px;
    height: 30px;
    margin-left: 20px;
    border: solid 1px white;
    color: white;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    :hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const AdminActSearch = ({ search, setSearch, setClicked }) => {
  const here = useRef();

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <AdminActSearchStyle>
      <input
        ref={here}
        name="search"
        value={search}
        placeholder="SEARCH"
        className="search_form"
        type="text"
        onChange={onChangeHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") setClicked(true);
        }}
      />
      <button className="search__bar" onClick={() => setClicked(true)}>
        검색
      </button>
    </AdminActSearchStyle>
  );
};

export default AdminActSearch;
