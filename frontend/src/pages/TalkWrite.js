import axios from "axios";
import React, { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { TalkSlider } from "components";

const TalkWriteStyle = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 200px;
  .layout {
    margin-top: 100px;
    width: 700px;
    display: flex;
    flex-direction: column;
    .write_title {
      text-align: center;
      font-size: 20px;
      padding: 10px;
      display: flex;
      justify-content: center;
      p {
        width: 200px;
        height: 40px;
        border-bottom: solid orange 2px;
      }
    }
    .title {
      margin-top: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      p {
        font-weight: bold;
        margin-right: 10px;
        width: 80px;
      }
      input {
        border: none;
        width: 300px;
        padding: 5px;
        border-bottom: solid 0.1px lightgray;
        transition: 0.3s ease-in-out;
        :focus {
          outline: none;
          border-bottom: solid 0.1px orange;
        }
      }
    }

    .info {
      margin-top: 35px;
      p {
        font-weight: bold;
      }
      textarea {
        padding: 12px;
        width: 100%;
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
    }

    .upload {
      > p {
        width: 100%;
        font-weight: bold;
        text-align: left;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      label {
        width: 100%;
        text-align: end;
        font-size: 14px;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        :hover {
          color: orange;
        }
      }
      input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .img__clear {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        background-color: #cd5c5c;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 15px;
        outline: none;
        display: ${(props) => (props.files ? "block" : "none")};
      }
    }

    .content {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      p {
        font-weight: bold;
      }
      textarea {
        padding: 12px;
        resize: none;
        width: 100%;
        height: 400px;
        border-radius: 4px;
        transition: 0.3s ease-in-out;
        border: solid 0.1px lightgray;

        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
    }

    .hashtags {
      font-weight: bold;
      margin-top: 20px;
      > div {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        overflow: paged-y;
        input {
          margin-right: 7px;
          padding: 5px;
          height: 20px;
          outline: none;
          border: none;
          transition: 0.3s ease-in-out;
          border-bottom: solid 0.1px lightgray;
          :focus {
            border-bottom: solid 0.1px orange;
          }
        }
        .added__hashtag {
          display: flex;
          .hashtag {
            padding: 10px;
            border-radius: 20px;
            background-color: orange;
            font-size: 12px;
            margin: 5px;
            color: white;
            font-weight: 200;
            min-width: auto;
          }
          .clear {
            position: relative;
            border-radius: 7.5px;
            font-size: 12px;
            right: 15px;
            top: -10px;
            height: 15px;
            width: 15px;
            background-color: darkgray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }

    .submit {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 50px;
      button {
        margin-top: 15px;
        border: none;
        background: white;
        font-size: 15px;
        outline: none;
        cursor: pointer;
        font-weight: bold;
        transition: 0.2s ease-in-out;
        :hover {
          color: orange;
        }
        > img {
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const ErrorBoxStyle = styled.p`
  ${(props) => {
    if (props.error == 0) {
      return "display:none;opacity:0";
    } else {
      return "opacity:1;transform: translateX(-100px);";
    }
  }};
  right: 0;
  background-color: #ffa500;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  width: 180px;
  height: 50px;
  transition: 0.7s ease-in-out;
  font-size: 15px;
`;

const errorMsg = ["", "제목을 입력 바랍니다", "소식을 입력 바랍니다"];

const TalkWrite = ({ props, match, history }) => {
  const title = useRef();
  const content = useRef();
  const init = useRef(true);

  const [data, setData] = useState({
    title: "",
    content: "",
    campaign: "",
    files: null,
  });

  const [filled, setFilled] = useState({
    title: true,
    content: true,
  });
  const [errorCode, setErrorCode] = useState(0);
  const [preImg, setPreImg] = useState([]);

  const [fileReaderState, setFileReaderState] = useState("");
  const errorHandler = useCallback(() => {
    if (!data.title) {
      setErrorCode(1);
      title.current.focus();
      setFilled({
        ...filled,
        title: false,
      });
      return false;
    } else if (!data.content) {
      setErrorCode(2);
      content.current.focus();
      setFilled({
        ...filled,
        content: false,
      });
      return false;
    }
    return true;
  }, [data, filled]);

  console.log("file:", data.files);
  console.log("pre:", preImg);

  const talkAddHandler = async () => {
    if (errorHandler()) {
      const formData = new FormData();
      formData.append("talk_title", data.title);
      formData.append("talk_content", data.content);
      formData.append("campaign_id", match.params.id);
      if (data.files !== null) {
        for (const file of data.files) {
          formData.append(`files`, file);
        }
      } else {
        formData.append("files", "");
      }
      await axios
        .post(`/talk/add`, formData)
        .then((res) => {
          alert("성공적으로 등록되었습니다.");
          history.push("/talk");
        })
        .catch((err) => {
          alert("등록에 실패했습니다.");
          console.error(err);
        });
    }
  };
  const previewImg = (e) => {
    setPreImg([]);
    for (const file of e.target.files) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let newPreImg = preImg;
        newPreImg.push({
          file: file,
          previewURL: reader.result,
        });
        setPreImg(newPreImg);
        setFileReaderState(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const imgDeleteHandler = () => {
    setData({
      ...data,
      files: null,
    });
    setPreImg([]);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "files") {
      previewImg(e);
      setData({
        ...data,
        [e.target.name]: e.target.files,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
      setErrorCode(0);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TalkWriteStyle files={data.files}>
        <div className="layout">
          <div className="write_title">
            <p>글쓰기</p>
          </div>
          <div className="title">
            <p>제목</p>
            <input
              name="title"
              ref={title}
              value={data.title}
              type="text"
              placeholder="제목을 입력하세요."
              onChange={onChangeHandler}
            />
          </div>
          <div className="upload">
            <p>파일</p>
            <label htmlFor="files" onClick={imgDeleteHandler}>
              첨부하기
            </label>
            <input
              id="files"
              name="files"
              type="file"
              multiple
              accept="image/*"
              onChange={onChangeHandler}
            />
            <button className="img__clear" onClick={imgDeleteHandler}>
              사진 초기화
            </button>
          </div>
          <TalkSlider files={preImg} />
          <div className="content">
            <p>소식</p>

            <textarea
              name="content"
              ref={content}
              value={data.content}
              required
              placeholder="수혜자의 소식을 입력하세요. "
              onChange={onChangeHandler}
            />
          </div>
          <div className="submit">
            <button onClick={talkAddHandler}>
              제출하기
              <img alt="submit" src="/icons/PaperPlane.png" />
            </button>
          </div>
        </div>
      </TalkWriteStyle>
      <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
    </>
  );
};

export default TalkWrite;
