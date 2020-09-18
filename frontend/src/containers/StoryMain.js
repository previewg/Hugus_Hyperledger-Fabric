import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import StorySlider from "../components/StoryMain/StorySlider";
import StoryNav from "../components/StoryMain/StoryNav";
import StoryList from "../components/StoryMain/StoryList";

const StoryMainStyle = styled.div`
  display: flex;
  flex-direction: column;
  .StoryWrite__btn{
    position: absolute;
    top:22%;
    right: 15%;
    color:black;
    text-decoration: none;
  }
  
`;

const StoryMain = () => {

    return (
        <StoryMainStyle>
            <StoryNav/>
            <Link className='StoryWrite__btn' to='/story/write' >글작성</Link>
            <StorySlider />
            <StoryList/>
        </StoryMainStyle>

    );
}

export default StoryMain;