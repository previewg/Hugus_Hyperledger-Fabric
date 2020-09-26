import React, {useState} from "react";
import styled from 'styled-components';
import {EditInfo, History, MyHome, MyNews} from "../components";
import ConfirmPwd from "../components/UserInfo/ConfirmPwd";



const UserInfoSideBar = styled.div`
display: flex;
align-items: center;
height: 100vh;
    section {
    margin-left: 70px;
    display: flex;
    flex-direction: column;
    align-content: center;
    font-size: x-large;
    
        li{
        border-radius: 40px;
        margin-top: 20px;
        display: flex;
        list-style: none;
        background: #CCCCCC;
        padding: 15px;
        border-bottom-color: black;
        justify-content: center;
        align-content: center;
       
        }
        .profile_image{
            background:#808080;
            height: 140px;

        }
    }
`
const InfoMains = styled.div`

`


const UserInfo = () => {
    const [infoType, setInfoType] = useState('my_home')

    const typeChange = (e) => {
        e.preventDefault();
        setInfoType(e.target.getAttribute('name'));
    }


    return (<>
            <UserInfoSideBar type={infoType}>
                <section>

                    <li name="my_home" onClick={(e) => typeChange(e)}>MY홈
                    </li>
                    <li name="my_news" onClick={(e) => typeChange(e)}>내 소식
                    </li>
                    <li name="my_history" onClick={(e) => typeChange(e)}>후원 이력
                    </li>
                    <li name="edit_profile" onClick={(e) => typeChange(e)}>회원 정보 수정
                    </li>
                </section>

                <InfoMains>
                    <div>
                        {infoType === "my_home" ? <MyHome/> : null}
                    </div>
                    <div>
                        {infoType === "my_news" ? <MyNews/> : null}
                    </div>
                    <div>
                        {infoType === "my_history" ? <History/> : null}
                    </div>
                    <div>
                        {infoType === "edit_profile" ? <ConfirmPwd/> : null}
                    </div>
                </InfoMains>
            </UserInfoSideBar>
        </>
    )
}


export default UserInfo;