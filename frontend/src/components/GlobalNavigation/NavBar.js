import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signOutRequest } from "actions/auth";
import { signInBtnIsClicked } from "actions/user";

const NavStyle = styled.nav`
  position: fixed;
  width: 100%;
  display: flex;
  height: 60px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  align-items: center;
  text-align: center;
  background-color: white;
  z-index: 100;
  a {
    text-decoration: none;
    color: black;
    transition: 0.2s ease-in-out;
  }
  .nav__title {
    display: flex;
    align-items: flex-start;
    padding-left: 40px;
    text-align: start;
    width: 15%;
    font-size: xx-large;
    font-weight: bold;
    .logo {
      width: 20px;
      margin-right: 20px;
    }
    :hover {
      a {
        color: orange;
      }
    }
  }
  .nav__menus {
    height: 50px;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    div {
      margin: 10%;
    }
  }
  .dropdown {
    display: flex;
    justify-content: center;
    > a {
      cursor: pointer;
    }
    ul {
      visibility: hidden;
      display: flex;
      position: absolute;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      top: 45px;
      border: solid 1px orange;
      backdrop-filter: blur(6px);
      width: 90px;
      transition: 0.3s ease-in-out;
      opacity: 0;
      padding: 20px;
      a {
        color: #666666;
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 14px;
        transition: 0.1s ease-in-out;
        :hover {
          transform: translateX(10px);
          color: orange;
        }
      }
    }
    :hover {
      ul {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .user {
    display: flex;
    position: absolute;
    right: 10px;
    width: 20%;
    align-items: center;
    justify-content: space-around;
    p:nth-child(3) {
      cursor: pointer;
    }
    a {
      display: flex;
      align-items: center;
    }
    a:nth-child(1) {
      width: 40px;
      height: 40px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 20px;
    }
    .user__icon {
      width: auto;
      height: auto;
      max-width: 40px;
      max-height: 40px;
    }
    .search__icon {
      width: 25px;
    }
    img {
      cursor: pointer;
    }
  }

  @media (max-width: 700px) {
    .res__menu__btn {
      width: 35px;
      height: 60%;
      box-sizing: border-box;
      position: absolute;
      right: 30px;
      cursor: pointer;

      span {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: black;
        border-radius: 4px;
        transition: all 0.3s ease-in-out;
      }
      span:nth-child(1) {
        ${(props) =>
          props.menuClicked
            ? "transform:rotate(-45deg); top:15px;right:1px;background-color:orange"
            : "top:5px;right:1px"}
      }

      span:nth-child(2) {
        ${(props) =>
          props.menuClicked
            ? "opacity: 0;top:15px;right:1px"
            : "top:15px;right:1px"}
      }

      span:nth-child(3) {
        ${(props) =>
          props.menuClicked
            ? "transform: rotate(45deg);top:15px;right:1px;background-color:orange"
            : "top:25px;right:1px"}
      }
    }
    .user {
      display: none;
    }
    .nav__menus {
      display: none;
    }
  }
`;

const ResNavStyle = styled.nav`
  display: none;
  @media (max-width: 700px) {
    display: block;
    position: fixed;
    z-index: 10;
    transition: all 0.4s ease-in-out;
    visibility: ${(props) => (props.menuClicked ? "visible" : "hidden")};
    background-color: white;
    width: 100%;
    height: 400px;
    top: ${(props) => (props.menuClicked ? "0" : "-400px")};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);

    section {
      height: 350px;
      margin-top: 50px;
      display: flex;
      .res__menu__item {
        padding: 10px;
        width: 60%;
        display: flex;
        justify-content: space-around;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        div {
          height: 100%;
          width: 30%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          > div {
            height: 20px;
          }
          > p {
            margin: 0;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;
            height: 80px;
            text-align: center;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            :hover {
              background-color: orange;
              color: white;
            }
          }
          .hugus {
            background-color: orange;
            color: white;
            font-weight: bold;
          }
        }
      }
      .res__menu__info {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          :hover {
            color: orange;
          }
        }
        a {
          color: black;
          text-decoration: none;
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          :hover {
            color: orange;
          }
        }
      }
    }
  }
`;

const NavBar = () => {
  const { Kakao } = window;
  const [menuClicked, setMenuClicked] = useState(false);
  const init = useRef(true);
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.auth.user.nickname);
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const profile = useSelector((state) => state.auth.user.profile);
  const email = useSelector((state) => state.auth.user.email);

  const onClickHandler = () => {
    menuClicked ? setMenuClicked(false) : setMenuClicked(true);
  };
  const naverObj = useSelector((state) => state.auth.naverObj);

  const SignOutHandler = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      // console.log("카카오 인증 토큰 존재", window.Kakao.Auth.getAccessToken());
      window.Kakao.Auth.logout(() => {
        // console.log("로그아웃 완료", window.Kakao.Auth.getAccessToken());
      });
    } else if (naverObj.getLoginStatus) {
      naverObj.logout();
    }
    dispatch(signOutRequest());
  };

  const NaverAPI = useCallback(() => {
    naverObj.init();
  }, []);

  const KakaoAPI = useCallback(() => {
    Kakao.init("da409c8b843f70cc0a9b46369e513be9");
  }, []);

  useEffect(() => {
    if (init.current) {
      KakaoAPI();
      NaverAPI();
      init.current = false;
    }
  }, [profile, nickname]);

  const SignedIn = () => {
    if (isLoggedIn) {
      return (
        <>
          <p>{nickname}님</p>
          <div style={{ cursor: "pointer" }} onClick={SignOutHandler}>
            로그아웃
          </div>
        </>
      );
    } else {
      return (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(signInBtnIsClicked())}
        >
          로그인
        </p>
      );
    }
  };

  const UserIcon = () => {
    if (isLoggedIn) {
      if (email === "admin@admin")
        return (
          <Link
            to="/admin/only"
            style={{
              backgroundImage: `url("/icons/hugus_icon.png") `,
            }}
          ></Link>
        );
      if (profile) {
        return (
          <Link
            to="/my"
            style={{
              backgroundImage: `url("${profile}") `,
            }}
          ></Link>
        );
      } else {
        return (
          <Link
            to="/my"
            to="/my"
            style={{
              backgroundImage: `url("/icons/hugus_icon.png") `,
            }}
          ></Link>
        );
      }
    }
    return (
      <img
        className="user__icon"
        alt="user__icon"
        src="/icons/user.png"
        onClick={() => dispatch(signInBtnIsClicked())}
      />
    );
  };

  return (
    <>
      <button id="naverIdLogin" style={{ display: "none" }} />
      <NavStyle menuClicked={menuClicked}>
        <div className="nav__title">
          <img className="logo" alt="hugus" src="/icons/hugus.svg" />
          <Link to="/">HUGUS</Link>
        </div>
        <div className="nav__menus">
          <div className="dropdown">
            <Link to="/story">Story</Link>
            <ul>
              <Link to="/story?type=hot">인기 스토리</Link>
              <Link to="/story?type=new">최신 스토리</Link>
              {isLoggedIn ? (
                <Link to="/story?type=my">관심 스토리</Link>
              ) : (
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(signInBtnIsClicked())}
                >
                  관심 스토리
                </a>
              )}
            </ul>
          </div>
          <div className="dropdown">
            {isLoggedIn ? (
              <Link to="/my">My</Link>
            ) : (
              <a onClick={() => dispatch(signInBtnIsClicked())}>My</a>
            )}
            {/*<ul>*/}
            {/*  <Link to="">캠페인 모금현황</Link>*/}
            {/*  <Link to="">스토리 투표현황</Link>*/}
            {/*</ul>*/}
          </div>
          <div className="dropdown">
            <Link to="/act">Act</Link>
          </div>
          <div className="dropdown">
            <Link to="/talk">Talk</Link>
          </div>
        </div>
        <div className="user">
          <UserIcon />
          <SignedIn />
          <Link to="/search">
            <img
              className="search__icon"
              alt="search__icon"
              src="/icons/Search.png"
            />
          </Link>
        </div>
        <div className="res__menu__btn" id="menu" onClick={onClickHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </NavStyle>
      <ResNavStyle menuClicked={menuClicked}>
        <section>
          <article className="res__menu__item">
            <div>
              <div>STORY</div>
              <p>
                인기
                <br />
                스토리
              </p>
              <p>
                최신
                <br />
                스토리
              </p>
              <p>
                관심
                <br />
                스토리
              </p>
            </div>
            <div>
              <div>MY</div>
              <p>
                캠페인
                <br />
                모금현황
              </p>
              <p className="hugus">HUGUS</p>
              <p>
                스토리
                <br />
                투표현황
              </p>
            </div>
            <div>
              <div>ACT</div>
            </div>
            <div>
              <div>TALK</div>
            </div>
          </article>
          <article className="res__menu__info">
            <UserIcon />
            <SignedIn />
            <Link to="/search">검색</Link>
          </article>
        </section>
      </ResNavStyle>
    </>
  );
};

export default NavBar;
