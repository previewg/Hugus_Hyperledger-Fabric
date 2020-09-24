import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const MoreBtnStyle = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  div{
  width: 17%;
  display: flex;
  justify-content: flex-end;
    img{
      background-color: #FFA500;
      border-radius: 50px;
      width: 40px;
      transition: 0.4s ease-in-out;
      ${props=>props.icon ?'margin-right:10px;':'margin-right:0'};
    }
  }
  button{
      margin-left: 10px;
      text-align: left;
      border:none;
      background-color: transparent;
      font-size: 15px;
      transition: 0.3s ease-in-out;
      outline:none;
      :hover{
        transform: scale(1.15);
        color: orange;
      }
  }

`

const StoryMoreBtn = () => {
    const [icon,setIcon] = useState(false);

    const scrollDown = () => {
        window.scrollTo({top:900,left:0,behavior:'smooth'});
    }

    useEffect(()=>{
        const moving = setInterval(()=>{
            icon ? setIcon(false):setIcon(true)
        },500);
        return () => clearInterval(moving);
    },[icon])

    return(
        <MoreBtnStyle icon={icon}>
            <div>
                <img id='more__icon' alt='more__icon' src='icons/rightArrow.svg'/>
            </div>
            <button onClick={scrollDown}>여기를 눌러<br/>더 많은 스토리를 둘러보세요!</button>
        </MoreBtnStyle>
    )
};

export default StoryMoreBtn;