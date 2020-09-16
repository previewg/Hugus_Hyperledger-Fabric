import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import axios from "axios";

const StoryWriteStyle = styled.div`
            display:flex;
            flex-direction: column;
            align-items: center;
            .title{
            }

            .info{

            }
            .content{

            }
        `;

const StoryWrite = () => {
    const [data, setData] = useState('')

    useEffect(() => {

    })

    return (
        <StoryWriteStyle>
            <h4>글쓰기</h4>
            <div className='title'>
                <h5>제목</h5>
                <td><input type="text" placeholder="제목을 입력하세요. " name="story_title" class="form-control"/></td>
            </div>

            <div className="info">
                <h5>작성자 소개</h5>
                <td><textarea rows="7" cols="100"
                              placeholder="본인을 마음껏 표현해주세요." class="form-control"></textarea></td>
            </div>

            <div className="content">
                <h5>내용</h5>
                <tr>
                    <th>첨부파일:</th>
                    <td><input type="text" placeholder="파일을 선택하세요. " name="filename"/></td>
                </tr>

                <td><textarea rows="18" cols="100"
                              class="form-control" placeholder="내용을 입력하세요. "></textarea></td>
            </div>

            <div className="item">
                <h5>필요 물품</h5>
                <td><textarea rows="7" cols="100"
                              placeholder="# 물품입력" class="form-control"></textarea></td>
            </div>

            <div className="hashtag">
                <h5>태그</h5>
                <td><textarea rows="7" cols="100"
                              placeholder="#태그" class="form-control"></textarea></td>
            </div>
        </StoryWriteStyle>
    );
}

export default StoryWrite;