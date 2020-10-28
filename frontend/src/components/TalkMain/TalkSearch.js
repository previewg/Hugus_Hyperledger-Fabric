import React, { useRef, useState } from "react";
import styled from "styled-components";

const SearchStyle = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
            .search_form {
            width:180px;
            height:23px;
            border-radius:3px;
            border: solid 0.1px orange;
            transition: all 0.5s ease-in-out;
            box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
            padding-left:3px;
            width: ${(props) => (props.isClicked ? "300px" : "150px")};
            :hover { 
                border: solid 0.1px orange;
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
    const [isClicked, setIsClicked] = useState(false);
    const [placeholder, setPlaceholder] = useState("SEARCH");
    const here = useRef();

    const inputOpen = () => {
        setIsClicked(true);
        setPlaceholder("검색어를 입력하세요");
        here.current.focus();  
    };

    const inputClose = () => {
        setIsClicked(false);
        setPlaceholder("SEARCH");
      };

    const onChangeHandler = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
      };

    return(
        <SearchStyle isClicked={isClicked}>
            <input
            ref={here}
            onClick={inputOpen}
            name="search"
            value={search}
            placeholder={placeholder}
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