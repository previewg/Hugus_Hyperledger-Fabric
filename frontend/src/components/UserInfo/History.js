import React from "react";
import {useSelector} from "react-redux";
import styled from 'styled-components';

const History_main = styled.section`
display: flex;
.section_intro{
    font-size: xx-large;
    
    }
    .section_middle{
    margin-top: 40px;
    border-style: solid;
    padding: 70px;
    }
`
const History = () => {
    const username = useSelector(state => state.authentication.status.currentUser);
    return (
        <History_main>
            <div className="section_intro">
                {username}님께서 참여하신 캠페인은 총 n 건 입니다.
            </div>
        </History_main>
    )
}
export default History;