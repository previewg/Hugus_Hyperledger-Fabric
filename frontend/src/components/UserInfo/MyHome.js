import React from "react";
import styled from 'styled-components';
import {useSelector} from "react-redux";

const User_Info = styled.div`
display: flex;
font-size: large;
background-color: antiquewhite;
align-items: center;
justify-content: center;
width: 100%;
height: 50px;
border-radius: 30px;
margin-left: 70px;
`
const MyHome_Main = styled.div`
display: flex;
flex-direction: column;
margin-left: 170px;
padding: 20px 20px;

.section_item{
padding: 20px;
font-size: x-large;
}
.section_big_item{

font-size: x-large;

}
`

const MyHome = () => {
    const username = useSelector(state => state.authentication.status.currentUser);
    return (<>

            <User_Info >
                {username} 님의 정보입니다.
            </User_Info>
        <MyHome_Main>

            <div className='section_item'>
                기부 건수
            </div>
            <div className='section_item'>
                내가 쓴 글
            </div>
            <div className='section_item'>
                총 후원금액
            </div>
        </MyHome_Main>
        </>
    )
}
export default MyHome;