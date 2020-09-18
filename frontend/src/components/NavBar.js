import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const NavStyle = styled.nav`
  position: fixed;
  width: 100%;
  display: flex;
  height: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
  align-items: center;
  text-align: center;
  background-color: white;
  z-index: 100;
  a{
    text-decoration: none;
    color:black;
    transition : .2s ease-in-out;
  }
  .nav__title{
    padding-left: 70px;
    text-align: start;
    width:15%;
    font-size: xx-large;
    font-weight: bold;
    :hover{
        a{
          color: orange;
        }
    }
  }
  .nav__menus{
  height: 50px;
    width:60%;
    display:flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    div{
      margin: 10%;
    }
  }
  .dropdown{
      display: flex;
      justify-content: center;
      ul{
        visibility: hidden;
        display: flex;
        position: absolute;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        top: 45px;
        border: solid 1px orange;
        backdrop-filter: blur(6px);
        width:90px;
        transition : .3s ease-in-out;
        opacity: 0;
        padding: 20px;
         a{
         color: #666666;
         display: flex;
         align-items: center;
         height: 40px;
          font-size: 14px;
          transition : .1s ease-in-out;
             :hover{
              transform: translateX(10px);
              color: orange;
             }
          }
      }
      :hover{
        ul{
          visibility: visible;
          opacity: 1;
        }
      }
  }
  .user{
    padding-left: 30px;
    display: flex;
    width: 300px;
    align-items: center;
    justify-content: space-around;
    a{
    display: flex;
    align-items: center;
    }
    .user__icon{
      width:35px;
    }
    .search__icon{
      width:25px;
    }
  }
  
  
  @media ( max-width: 700px ){
      .res__menu__btn{
          width: 35px;
          height: 60%;
          box-sizing: border-box;
          position: absolute;
          right: 30px;
          cursor:pointer;
          
          span{
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: black;
            border-radius: 4px;
            transition: all .3s ease-in-out;
          }
          span:nth-child(1) {
            ${props => props.isClicked ?'transform:rotate(-45deg); top:15px;right:1px;background-color:orange' : 'top:5px;right:1px'}
            }
            
          span:nth-child(2) {
            ${props => props.isClicked? 'opacity: 0;top:15px;right:1px' : 'top:15px;right:1px'}
            }
            
          span:nth-child(3) {
            ${props => props.isClicked?'transform: rotate(45deg);top:15px;right:1px;background-color:orange' : 'top:25px;right:1px'}
            }
      }
      .user{
       display: none;
      }
      .nav__menus{
      display: none;
      }
      
      
      
  }
`;

const ResNavStyle = styled.nav`
    @media (max-width: 700px){
      position: absolute;
      z-index: 10;
      transition: all .4s ease-in-out;
      visibility: ${props=>props.isClicked?'visible':'hidden'};
      background-color: white;
      width: 100%;
      height: 400px;
      top: ${props=>props.isClicked?'0':'-400px'};
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
      
      section{
      height: 350px;
      margin-top: 50px;
        display: flex;
        .res__menu__item{
          padding: 10px;
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          div{
            border:solid;
          }
        }
        .res__menu__line{
          width: 1px;
          height: 310px;
          margin: 20px;
          background-color: lightgray;
        }
        .res__menu__info{
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
    
`;


const NavBar = () => {
    const [isClicked,setIsClicked] = useState(false);

    const onClickHandler = () =>{
        isClicked ? setIsClicked(false):setIsClicked(true);
    }

    return (
      <>
          <NavStyle isClicked={isClicked}>
              <div className="nav__title">
                  <Link to="/">
                      HUGUS
                  </Link>
              </div>
              <div className='nav__menus'>
                  <div className='dropdown'>
                      <Link to="/story">
                          Story
                      </Link>
                      <ul>
                          <Link to=''>인기 스토리</Link>
                          <Link to=''>최신 스토리</Link>
                          <Link to=''>관심 스토리</Link>
                      </ul>
                  </div>
                  <div className='dropdown'>
                      <Link to="/my">
                          My
                      </Link>
                      <ul>
                          <Link to=''>캠페인 모금현황</Link>
                          <Link to=''>스토리 투표현황</Link>
                      </ul>
                  </div>
                  <div className='dropdown'>
                      <Link to="/act">
                          Act
                      </Link>
                      <ul>
                          <Link to=''>물품 구매 인증</Link>
                          <Link to=''>물품 전달 과정</Link>
                          <Link to=''>수혜자의 이야기</Link>
                      </ul>
                  </div>
              </div>
              <div className='user'>
                  <img className='user__icon' src='/icons/User.png'/>
                  <p>(이름)</p>
                  <Link >(로그인)</Link>
                  <Link to='/search'>
                      <img className='search__icon' src='/icons/Search.png'/>
                  </Link>
              </div>
              <div className='res__menu__btn' onClick={onClickHandler}>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
          </NavStyle>
          <ResNavStyle isClicked={isClicked}>
              <section>
                  <article className='res__menu__item'>
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                  </article>
                  <article className='res__menu__line'>
                      <div></div>
                  </article>
                  <article className='res__menu__info'>
                      <div>user1</div>
                      <div>로그인</div>
                      <div>검색</div>
                  </article>

              </section>
          </ResNavStyle>
      </>

    )
}

export default NavBar;