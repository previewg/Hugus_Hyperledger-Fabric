import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {myListRequest} from "../../actions/myPage";

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
    const username = useSelector((state) => state.authentication.status.currentUser);
    const email = useSelector((state) => state.authentication.status.currentUser_Email)
    const writingList = useSelector((state) => state.myPage.pageList.list)
    const status = useSelector((state) => state.myPage.pageList.status)

    const dispatch = useDispatch();

    const [openList, setOpenList] = useState(false)


    const onClickWritingList = () => {

        if (openList === false) {
            setOpenList(true)
        } else {
            setOpenList(false)
        }

    }
    useEffect(() => {
        dispatch(myListRequest(email));
    }, [])

    return (<>

            <User_Info>
                {username} 님의 정보입니다.
            </User_Info>
            <MyHome_Main>

                <div className='section_item'>
                    기부 건수
                </div>
                <div className='section_item' onClick={onClickWritingList}>
                    내가 쓴 글 {writingList.length}건
                    {openList ? <div>
                        {writingList.map((title, key) => {
                            return (
                                <div key={key}>
                                    {title.story_title}
                                </div>
                            )
                        })}
                    </div> : null}
                </div>
                <div className='section_item'>
                    총 후원금액
                </div>
            </MyHome_Main>
            <div>

            </div>
        </>
    )
}

export default MyHome;