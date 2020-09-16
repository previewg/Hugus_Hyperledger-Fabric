import React from 'react';
import styled from 'styled-components'

const StoryListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;  
  section{
    width: 60%;
    height: 500px;
    border:solid;
  }
`;

const StoryList = () => {
    return (
        <StoryListStyle>
            <section>
                여기에 게시물 로딩
            </section>
        </StoryListStyle>
    );
}

export default StoryList;