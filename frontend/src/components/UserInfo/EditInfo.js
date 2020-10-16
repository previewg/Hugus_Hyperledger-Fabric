import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpload, signDestroyRequest } from "../../actions/auth";
import styled from "styled-components";
import ConfirmPwd from "./ConfirmPwd";

const EditInfoStyle = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  .profile {
    display: flex;
    .profile__img {
      min-width: 160px;
      min-height: 160px;
      width: 160px;
      height: 160px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 80px;
    }
  }
  .profile__nickname {
    display: flex;
  }
  .profile__email {
    display: flex;
  }
`;

const EditInfo = ({ setInfoType }) => {
  const dispatch = useDispatch();
  const profile_path = useSelector(
    (state) => state.authentication.status.profile_path
  );

  const username = useSelector(
    (state) => state.authentication.status.currentUser
  );
  const [profile, setProfile] = useState({
    file: null,
  });
  const [new_profile_path, setNew_profile_path] = useState(profile_path);
  const [preImg, setPreImg] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 탈퇴 하시겠습니까?");
    if (ok) {
      await dispatch(signDestroyRequest(username));
      window.history.back();
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
      };
      reader.readAsDataURL(file);
    }
  };

  const onClear = (e) => {
    setPreImg([]);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append(`file`, profile.file[0]);
    formData.append(`username`, username);
    dispatch(profileUpload(formData));
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "file") {
      previewImg(e);
      setProfile({
        ...profile,
        [e.target.name]: e.target.files,
      });
    }
  };

  if (!isConfirmed)
    return (
      <ConfirmPwd setIsConfirmed={setIsConfirmed} setInfoType={setInfoType} />
    );
  return (
    <EditInfoStyle>
      <div className="profile">
        <div
          className="profile__img"
          alt="profile__img"
          style={{
            backgroundImage: `url("${profile_path}") `,
          }}
        />
      </div>
      <div className="profile__nickname">
        <p>닉네임</p>
        <p>무엇무엇</p>
      </div>
      <div className="profile__email">
        <p>이메일</p>
        <p>무엇무엇</p>
      </div>
      {/*<div className="profile_picture">*/}
      {/*  프로필 사진 설정하기*/}
      {/*  <div>*/}
      {/*    {preImg.map((item, key) => {*/}
      {/*      return (*/}
      {/*        <img*/}
      {/*          className="preImg"*/}
      {/*          src={item.previewURL}*/}
      {/*          key={key}*/}
      {/*          alt="preview"*/}
      {/*        />*/}
      {/*      );*/}
      {/*    })}*/}
      {/*    <label htmlFor="file"></label>*/}
      {/*    <input*/}
      {/*      id="file"*/}
      {/*      name="file"*/}
      {/*      type="file"*/}
      {/*      accept="image/*"*/}
      {/*      onChange={onChangeHandler}*/}
      {/*    />*/}
      {/*    <button onClick={onSubmit}>제출</button>*/}
      {/*    <button onClick={onClear}>클리어</button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <span onClick={onDeleteClick} className="destroy_button">
        회원 탈퇴 하기
      </span>
    </EditInfoStyle>
  );
};
export default EditInfo;
