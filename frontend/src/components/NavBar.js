import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const NavStyle = styled.nav`
  
  display: flex;
  height: 50px;
  border-bottom: solid 0.1px ;
  align-items: center;
  text-align: center;
  background-color: #333333;
  
  a{
    text-decoration: none;
    color:#d6d6d6;
    transition : .2s ease-in-out;
    :hover{
     color:white;
    }
  }
  
  
  .nav__title{
    padding-left: 70px;
    text-align: start;
    width:15%;
    font-size: xx-large;
    font-weight: bold;
  }
  
  .nav__menus{
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
      z-index: 10;
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
        background-color: #bcbcbc;
        width:90px;
        transition : .2s ease-in-out;
        opacity: 0;
        padding: 20px;
         a{
         color: white;
         display: flex;
         align-items: center;
         height: 40px;
          font-size: 13px;
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
    width:15%;
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
`;

const NavBar = () => {
    return (
        <NavStyle>
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
                <Link>(로그인)</Link>
                <Link to='/search'>
                    <img className='search__icon' src='/icons/Search.png'/>
                </Link>
            </div>
        </NavStyle>
    )
}

export default NavBar;