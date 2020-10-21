import React,{ useState, useRef } from 'react';
import act from 'reducers/act';
import styled from "styled-components";

const SearchStyle = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
            .search_form {
            width:180px;
            height:23px;
            border-radius:3px;
            border: solid grey 2px;
            transition: 0.2s ease-in-out;
            box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
            :hover { 
            border: solid orange 2px;
                :focus {
                outline: none;
                }
            }
            }   
            .search__bar {
            width:60px;
            height:29px;
            margin-left:20px;
            background-color:orange;
            border:none;
            color:white;
            border-radius:3px;
            transition: 0.2s ease-in-out;
            outline:none;
            box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
            cursor: pointer;
                :hover {
                color:black;
                }
            }
`;

const Search = ({ search, setSearch, setClicked }) => {

    
    const onChangeHandler = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
      };

    return(
        <SearchStyle>
            <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            onChange={onChangeHandler}
            onKeyDown={(e) => {
                if (e.key === "Enter") setClicked();
              }}
            />
            <button className="search__bar" onClick={()=>setClicked(true)}>검색</button>    
        </SearchStyle>
    
    )
}

export default Search;