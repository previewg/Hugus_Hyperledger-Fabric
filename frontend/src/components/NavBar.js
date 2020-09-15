import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const NavStyle = styled.nav`
  display: flex;
  height: 70px;
  border-bottom: solid 0.1px ;
  align-items: center;
  text-align: center;
  a{
    text-decoration: none;
    color:black;
  }
  .nav__title{
    width:25%;
  }
  .nav__link{
    width:15%;
  }
`;

const NavBar = () => {
    return (
        <NavStyle>
            <Link className="nav__title" to="/">
                Hug Us
            </Link>
            <Link className="nav__link" to="/">
                Story
            </Link>
            <Link className="nav__link" to="/">
                My
            </Link>
            <Link className="nav__link" to="/">
                Act
            </Link>
        </NavStyle>
    )
}

export default NavBar;