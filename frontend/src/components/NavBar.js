import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const NavStyle = styled.nav`
  display: flex;
  height: 60px;
  border-bottom: solid 0.1px ;
  align-items: center;
  text-align: center;
  
  a{
    text-decoration: none;
    color:black;
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
    div{
      margin: 10%;
    }
  }
  
  .user{
  padding-left: 30px;
    display: flex;
    width:15%;
    align-items: center;
    justify-content: space-around;
    .user__icon{
      width:40px;
    }
    .search__icon{
      width:25px;
    }
  }
`;

const NavBar = () => {
    return (
        <NavStyle>
          <div className="nav__title" >
            <Link to="/">
              HUGUS
            </Link>
          </div>
          <div className='nav__menus'>
            <div>
              <Link to="/story">
                Story
              </Link>
            </div>
            <div>
              <Link to="/my">
                My
              </Link>
            </div>
            <div>
              <Link to="/act">
                Act
              </Link>
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