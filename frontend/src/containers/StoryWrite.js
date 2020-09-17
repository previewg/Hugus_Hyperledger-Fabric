import React, {useState} from 'react';
import styled from 'styled-components'
import {useDispatch} from "react-redux";
import {storyAdd} from "../actions/story";

const StoryWriteStyle = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:70px;
        .layout {
        margin-top: 100px;
        width:35%;
        display:flex;
        flex-direction: column;
            .write_title {
            text-align:center;
            font-size: 20px;
            padding:10px;
            display: flex;
            justify-content: center;
              p{
                width: 200px;
                height: 40px;
                border-bottom:solid orange 2px;
              }
            }
            .title {
            margin-top:50px;
            width: 100%;
            display:flex;
            align-items:center;
                p{
                font-weight: bold;
                margin-right:30px;
                }
                input {
                border:none;
                width:300px;
                padding:5px;
                border-bottom:solid 0.1px gray;
                transition: 0.3s ease-in-out;
                    :focus{
                        outline:none;
                        border-bottom:solid 0.1px orange;
                    }
                }
            }

            .info{
            margin-top:35px;
                p{
                  font-weight: bold;
                }
                textarea {
                padding:12px;
                width: 100%;
                height: 150px;
                border-radius: 4px;
                resize: none;
                transition: 0.3s ease-in-out;
                    :focus{
                        outline:none;
                        border:solid 0.1px orange;
                    }
                }
            }
            .content{
                margin-top:50px;
                display:flex;
                flex-direction:column;
                div{
                display:flex;
                justify-content:space-between;
                align-items:center;
                  p{
                  font-weight: bold;
                  }
                  >div{
                    width:80px;
                    display: flex;
                    align-items: center;
                        span{
                        font-size:80%;
                        }
                        .clip {
                        width:22px;
                        height:22px;
                        cursor:pointer;
                        } 
                    }
                }
                textarea { 
                    padding: 12px;
                    resize: none;
                    width: 100%;
                    height: 400px;
                    border-radius: 4px;
                    transition: 0.3s ease-in-out;
                        :focus{
                            outline:none;
                            border:solid 0.1px orange;
                    }
                }
                
            }
            .item {
                font-weight: bold;
                margin-top:35px;
                input {
                padding: 5px;
                    height: 20px;
                    outline:none;
                    border: none;
                    border-bottom: solid 0.1px lightgray;
                    transition: 0.3s ease-in-out;
                        :focus{
                            border-bottom:solid 0.1px orange;
                    }
                }
            }
            .hashtag {
                font-weight: bold;
                margin-top:20px;
                input {
                padding: 5px;
                    height: 20px;
                    outline:none;
                    border: none;
                    border-bottom: solid 0.1px lightgray;
                    transition: 0.3s ease-in-out;
                        :focus{
                            border-bottom:solid 0.1px orange;
                    }
                }
            }

            .submit {
            width:100%;
            display:flex;
            justify-content:flex-end;
            align-items:center;
            button {
                margin-top:15px;
                border:none;
                background:white;
                font-size:15px;
                outline:none;
                cursor: pointer;
                font-weight: bold;
                transition: 0.2s ease-in-out;
                :hover{
                  color:orange;
                }
              >img {
              margin-left: 10px;
                width:20px;
                height:20px;    
              }
            }
                
            }
 
        }
`;


const StoryWrite = () => {
    const [data, setData] = useState({
        title:'예시',
        info:'',
        content:'',
        file:'',
        item:'',
        hashtag:''
    })
    const formData = new FormData();
    const dispatch = useDispatch();

    const storyAddHandler = () => {
        formData.append('title','될걸?');
        console.log(formData)
        dispatch(storyAdd(formData));
        setData({
            title:'',
            info:'',
            content:'',
            file:'',
            item:'',
            hashtag:''
        })
    }

    return (
        <StoryWriteStyle>
            <div className="layout">
                <div className="write_title">
                    <p>글쓰기</p>
                </div>
                <div className='title'>
                    <p>제목</p>
                    <input type="text" placeholder="제목을 입력하세요." name="story_title"/>
                </div>


                <div className="info">
                    <p>작성자 소개</p>
                    <textarea required placeholder="본인을 마음껏 표현해주세요." ></textarea>
                </div>


                <div className="content">
                    <div>
                        <p>내용</p>
                        <div>
                            <span>파일 첨부</span>
                            <img className="clip" src="/icons/Clip.png"/>
                        </div>
                    </div>

                    <textarea required placeholder="내용을 입력하세요. "></textarea>
                </div>


                <div className="item">
                    <p>필요 물품</p>
                    <input placeholder="# 물품입력">
                    </input>
                </div>

                <div className="hashtag">
                    <p>태그</p>
                    <input placeholder="# 태그입력"></input>
                </div>


                <div className="submit">
                    <button onClick={storyAddHandler}>
                        제출하기
                        <img src="/icons/PaperPlane.png"/>
                    </button>

                </div>
            </div>
        </StoryWriteStyle>
    );
}

export default StoryWrite;