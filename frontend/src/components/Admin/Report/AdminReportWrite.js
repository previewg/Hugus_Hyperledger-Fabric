import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const AdminReportWriteStyle = styled.section`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  article {
    width: 700px;
    height: 550px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      align-self: flex-end;
      margin: 15px;
      width: 45px;
      height: 30px;
      border: none;
      background-color: transparent;
      outline: none;
      color: palevioletred;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }
    .report__title {
      font-size: 20px;
    }
    .report__detail {
      font-size: 15px;
      width: 80%;
      height: 20%;
      padding: 15px;
      border-radius: 5px;
      white-space: pre;
    }

    textarea {
      padding: 12px;
      width: 80%;
      height: 150px;
      border-radius: 4px;
      resize: none;
      border: solid 0.1px lightgray;
      transition: 0.3s ease-in-out;
      :focus {
        outline: none;
        border: solid 0.1px orange;
      }
    }

    .report__replied {
      font-size: 15px;
      width: 80%;
      height: 30%;
      padding: 15px;
      border-radius: 5px;
      white-space: pre;
      background-color: lightgray;
    }

    .report__reply {
      align-self: center;
      margin-top: 20px;
      width: 120px;
      height: 40px;
      background-color: transparent;
      outline: none;
      border: dodgerblue 0.1px solid;
      border-radius: 3px;
      color: dodgerblue;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      color: white;
      background-color: dodgerblue;
      :hover {
        color: dodgerblue;
        background-color: transparent;
      }
    }
  }
`;

const AdminReportWrite = ({ type, data, setOpen, setClicked }) => {
  const [reply, setReply] = useState("");

  const reportReplyHandler = async () => {
    setClicked(true);
    const result = await axios.post("/admin/report/add", {
      report_id: data.id,
      reply: reply,
    });
    if (result.data.success === 1) {
      setClicked(false);
      alert("답변이 성공적으로 등록되었습니다.");
      setOpen(false);
    }
  };

  const onChangeHandler = (e) => {
    setReply(e.target.value);
  };

  return (
    <AdminReportWriteStyle type={type}>
      {type === "now" ? (
        <article>
          <button onClick={() => setOpen(false)}>닫기</button>
          <p className="report__title">신고 내용</p>
          <p className="report__detail">{data.case_detail}</p>
          <textarea
            value={reply}
            onChange={onChangeHandler}
            placeholder="답변을 입력바랍니다"
          />
          <button className="report__reply" onClick={reportReplyHandler}>
            제출
          </button>
        </article>
      ) : (
        <article>
          <button onClick={() => setOpen(false)}>닫기</button>
          <p className="report__title">신고 내용</p>
          <p className="report__detail">{data.case_detail}</p>
          <p className="report__replied">{data.Story_Report_Reply.reply}</p>
        </article>
      )}
    </AdminReportWriteStyle>
  );
};

export default AdminReportWrite;
