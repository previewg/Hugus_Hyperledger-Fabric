import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TalkSlider from "./TalkSlider";
import axios from "axios";

const TalkContentsStyle = styled.div`
  display: flex;
  padding-top:50px;
  justify-content: center;
  flex-direction:column;
  width: 750px;
 
 .talk_contents {
    width:100%;
    display:flex;
    justify-content:flex-start;
    margin-top: 70px;
          >p {
            font-size:30px;
            }
 }

 .content {
  .sosick {
    white-space: pre;
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

  .if_owner {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    button {
      border: none;
      outline: none;
      cursor: pointer;
      margin-left: 5px;
      background: none;
      :hover {
        font-weight: bold;
        color: orange;
      }
    }
  }

  .visited {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    p:nth-child(1) {
      margin: 0;
      margin-left: 10px;
    }
    p:nth-child(2) {
      margin: 0;
      margin-left: 10px;
    }
  }

`;

const TalkContents = ({ talkId,history,likenum }) => {
const data = talkId.data;
const IfOwner = ({ history, data }) => {
  const email = useSelector((state) => state.auth.user.email);
  
  const onDeleteHandler = async () => {
    const confirmed = window.confirm("삭제 하시겠습니까?");
    if (confirmed) {
      await axios.post("/talk/delete", {talk_id:data.id} )
      .then(() => {
      alert("성공적으로 삭제되었습니다.");
      history.push("/talk");
      }) 
      .catch((error) => {
      alert("삭제에 실패했습니다.");
      console.error(error);
      });
    };
  };

  const onUpdateHandler = () => {
    history.push(`/talk/update/${data.id}`);
  };

  if (data.user_email === email)
    return (
      <div className="if_owner">
        <button onClick={onUpdateHandler}>수정</button>
        <button onClick={onDeleteHandler}>삭제</button>
      </div>
    );
  return null;
};

return (
    <TalkContentsStyle>
    <div className="talk_contents">

      <p>{data.talk_title}</p>
      </div>

      <TalkSlider files={data.Talk_Files} />
      
      <IfOwner history={history} data={data} />
      <div className="content">
      <div className="sosick">
      <p>수혜자의 소식</p>
      <p>
      {data.talk_content}
      </p>
      </div>

      <div className="visited">
      <p>좋아요 {likenum}</p>
      <p>조회수 {data.visited}</p>
      </div>
      </div>


    </TalkContentsStyle>
  );
};

export default TalkContents;
