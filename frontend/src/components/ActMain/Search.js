import React,{useState} from 'react';
import styled from "styled-components";

const SearchStyle = styled.div``;

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