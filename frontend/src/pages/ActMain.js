import React, { useEffect, useState } from "react";
import { ActList } from "components";
import styled from "styled-components";

const ActStyle = styled.section`
    width:100%;
    padding-top:70px;
    display:flex;
    justify-content:center;
    .layout {
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top: 100px;
    width:75%;
        .title {
        width:100%;
            >span {
            font-size:30px;
            border-bottom:solid orange 3px;
            padding-bottom:3px;
            }
        }
        .inputAndButton {
        margin-top:20px;
        width:100%;
        display:flex;
        justify-content:flex-end;
            .search_form {
            width:180px;
            height:23px;
            border-radius:3px;
            border:solid gray 1px;
            transition: 0.3s ease-in-out;
            border: solid orange 2px;
                :focus {
                outline: none;
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
        }

        .page__number {
        width:380px;
        display:flex;
        justify-content:space-around;
            >p {
                cursor: pointer;
                display:flex;
                justify-content:center;
                width:25px;
                padding-top:4px;
                border:none;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
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

    const backPageHandler = () => {

    }; 

    const nextPageHandler = () => {
        
    };
  return (
    <ActStyle>
        <div className="layout">

            <div className="title">
                <span>전달 스토리</span>
            </div>

            <div className="inputAndButton">
            <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            onChange={onChangeHandler}
            />
            <button className="search__bar">검색</button>    
            </div>

            <ActList/>

            <div className="page__number">
            <p onClick={backPageHandler}>&lt;</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p onClick={nextPageHandler}>&gt;</p>
            </div>


        </div>
    </ActStyle>
  );
};

export default Act;
