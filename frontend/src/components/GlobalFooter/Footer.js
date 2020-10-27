import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
font-size: 15px;
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
border: none;
margin-top: 20px;
margin-bottom: 20px;
border-top: solid lightgray 1px;
    .first__layout{
    color: #9d9999;
    width: 24%;
    min-width: 440px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-left: 30px;
    }
   
    .second__layout{
     width: 50%;
     color: #9d9999;
     min-width: 440px;
     margin-top: 30px;
     margin-left: 30px;
     >span{
     font-weight: bold;
     color: orange;
     }
    }

`

const Footer = () => {
    return (
        <FooterStyle>
            <div className={'first__layout'}>
                <div>HUGUS 소개</div>
                <div>|</div>
                <div>HUGUS 이용약관</div>
                <div>|</div>
                <div>개인정보처리방침</div>
                <div>|</div>
                <div>허철진 바보</div>
            </div>
            <div className={'second__layout'}>
                대표 허철진 | 대표변호 010 5019 2736
            </div>
            <div className={'second__layout'} >
                블록체인 기반 기부 플랫폼 <span>HUGUS</span>
            </div>

        </FooterStyle>
    )
}
export default Footer;
