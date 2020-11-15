import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpload, signDestroyRequest } from "../../actions/auth";
import styled from "styled-components";
import ConfirmPwd from "./ConfirmPwd";
import { updateInfo } from "../../actions/auth";
import user from "../../reducers/user";

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
      width: 250px;
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      margin-top: 30px;
      > p:nth-child(2) {
        padding-left: 10px;
      }

      .update__nickname {
        width: 100%;
        height: 13px;
        font-size: 15px;
        transition: 0.4s ease-in-out;
        border: solid 0.2px lightgray;
        padding: 10px;
        border-radius: 20px;

        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
    }

    .profile__phone {
      width: 250px;
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      > p:nth-child(2) {
        padding-left: 10px;
      }
      .update__phone {
        width: 100%;
        height: 13px;
        font-size: 15px;
        transition: 0.4s ease-in-out;
        border: solid 0.2px lightgray;
        padding: 10px;
        border-radius: 20px;
        :focus {
          outline: none;
          border: solid 0.1px orange;
        }
      }
    }

    .profile__email {
      width: 250px;
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      > p:nth-child(2) {
        padding-left: 10px;
      }
    }

    .profile__delete {
      width: 250px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: 30px;
      cursor: pointer;
      p:nth-child(1) {
        width: 85%;
        height: 30px;
        border: solid 0.1px #2273ff;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #2273ff;
        :hover {
          font-weight: bold;
        }
      }
      p:nth-child(2) {
        width: 85%;
        height: 30px;
        border: solid 0.1px gray;
        border-radius: 5px;
        text-align: center;
        color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          color: #fc4d4d;
          border: solid 0.1px #fc4d4d;
          font-weight: bold;
        }
      }
    }
  }
`;

const EditInfo = ({ setInfoType, profile, nickname }) => {
  const dispatch = useDispatch();
  const updateStatus = useSelector((state) => state.auth.profileChange.status);
  const isSocial = useSelector((state) => state.auth.user.social);
  const email = useSelector((state) => state.auth.user.email);
  const myPageData = useSelector((state) => state.auth.myPage_User);
  const username = useSelector((state) => state.auth.user.nickname);
  const phone_number = useSelector((state) => state.auth.user.phone_number);
  const naverObj = useSelector((state) => state.auth.naverObj);

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [userInfo, setUserInfo] = useState({
    nickname: username,
    phone: phone_number,
  });
  const [errorCode, setErrorCode] = useState();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [profileFile, setProfileFile] = useState("/icons/hugus_icon.png");

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 탈퇴 하시겠습니까?");
    if (ok) {
      if (naverObj.getLoginStatus) {
        naverObj.logout();
        console.log("네이버 로그아웃 완료");
      }
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          console.log("카카오 로그아웃 완료");
        });
      }
      await dispatch(signDestroyRequest(email));
      window.history.back();
    }
  };

  const errorMsg = [
    "닉네임이 이미 존재합니다.",
    "휴대전화 번호는 숫자와 '-' 만 입력가능합니다.",
  ];

  const onClear = (e) => {
    setFile(null);
    setUrl("");
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append(`file`, file);
    formData.append(`username`, nickname);
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

  const onChangeInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
    if (e.key === "Enter") {
      onClickUpdate();
    }
  };

  const openUpdateForm = () => {
    setUpdateOpen(true);
  };
  const onClickUpdate = () => {
    dispatch(updateInfo(userInfo));

    setUserInfo({
      // nickname: myPageData.nickname,
      // phone:myPageData.phone,
      ...userInfo,
    });
  };
  useEffect(() => {
    if (profile) setProfileFile(profile);
    if (updateStatus === "SUCCESS") {
      setFile(null);
      setUrl("");
    }
    if (myPageData.success === 1)
      setUserInfo({
        nickname: myPageData.nickname,
        phone: myPageData.phone,
      });
    else
      setUserInfo({
        nickname: username,
        phone: phone_number,
      });
    if (myPageData.status === "SUCCESS") {
      setUpdateOpen(false);
      alert("수정완료 되었습니다.");
    } else if (myPageData.status === "FAILURE") {
      setErrorCode(myPageData.code);
      if (errorCode) {
        alert(errorMsg[errorCode]);
      }
    }
  }, [updateStatus, myPageData.status, myPageData, errorCode]);

  if (!isConfirmed && !isSocial)
    return (
      <ConfirmPwd setIsConfirmed={setIsConfirmed} setInfoType={setInfoType} />
    );
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
              backgroundImage: `url("${profileFile}") `,
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
          {updateOpen ? (
            <input
              className="update__nickname"
              id="nickname"
              value={userInfo.nickname}
              placeholder="변경하고자 하는 닉네임을 입력해 주세요"
              onChange={onChangeInfo}
              onKeyPress={onChangeInfo}
            />
          ) : (
            <p>{myPageData.success === 1 ? userInfo.nickname : username}</p>
          )}
        </div>
        <div className="profile__phone">
          <p>휴대전화</p>
          {updateOpen ? (
            <input
              className="update__phone"
              id="phone"
              value={userInfo.phone}
              placeholder="휴대전화번호를 입력해 주세요"
              onChange={onChangeInfo}
              onKeyPress={onChangeInfo}
            />
          ) : (
            <p>{myPageData.success === 1 ? userInfo.phone : phone_number}</p>
          )}
        </div>
        <div className="profile__email">
          <p>이메일</p>
          <p>{email}</p>
        </div>
        <div className="profile__delete">
          {updateOpen ? (
            <p onClick={onClickUpdate}>수정 완료 하기</p>
          ) : (
            <p onClick={openUpdateForm}>정보 수정 하기</p>
          )}
          <p onClick={onDeleteClick}>회원 탈퇴 하기</p>
        </div>
      </div>
    </EditInfoStyle>
  );
};
export default EditInfo;
