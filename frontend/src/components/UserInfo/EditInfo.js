import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpload, signDestroyRequest } from "../../actions/auth";
import styled from "styled-components";
import ConfirmPwd from "./ConfirmPwd";

const EditInfoStyle = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  > div {
    position: relative;
    top: -50px;
    right: 160px;
    width: 735px;
    height: 700px;
    background-image: url("/icons/mypage2.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    flex-direction: column;

    .profile__img {
      margin-top: 100px;
      min-width: 160px;
      min-height: 160px;
      width: 160px;
      height: 160px;
      border-radius: 80px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
      .profile__img__changed {
        display: none;
        width: 160px;
        height: 160px;
        border-radius: 80px;
        background-color: rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease-in-out;
        > label {
          cursor: pointer;
        }
        input {
          width: 0.1px;
          height: 0.1px;
          outline: none;
        }
      }
      :hover {
        .profile__img__changed {
          display: flex;
          color: white;
          justify-content: center;
          align-items: center;
          font-size: 16px;
        }
      }
    }
    .profile__button {
      margin-top: 15px;
      width: 130px;
      display: flex;
      justify-content: space-between;
      > button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: gray;
        border-top: solid lightgray 0.1px;
        padding: 5px;
        transition: 0.2s ease-in-out;
        outline: none;
      }
      > button:nth-child(1) {
        > strong {
          color: #1eb71e;
          font-weight: normal;
        }
        :hover {
          border-top: solid #1eb71e 0.1px;
        }
      }
      > button:nth-child(2) {
        > strong {
          color: red;
          font-weight: normal;
        }
        :hover {
          border-top: solid red 0.1px;
        }
      }

      :hover {
      }
    }

    .profile__nickname {
      width: 220px;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      > p:nth-child(2) {
        font-size: 22px;
      }
    }

    .profile__email {
      width: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
      > p:nth-child(2) {
        font-size: 22px;
      }
    }

    .profile__phone {
      width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      > p:nth-child(2) {
        font-size: 22px;
      }
    }

    p {
      margin-right: 20px;
    }

    .profile__delete {
      display: flex;
      margin-top: 30px;
      cursor: pointer;
      p:nth-child(1) {
        color: #2273ff;
      }
      p:nth-child(2) {
        color: gray;
        :hover {
          color: red;
        }
      }
    }
  }
`;

const EditInfo = ({ setInfoType, profile_path, currentUser }) => {
  const dispatch = useDispatch();
  const updateStatus = useSelector(
    (state) => state.authentication.profile.status
  );
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 탈퇴 하시겠습니까?");
    if (ok) {
      await dispatch(signDestroyRequest(currentUser));
      window.history.back();
    }
  };

  const onClear = (e) => {
    setFile(null);
    setUrl("");
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append(`file`, file);
    formData.append(`username`, currentUser);
    dispatch(profileUpload(formData));
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (updateStatus === "SUCCESS") {
      setFile(null);
      setUrl("");
    }
  }, [updateStatus]);
  // if (!isConfirmed)
  //   return (
  //     <ConfirmPwd setIsConfirmed={setIsConfirmed} setInfoType={setInfoType} />
  //   );
  return (
    <EditInfoStyle>
      <div>
        {url ? (
          <>
            <div
              className="profile__img"
              alt="profile__img"
              style={{
                backgroundImage: `url("${url}") `,
              }}
            >
              <div className="profile__img__changed">
                <label htmlFor="profile">변경하기</label>
                <input
                  id="profile"
                  name="profile"
                  type="file"
                  accept="image/*"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="profile__button">
              <button onClick={onSubmit}>
                변경 <strong>수락</strong>
              </button>
              <button onClick={onClear}>
                변경 <strong>취소</strong>
              </button>
            </div>
          </>
        ) : (
          <div
            className="profile__img"
            alt="profile__img"
            style={{
              backgroundImage: `url("${profile_path}") `,
            }}
          >
            <div className="profile__img__changed">
              <label htmlFor="profile">변경하기</label>
              <input
                id="profile"
                name="profile"
                type="file"
                accept="image/*"
                onChange={onChangeHandler}
              />
            </div>
          </div>
        )}

        <div className="profile__nickname">
          <p>닉네임</p>
          <p>{currentUser}</p>
        </div>
        <div className="profile__email">
          <p>이메일</p>
          <p>무엇무엇</p>
        </div>
        <div className="profile__phone">
          <p>휴대폰 번호</p>
          <p>010-1234-5678</p>
        </div>
        <div className="profile__delete">
          <p>정보 수정 하기</p>
          <p onClick={onDeleteClick}>회원 탈퇴 하기</p>
        </div>
      </div>
    </EditInfoStyle>
  );
};
export default EditInfo;
