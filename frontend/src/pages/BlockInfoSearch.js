import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { blockListSearchLoader } from "../actions/block";
import { useDispatch, useSelector } from "react-redux";


import axios from "axios";
import { BlockInfoSearchLoader } from "components";

const BlockSearchResultStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 70px;
  div {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 90px;
    input {
      transition: all 1s ease-in-out;
      margin-right: 70px;
      width: ${(props) => (props.isClicked ? "600px" : "320px")};
      height: 40px;
      border-radius: 20px;
      border: solid 0.1px orange;
      outline: none;
      padding-left: 20px;
      font-size: 16px;
    }
    img {
      width: 20px;
      height: 20px;
      position: relative;
      right: 105px;
      cursor: pointer;
    }
  }
`;



const BlockInfoSearch = () => {
 

  const dispatch = useDispatch();
  const search_list = useSelector((state) => state.block.blockSearch.search);
  console.log(search_list);
  const list = useSelector((state) => state.block.blockSearch.list);
console.log(list);
  const [search, setSearch] = useState("");
  

  // const compare = (block) => {
  //   const dis = Hangul.disassemble(hashtag);
  //   if (hashtag.match(search) || dis.includes(search)) return true;
  //   else return false;
  // };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.key === "Enter") {
      onClick();
    }
  };
  const visitHandler = async (word) => {
    console.log(word)
    await axios.put("/block/search", { word: word });
  };
  const onClick = () => {
   dispatch(blockListSearchLoader(search)) ;
  };
  useEffect(() => {
    
    if (search !== "") {
      setSearch(search_list);
    }
  },[]);
      const copyTx = () => {
        const tx_id = document.getElementById("tx_id");
        tx_id.select();
        document.execCommand("Copy");
      }
if (list.length===0) return <BlockInfoSearchLoader/>
  return (
    <BlockSearchResultStyle search={search}>
      <div className="layout">
        <div className="search__bar">
          <input
            name="search"
            value={search}
            className="search_form"
            type="text"
            placeholder="User ID, Tx ID"
            onChange={onChangeHandler}
            onKeyPress={onChangeHandler}
          />
          <div onClick={()=> visitHandler(search)}>
            <img alt="search__icon" src="/icons/search.png" />
          </div>
        </div>
        {list.map((block, key) => {
          return (
            <div className="BlockInfoMain__body" key={key}>
              <p className="block_height">{block.block_height}</p>
              <p className="tx_id">
                {block.tx_id.slice(0, 40)}...
                <input readOnly id="tx_id" value={block.tx_id} />
                <button onClick={copyTx}>복사</button>
              </p>
              <p className="tx_type">{block.tx_type}</p>
              <p className="age" block_time={block.timestamp} />
              <p className="sender_id">{block.sender_id}</p>
              <p className="receiver_id">{block.receiver_id}</p>
            </div>
          );
        })}


        
      </div>

    </BlockSearchResultStyle>
  );
};

export default BlockInfoSearch;
