import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signDestroyRequest} from "../../actions/auth";

const EditInfo = () => {
    const username = useSelector(state => state.authentication.status.currentUser);
    const dispatch = useDispatch();

    const signDestroyHandler = () => {
        console.log("클릭됨!!")
        dispatch(signDestroyRequest(username))
        alert("회원탈퇴가 완료되었습니다.")
        window.history.back()

    }

   // useEffect( ()=>{
   //     if(signStatus==="SUCCESS"){
   //         alert("회원 탈퇴가 완료되었습니다");
   //     }
   //     else if(signStatus==="FAILURE"){
   //         alert("못나가")
   //     }
   // },[signStatus])
    return (
        <div>
<span onClick={signDestroyHandler}>
    회원 퇄퇴 하기
</span>
            </div>
    )
}
export default EditInfo;