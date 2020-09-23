import React from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";

const StoryDetailStyle = styled.div`
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
                  p{
                  font-weight: bold;
                  }
                  >div{
                  height:30px;
                  position:relative;
                  left: 640px;
                    width:80px;
                    display: flex;
                    align-items: center;
                        label{
                          display: inline-block;
                          color: grey;
                          font-size: small;
                          cursor: pointer;
                          transition: 0.2s ease-in-out;
                          :hover{
                            color: orange;
                          }
                        }
                    input[type="file"] {
                      position: absolute;
                      width: 1px;
                      height: 1px;
                      padding: 0;
                      margin: -1px;
                      overflow: hidden;
                      clip: rect(0, 0, 0, 0);
                      border: 0;
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

            .storylist {
            width:100%;
            display:flex;
            justify-content:flex-end;
            align-items:center;

            .StoryMain_btn {
                position: absolute;
                color:black;
                text-decoration: none;
                margin-top:15px;
                border:none;
                background:white;
                outline:none;
                cursor: pointer;
                font-weight: bold;
                transition: 0.2s ease-in-out;
                :hover{
                  color:orange;
                }
            }
            }
        }
`;

const StoryDetail = () => {

return (
    <StoryDetailStyle>
                  <div className="layout">
                <div className="write_title">
                    <p>글 내용</p>
                </div>
                <div className='title'>
                    <p>제목</p>
                    <input name='title'  type="text"/>
                </div>


                <div className="info">
                    <p>작성자 소개</p>
                    <textarea name='info' required ></textarea>
                </div>


                <div className="content">
                    <div>
                        <p>내용</p>
                    </div>

                    <textarea name='content'></textarea>
                </div>


                <div className="item">
                    <p>필요 물품</p>
                    <input name='item'>
                    </input>
                </div>

                <div className="hashtag">
                    <p>태그</p>
                    <input name='hashtag'></input>
                </div>


                <div className="storylist">
                    <Link className="StoryMain_btn" to='/story'>
                        글목록
                    </Link>
                </div>

            </div>
    </StoryDetailStyle> 
);
}
export default  StoryDetail;