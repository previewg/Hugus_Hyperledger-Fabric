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
    width:75%;
        >div:nth-child(1) {
            width:18%;
            .title {
            font-size:30px;
            border-bottom:solid orange 3px;
            padding-bottom:3px;
            }
        }
        >div:nth-child(2) {
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

        >section {
        margin-top:20px;
        width:100%;
        display:flex;
        justify-content:center;
        .page__number {
        
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
                <p className="title">전달 스토리</p>
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

            <ActList/>

            <section>
            <div className="page__number">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            </div>
            </section>


        </div>
    </ActStyle>
  );
};

export default Act;
