import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EditInfo, History, MyHome, MyNews } from "components";
import { useSelector } from "react-redux";
import axios from "axios";

const UserInfoStyle = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 200px;
  .side {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 25%;
    article {
      min-width: 170px;
      .side__user {
        height: 170px;
        background-color: #9c9c9c;
        border-bottom: orange 5px solid;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > div {
          width: 50px;
          height: 50px;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 25px;
        }
        > p {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 0px;
        }
      }
      .side__menu {
        background-color: #f1f1f1;
        height: 300px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        > p {
          margin: 10px;
          width: 130px;
          padding: 5px;
          padding-bottom: 10px;
          display: flex;
          justify-content: flex-start;
          align-content: center;
          color: #454545;
          border-bottom: solid lightgray 0.1px;
          transition: color 0.2s ease-in-out;
          cursor: pointer;
          :hover {
            color: orange;
          }
        }
      }
    }
  }
  .main {
    width: 65%;
  }
`;

const UserInfo = () => {
  const [infoType, setInfoType] = useState("my__home");
  const [myHome, setMyHome] = useState({
    story: null,
  });
  const flag = useRef(true);
  const profile_path = useSelector(
    (state) => state.authentication.status.profile_path
  );
  const currentUser = useSelector(
    (state) => state.authentication.status.currentUser
  );

  const typeChangeHandler = (e) => {
    setInfoType(e.target.id);
  };

  useEffect(() => {
    if (flag.current) {
      const init = async () => {
        const result = await axios.get(`/story?user=${currentUser}`);
        setMyHome({ story: result.data.list });
      };
      init();
    }
    return () => {
      flag.current = false;
    };
  }, [profile_path]);

  return (
    <UserInfoStyle>
      <section className="side">
        <article>
          <div className="side__user">
            {profile_path ? (
              <div
                style={{
                  backgroundImage: `url("${profile_path}") `,
                }}
              ></div>
            ) : (
              <div
                style={{
                  backgroundImage: `url("/icons/hugus_icon.png") `,
                }}
              ></div>
            )}

            <p>{currentUser}님</p>
          </div>
          <div className="side__menu">
            <p id="my__home" onClick={typeChangeHandler}>
              MY홈
            </p>
            <p id="my__news" onClick={typeChangeHandler}>
              내 소식
            </p>
            <p id="my__history" onClick={typeChangeHandler}>
              후원 이력
            </p>
            <p id="edit__profile" onClick={typeChangeHandler}>
              회원 정보 관리
            </p>
          </div>
        </article>
      </section>

      <section className="main">
        {infoType === "my__home" && <MyHome currentUser={currentUser} />}
        {infoType === "my__news" && <MyNews />}
        {infoType === "my__history" && <History />}
        {infoType === "edit__profile" && <EditInfo setInfoType={setInfoType} />}
      </section>
    </UserInfoStyle>
  );
};

export default UserInfo;
