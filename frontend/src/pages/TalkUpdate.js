import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const TalkUpdateStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
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
    .content {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      p {
        font-weight: bold;
      }
      div {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        margin-bottom: 10px;

        > div {
          display: flex;
          margin: 0;
          .preImg {
            width: 60px;
            height: 60px;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
            margin: 5px;
          }
          .preImgClear {
            position: relative;
            right: 11px;
            width: 15px;
            height: 15px;
            bottom: 46px;
            background-color: gray;
            border-radius: 7.5px;
            font-size: 12px;
            background-color: darkgray;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }

        label {
          min-width: 50px;
          color: grey;
          font-size: small;
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

    .items {
      font-weight: bold;
      margin-top: 35px;
      .item {
        font-weight: normal;
        font-size: 14px;
        background-color: #fff7ef;
        padding: 1rem;
        p {
          margin: 0;
          margin-bottom: 10px;
        }
        p:nth-last-child(1) {
          margin-bottom: 0;
        }
        .total_price {
          text-align: end;
        }
      }
    }

    .warning {
      margin-top: 30px;
      width: 100%;
      border: solid 0.1px lightgray;
      margin-bottom: 30px;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      p {
        margin: 15px;
        margin-left: 20px;
      }
      > p:nth-child(1) {
        font-weight: bold;
      }
      strong:nth-child(1) {
        color: dodgerblue;
      }
      strong:nth-child(2) {
        color: orange;
      }
      div {
        display: flex;
        justify-content: space-between;
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

const errorMsg = [
  "",
  "제목을 입력 바랍니다",
  "내용을 입력 바랍니다",
];

const TalkUpdate = (props) => {
  const dispatch = useDispatch();
  const title = useRef();
  const content = useRef();

  const [data, setData] = useState({
    title: "",
    content: "",
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
  }, [filled, data]);

  const talkUpdateHandler = async () => {
    if (errorHandler()) {
      const formData = new FormData();
      formData.append("id", props.match.params.id);
      formData.append("talk_title", data.title);
      formData.append("talk_content", data.content);
      if (data.files !== null) {
        for (const file of data.files) {
          formData.append(`files`, file);
        }
      } else {
        formData.append("files", "");
      }
      // dispatch(storyUpdate(formData, { ...props }));
      await axios.post("/talk/update", formData )
      history.push("/talk");
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

  const init = () => {
    let pre = {
      title: preData.talk_title,
      content: preData.talk_content,
      files: null,
    };
    setData(pre);
  };

  useEffect(() => {
    if (load.current) {
      // dispatch(storyLoader(props.match.params.id));

      load.current = false;
    }
    if (loadStatus === "SUCCESS") init();
  }, [loadStatus]);

  return (
    <>
      {preData && (
        <TalkUpdateStyle>
          <div className="layout">
            <div className="write_title">
              <p>수정하기</p>
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

            <div className="content">
              <p>내용</p>
              <div>
                {preImg.map((item, key) => {
                  return (
                    <div key={key}>
                      <img
                        className="preImg"
                        src={item.previewURL}
                        key={key}
                        alt="preview"
                      />
                    </div>
                  );
                })}
                <label htmlFor="files">파일 첨부</label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onChangeHandler}
                />
              </div>
              <textarea
                name="content"
                ref={content}
                value={data.content}
                required
                placeholder="내용을 입력하세요. "
                onChange={onChangeHandler}
              />
            </div>

            <div className="submit">
              <button onClick={talkUpdateHandler}>
                수정하기
                <img alt="submit" src="/icons/PaperPlane.png" />
              </button>
            </div>
          </div>
        </TalkUpdateStyle>
      )}
      <ErrorBoxStyle error={errorCode}>{errorMsg[errorCode]}</ErrorBoxStyle>
    </>
  );
};

export default TalkUpdate;
