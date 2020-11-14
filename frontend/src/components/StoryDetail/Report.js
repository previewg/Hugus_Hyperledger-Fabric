import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { storyReport } from "../../actions/story";
import axios from "axios";

const ModalStyle = styled.section`
  top: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  display: ${(props) => (props.openModal ? "flex" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  article {
    background-color: white;
    width: 700px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .close__btn {
      color: red;
      align-self: flex-end;
      font-size: 13px;
      cursor: pointer;
      padding-right: 10px;
    }
    .report__title {
      font-size: 20px;
      margin-bottom: 50px;
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

    button {
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

const OpenReport = ({ data, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [reportComments, setReportComments] = useState("");
  const input = useRef();

  const reportChangeHandler = (e) => {
    setReportComments(e.target.value);
  };

  const reportAddHandler = () => {
    if (reportComments === "") {
      alert("내용을 입력바랍니다");
      input.current.focus();
    } else {
      const confirmed = window.confirm("해당 스토리를 신고하시겠습니까?");
      if (confirmed) {
        setOpenModal(false);
        dispatch(
          storyReport({ story_id: data.id, case_detail: reportComments })
        );
      }
    }
  };

  return (
    <ModalStyle openModal={openModal}>
      <article>
        <p className="close__btn" onClick={() => setOpenModal(false)}>
          닫기
        </p>
        <p className="report__title">신고하기</p>
        <textarea
          ref={input}
          value={reportComments}
          className="report__input"
          onChange={reportChangeHandler}
          placeholder="신고 사유에 대해 상세하게 써주시면 감사하겠습니다."
        />
        <button onClick={reportAddHandler}>접수</button>
      </article>
    </ModalStyle>
  );
};

export default OpenReport;
