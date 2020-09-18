import React from 'react';
import styled from 'styled-components'


const TotalSearchStyle = styled.div`
    display:flex;
    justify-content:center;
    padding-top:50px;
    .layout {
        margin-top:130px;
        width:80%;
        display:flex;
        flex-direction:column;
        align-items:center;
            .content {
                height: 250px;
                width:30%;
                display:flex;
                justify-content:space-between;
                .logo {
                    width:300px;
                    height:200px;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                }
                .title_text {
                    p:nth-child(1) {
                        font-weight:bold;
                        font-size: 25px;
                    }
                    p:nth-child(2) {
                    }
                }

            }

            .search__bar {
                width:50%;
                display:flex;
                align-items:center;

                input {
                    margin-top:25px;
                    padding:12px;
                    width: 100%;
                    height: 35px;
                    border-radius: 4px;
                    resize: none;
                    transition: 0.3s ease-in-out;
                    border:solid orange 6px;
                    :focus {
                        outline:none;
                    }
                }
                img{
                    width:35px;
                    position:relative;
                    z-index:1;
                    right:60px;
                    top:11px;
                }
    }

        .suggestion {
            margin-top:30px;
            width:50%;
            input {
                    margin-top:25px;
                    padding:12px;
                    width: 100%;
                    height: 10px;
                    border-radius: 4px;
                    resize: none;
                    transition: 0.3s ease-in-out;
                    border:none;
                    :focus{
                        outline:none;
                    }
            }
        }
    }

`;

const TotalSearch = () => {

return (
    <TotalSearchStyle>
        <div className="layout">
            <div className="content">
                <div className="logo">로고</div>
                <div className="title_text">
                    <p>마음을 담는 기부<br/>허그에 담기다</p>
                    <p>따뜻하게 안아줄 수 있는<br/>투명하고 자율적인 기부 플랫폼</p>
                </div>
            </div>

            <div className="search__bar">
                <input className="search_form" type="text" placeholder="해시태그로 관련 캠페인, 스토리를 검색해보세요!"/>
                <img src="/icons/search.png"/>
            </div>

            <div className="suggestion">
                <input className="" type="text" placeholder="#여기에 #추천태그 #여기에 #추천태그 #여기에 #추천태그"/>
            </div>
        </div>
</TotalSearchStyle>
    );
}

export default TotalSearch;