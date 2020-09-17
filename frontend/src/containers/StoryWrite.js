import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from "axios";

const StoryWriteStyle = styled.div`
            display:flex;
            justify-content:center;
            margin-top:140px;
            margin-bottom:70px;
            .layout {
            width:60%;
            display:flex;
            flex-direction: column;
            align-items: flex-start;

            
            .write_title {
            position:relative;
            left:33%;
            text-align:center;
            width:260px;
            padding:10px;
            border-bottom:solid orange;

            }
        

            .title {
            margin-top:50px;
            display:flex;
            align-items:center;
                p{
                margin-right:50px;
                }
                input {
                border:none;
                width:300px;
                padding:5px;
                border-bottom:solid 0.1px gray;
                :focus{
                    outline:none;
                }
                }
            }

            .info{
            margin-top:35px;

                p{
                
                }
                textarea {
                padding-top:12px;
                padding-left:12px;
                    
                }
            }


            .content{
                margin-top:50px;
                display:flex;
                flex-direction:column;
                div:nth-child(1){
                width:100%;
                display:flex;
                justify-content:space-between;
                
                }
                div:nth-child(2){
                display:flex;
                width:22%;
                    p {
                    font-size:70%;
                    }
                    img {
                        display:flex;
                justify-content:space-between;
                    width:28px;
                    height:28px;
                }

                }
                
                textarea {
                padding-top:12px;
                padding-left:12px;
            }
        }


            .item {
                margin-top:35px;
                textarea {
                    border:solid 2px orange;
                    padding-top:12px;
                    padding-left:12px;
                    :focus{
                    outline:none;
                }
                }
            }
            .hashtag {
                margin-top:20px;

                textarea {
                padding-top:12px;
                padding-left:12px;
                border:none;

                }
            }

            .button {
                margin-top:15px;
                border:none;
                background:white;
                width:175%;
            }


            }

            
        `;

const StoryWrite = () => {
    const [data, setData] = useState('')

    useEffect(() => {

    })

    return (
        <StoryWriteStyle>
            <div className="layout">
                <div className="write_title">글쓰기</div>
                <div className='title'>
                <p>제목</p>
                <input type="text" placeholder="제목을 입력하세요." name="story_title" class="form-control" />
                </div>


                <div className="info">
                    <p>작성자 소개</p>
                    <textarea rows="7" cols="100"
                    placeholder="본인을 마음껏 표현해주세요." class="form-control">
                    </textarea>
                </div>


                <div className="content">
                    <div>
                        <p>내용</p>
                        <div>
                        <p>파일 첨부</p>
                        <div className="imgs">
                        <img className="clip" src="/icons/Clip.png"/>
                        <img className="picture" src="/icons/Picture.png"/>
                        <img className="video" src="/icons/Video.png"/>
                        </div>                      
                        </div>
                    </div>

                    <textarea rows="18" cols="100"
                    class="form-control" placeholder="내용을 입력하세요. ">
                    </textarea>
                </div>


                <div className="item">
                    <p>필요 물품</p>
                    <textarea rows="7" cols="100"
                    placeholder="# 물품입력" class="form-control"> 
                    </textarea>
                </div>

                <div className="hashtag">
                    <p>태그</p>
                    <textarea rows="7" cols="100"
                    placeholder="#태그입력" class="form-control">
                    </textarea>
                </div>

            <button className="button" onClick="">
            제출하기
            </button>

            </div>
        </StoryWriteStyle>
    );
}

export default StoryWrite;