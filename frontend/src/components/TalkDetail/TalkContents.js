import React from "react";
import styled from "styled-components";
import TalkSlider from "./TalkSlider";
import { Link } from "react-router-dom";

const TalkContentsStyle = styled.div`
  display: flex;
  padding-top:70px;
  justify-content: center;
  flex-direction:column;
  width: 70%;
 
 .talk_contents {
   width:100%;
   display:flex;
   justify-content:flex-start;
   margin-top: 70px;
          >p {
            font-size:25px;
            border-bottom:solid orange 3px;
            padding-bottom:2px;
            }
 }

 .content {

  .giveProcessForm {
    margin-top: 50px;
    p:nth-child(1) {
      font-weight: bold;
    }
    p:nth-child(2) {
      border: solid 0.1px lightgray;
      padding: 15px;
      padding-left: 20px;
    }
    }
 }

  .back_btn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
    color: grey;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    outline: none;
    :hover {
    color: orange;
    }
  }

  .visited {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    > p {
      margin: 0;
      margin-left: 10px;
    }
  }
`;

const TalkContents = ({ talkId }) => {
const data = talkId.data;

return (
    <TalkContentsStyle>
    <div className="talk_contents">

      <p>{data.talk_title}</p>
      </div>

      <Link className="back_btn" to="/talk">
      글목록
      </Link>

      <TalkSlider files={data.Talk_Files} />
      
      <div className="visited">
      <p>조회수 {data.visited}</p>
      </div>

      <div className="content">
      <div className="giveProcessForm">
      <p>수혜자의 소식</p>
      <p>
      {data.talk_content}  
      </p>
      </div>
      </div>

    </TalkContentsStyle>
  );
};

export default TalkContents;
