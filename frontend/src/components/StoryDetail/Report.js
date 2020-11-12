import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { storyReport } from "../../actions/story";

const ModalStyle = styled.div`
top:0;
position: fixed;
justify-content: center;
align-items: center;
width: 100%;
height: 100vh;
display: ${props => props.openModal ? "flex" : "none"};
background-color: rgba(0, 0, 0, 0.5);
z-index: 10;
section {
  background-color: white;
  width: 700px;
  height: 300px;
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 10%;
    .close__btn {
      margin-top: 200px;
      font-size: 25px;
      position: relative;
      left: 310px;
      cursor: pointer;
    }
    p {
      font-size: 30px;
    }
    input {
      width: 90%;
      height: 125px;
      font-size: 15px;
      transition: 0.4s ease-in-out;
      border: solid 0.1px lightgray;
      padding: 10px;
      :focus {
        outline: none;
        border: solid 0.1px orange;
      }
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 35%;
    input {
      width: 90%;
      height: 125px;
      font-size: 15px;
      transition: 0.4s ease-in-out;
      border: solid 0.1px lightgray;
      padding: 10px;
      :focus {
        outline: none;
        border: solid 0.1px orange;
      }
      
    button {
      width: 70%;
      height: 240px;
      cursor: pointer;
      border-radius: 6px;
      :focus {
        outline: none;
      }
    }
    }
    /* > div {
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 12px;
        color: gray;
      }
      .checkbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          width: 400px;
          margin-right: 50px;
        }
      } */
    /* } */
  }

  

  }
}
`;

const OpenReport = ({ data, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [reportComments, setReportComments] = useState("");

  const reportChangeHandler = (e) => {
    setReportComments(e.target.value);

  };

  const reportAddHandler = () => {
    if (reportComments === "") {
      reportComments.current.focus();
    } else {
      setOpenModal(false)
      dispatch(storyReport({ story_id: data.id, case_detail: reportComments }),
      );
    }
  };
  const onClick = () => {
    setOpenModal(false)
  }

  return (
    <>
      <ModalStyle openModal={openModal} >
        <section>
          <article className="header">
            <p
              className="close__btn"
              onClick={() => setOpenModal(false)}
            >
              닫기
                </p>
            <p>신고내용</p>
            <input
              value={reportComments}
              className="report_input"
              onChange={reportChangeHandler}
              placeholder="신고 사유에 대해 상세하게 써주시면 감사하겠습니다."
              onKeyDown={(e) => {
                if (e.key === "Enter") reportAddHandler(e);
              }}
            />
            <button onClick={reportAddHandler}>확인</button>
          </article>


        </section>
      </ModalStyle>
      {/* <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle> */}
    </>
  );
};

export default OpenReport;
