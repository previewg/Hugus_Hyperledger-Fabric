import React,{useState} from 'react';
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
            cursor: pointer;
                :hover {
                color:black;
                }
            }
`;

const Search = () => {
    const [search, setSearch] = useState("");
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
            />
            <button className="search__bar">검색</button>    
        </SearchStyle>
    
    )
}

export default Search;