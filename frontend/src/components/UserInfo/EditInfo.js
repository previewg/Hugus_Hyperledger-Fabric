import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileUpload, signDestroyRequest} from "../../actions/auth";
import styled from 'styled-components';

const EditPage = styled.section`
display: flex;
font-size: large;
align-items: center;
justify-content: center;
width: 100%;
height: 50px;
border-radius: 30px;
margin-left: 70px;
.preImg{
height: 5%;
width: 5%;
.destroy_button{
display: flex;
width: 100%;
height: 70%;
background:#ff5c7e ;
color:white;
align-items: center;
justify-content: center;


}
}
`

const EditInfo = () => {
    const path = useSelector((state) => state.authentication.status.profile_path);
    const username = useSelector(state => state.authentication.status.currentUser);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({
        file: null,
    })
    const [profile_Path, setProfile_Path] =useState(path);

    const [preImg, setPreImg] = useState([]);
    const onDeleteClick = async () => {
        const ok = window.confirm('정말 탈퇴 하시겠습니까?')
        if (ok) {
            const ok2 = window.confirm('진짜로??')
            if (ok2) {
                await dispatch(signDestroyRequest(username))
                window.history.back()
            }
        }
    }

    const previewImg = (e) => {
        setPreImg([]);
        for (const file of e.target.files) {
            let reader = new FileReader();
            reader.onloadend = () => {
                let newPreImg = preImg;
                newPreImg.push({
                    file: file,
                    previewURL: reader.result
                });
                setPreImg(newPreImg);
            }
            reader.readAsDataURL(file);
        }
    }
    const onClear = (e) => {
        setPreImg([]
        )
    }
    const onSubmit = () => {
        const formData = new FormData();
        formData.append(`file`, profile.file[0]);
        formData.append(`username`, username);
        dispatch(profileUpload(formData))


    }
    const onChangeHandler = (e) => {
        console.log(profile_Path)
        console.log(path)
        e.preventDefault();
        if (e.target.name === 'file') {
            previewImg(e);
            setProfile({
                ...profile,
                [e.target.name]: e.target.files
            });

        }

    }
    useEffect(() => {
console.log("렌더링됨")
        console.log(path)
            setProfile_Path(path)

    }, [])

    return (
        <EditPage>
            <div>
                <img className="profile_img" alt="" src={"../" + profile_Path} />
            </div>
            <div className="profile_picture">
                프로필 사진 설정하기
                <div>
                    {preImg.map((item, key) => {
                        return (<img className='preImg' src={item.previewURL} key={key} alt='preview'/>)
                    })}
                    <label htmlFor='file'>
                    </label>
                    <input id="file" name='file' type='file' accept='image/*'
                           onChange={onChangeHandler}/>
                    <button onClick={onSubmit}>제출</button>
                    <button onClick={onClear}>클리어</button>
                </div>

            </div>

            <span onClick={onDeleteClick} className="destroy_button">
    회원 탈퇴 하기
</span>
        </EditPage>
    )
}
export default EditInfo;