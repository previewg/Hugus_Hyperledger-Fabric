import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {blockListSearchLoader} from "actions/block";

const BlockSearchStyle = styled.article`
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
    .live__suggestion {
      display: ${(props) => (props.search ? "flex" : "none")};
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        input {
          cursor: pointer;
          width: 100%;
          min-width: 300px;
          margin-left: 30px;
          padding: 12px;
          outline: none;
          border: solid 0.1px lightgray;
          border-top: none;
          :hover {
            color: orange;
            font-weight: bold;
            background-color: #faf4e7;
          }
        }
        img {
          width: 30px;
          position: relative;
          z-index: -100;
          right: 30px;
        }
      }
    }
  }
`;

const BlockSearch = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [placeholder, setPlaceholder] = useState("SEARCH");
  const [img, setImg] = useState("/icons/Search.png");
  const here = useRef();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.block.blockSearch.list);
  const [word, setword] = useState("");
  
  const onChangeHandler = (e) => {
    e.preventDefault();
    setword(e.target.value);
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onClick = () => {
      dispatch(blockListSearchLoader(word))
      console.log(word);
  }
//   const compare = (hashtag) => {
//     const dis = Hangul.disassemble(hashtag);
//     if (hashtag.match(search) || dis.includes(search)) return true;
//     else return false;
// };
// useEffect(() => {
//   dispatch(blockListSearchLoader());
// }, []);

  const inputOpen = () => {
    setIsClicked(true);
    setPlaceholder("User ID, Tx ID");
    setImg("/icons/Multiple.png");
    here.current.focus();
  };

  const inputClose = () => {
    setIsClicked(false);
    setPlaceholder("SEARCH");
    setImg("/icons/Search.png");
  };
  return (
    <BlockSearchStyle word={word}>
      <div>
        <input ref={here}onClick={inputOpen}
                        name="search"
                        value={word}
                        className="search_form"
                        type="text"
                        placeholder="User ID, Tx ID"
                        onChange={onChangeHandler} />
                        <Link to="/block/search"onClick={onClick}>
                        <div >
                            <img alt="search__icon" src="/icons/search.png"/>
                        </div>
                    </Link>
      </div>
        <img onClick={inputClose} src={img} />
        {/* <div className="live__suggestion">
                    {list.map((block, key) => {                        
                            return (
                                <div key={key}>
                                    <input  value={block.tx_id} readOnly onClick={async ()=>{await blockListSearchLoader(block.tx_id)
                                        dispatch(blockListSearchLoader(block.tx_id))
                                       
                                        }}
                                    />
                                    {word !=="" ? <Link to="/block/search">
                                        <img alt="search__icon" src="/icons/search.png"/>
                                    </Link> :null} */}
{/* 

                                </div>
                            );
                    })} */}
                {/* </div> */}
    </BlockSearchStyle>
  );
};

export default BlockSearch;
