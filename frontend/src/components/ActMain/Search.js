import React, { useRef, useState } from "react";
import styled from "styled-components";

const SearchStyle = styled.div`
    width: 93%;
    display: flex;
    justify-content: flex-end;
    .search_form {
            font-size: 13px;
            outline: none;
            width: 100px;
            height: 23px;
            border: none;
            border-bottom: solid 1px grey;
            transition: all 0.5s ease-in-out;
            width: ${(props) => (props.isClicked ? "300px" : "150px")};
            :hover { 
                border-bottom: solid 1px orange;
                :focus {
                outline: none;
                }
            }
        }   
        >img {
        margin-left: 20px;
        cursor: pointer;
        width: 30px;
        z-index: 1;
        right: 45px;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        :hover {
          color: orange;
          transform: scale(1.2);
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
                if (e.key === "Enter") setClicked(true);
              }}
            />
            <img className="search__bar" src="/icons/Search.png" onClick={()=>setClicked(true)}/>  
        </SearchStyle>
    
    )
}

export default Search;