import React from 'react';
import styled from 'styled-components'

const ScrollTopStyle = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor:pointer;
`;


const ScrollTop = () =>{
    const onClickHandler = () => {
        window.scrollTo({top:0,left:0,behavior:'smooth'})
    }

    return(
        <ScrollTopStyle onClick={onClickHandler}>
            맨위로
        </ScrollTopStyle>
    )
}

export default ScrollTop;