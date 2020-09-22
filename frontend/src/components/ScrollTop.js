import React from 'react';
import styled from 'styled-components'

const ScrollTopStyle = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor:pointer;

      .scroll {
      opacity: 0.3;
      background-color: orange;
      width: 40px;
      height: 40px;
      position: fixed;
      bottom: 10px;
      right: 10px;
      border-radius: 5px;
      border: none;
      
      &:hover {
        opacity: 1;
      }


}
  
`;


const ScrollTop = () => {

    const onClickHandler = () => {
        window.scrollTo({top:0,left:0,behavior:'smooth'});
    };

    return(
        <ScrollTopStyle onClick={onClickHandler}>
            <button title='Back to top' className='scroll'>
                top
            </button>
        </ScrollTopStyle>
    )
}

export default ScrollTop;