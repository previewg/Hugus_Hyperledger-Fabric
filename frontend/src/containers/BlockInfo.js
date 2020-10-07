import React, { useEffect } from 'react';
import styled from 'styled-components';
import StorySlider from "../components/Home/CampaignSlider";
import StoryNav from "../components/StoryMain/StoryNav";
import StoryList from "../components/StoryMain/StoryList";

import {signInBtnIsClicked} from "../actions/user";
import {useDispatch} from "react-redux";


const BlockInfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  .StoryWrite__btn{
    position: absolute;
    top:22%;
    right: 15%;
    color:black;
    text-decoration: none;
    cursor:pointer;
  }
  
`;

const BlockInfo = (props) => {
    const dispatch = useDispatch();
    const isLoggedIn = props.isLoggedIn;

    const onClickHandler = () => {
        if (isLoggedIn)  props.history.push('/story/write');
        else dispatch(signInBtnIsClicked())
    }

    useEffect(()=>{
      window.scrollTo(0,0);
    },[])

    return (
        <BlockInfoStyle>
            <StoryNav/>
            <p className='StoryWrite__btn' onClick={onClickHandler}  >글작성</p>
            <StoryList/>
        </BlockInfoStyle>

    );
}

export default BlockInfo;