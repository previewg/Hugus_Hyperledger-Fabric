import React, { useRef, useState } from "react";
import styled from "styled-components";

const SearchStyle = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    .search_form {
            font-size: 13px;
            outline: none;
            width:180px;
            height:23px;
            border: none;
            border-bottom: solid 1px grey;
            transition: all 0.5s ease-in-out;
            padding-left:3px;
            width: ${(props) => (props.isClicked ? "300px" : "150px")};
            :hover { 
                border-bottom: solid 1px orange;
                :focus {
                outline: none;
                }
            }
            }   
            .search__bar {
            font-size: 13px;
            width:60px;
            height:29px;
            margin-left:20px;
            background-color:orange;
            border:none;
            color:black;
            border-radius:3px;
            transition: 0.2s ease-in-out;
            outline:none;
            cursor: pointer;
                :hover {
                    transform: translateY(-2px);
                }   
            }
`;

const Search = ({ search, setSearch, setClicked }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [placeholder, setPlaceholder] = useState("SEARCH");
    const here = useRef();

    const inputOpen = () => {
        setIsClicked(true);
        setPlaceholder("SEARCH");
        here.current.focus();  
    };

    // const inputClose = (e) => {
    //     setSearch("")
    //     setIsClicked(false);
    //   };

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