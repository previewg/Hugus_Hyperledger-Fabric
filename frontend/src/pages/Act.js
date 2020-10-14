import React, { useEffect, useState } from "react";
import { ActList } from "components";
import styled from "styled-components";

const ActStyle = styled.section`
    width:100%;
    padding-top:70px;
    display:flex;
    justify-content:center;
    .layout {
    margin-top: 100px;
    width:80%;
        >div:nth-child(1) {
        } 
        >div:nth-child(2) {
        display:flex;
        justify-content:flex-end;
        .input {
        
        }
        .search__bar {
        background-color:white;
        }
        }   
    }
`;

const Act = () => {

    const [search, setSearch] = useState("");

    const onChangeHandler = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
      };








  return (
    <ActStyle>
        <div className="layout">

            <div className="title">
                <a>시이밸</a>
            </div>

            <div>
            <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            onChange={onChangeHandler}
            />
            <button className="search__bar">검색</button>    
            </div>

            <div></div>

            <div></div>

        </div>
    </ActStyle>
  );
};

export default Act;
