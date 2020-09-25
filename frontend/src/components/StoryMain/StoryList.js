import React from 'react';
import styled from 'styled-components'

const StoryListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  section{
    width: 48%;
    display: flex;
    flex-direction: column;
    align-items: center;
    article{
        display: flex;
        justify-content: space-between;
        margin: 40px;
        width: 100%;
        height:100% ;
        div{
          height:50%;
          width: 50%;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
        }
    }
  }
`;

const StoryList = () => {
    return (
        <StoryListStyle>
            <section>
                <article>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </article>
                <article>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                </article>
            </section>
        </StoryListStyle>
    );
}

export default StoryList;