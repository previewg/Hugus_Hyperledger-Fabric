import React from 'react';
import StorySlider from "../components/StoryMain/StorySlider";
import styled from 'styled-components';

const StoryMenuStyle = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  section{
      width: 40%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      article{
        font-size: 20px;
        cursor: pointer;
      }
  }
  
`;



const StoryMain = () => {
    return (
        <>
            <StoryMenuStyle>
                <section>
                    <article>최신 스토리</article>
                    <article>인기 스토리</article>
                    <article>관심 스토리</article>
                    <article>지난 스토리</article>
                </section>
            </StoryMenuStyle>
            <StorySlider />
        </>
    );
}

export default StoryMain;