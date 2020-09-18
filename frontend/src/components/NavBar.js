import React from 'react';
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