import React from 'react';
import styled from 'styled-components'


const TotalSearchStyle = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    padding-top:50px;
    .layout {
        margin-top:130px;
        width:80%;
        display:flex;
        flex-direction:column;
        align-items:center;
            .a {
                width:40%;
                display:flex;
                justify-content:space-between;
                margin-bottom:40px;
                .logo {
                    width:300px;
                    height:200px;
                    display:flex;
                }
                
                .title_text {
                    p:nth-child(1) {
                        font-weight:bold;
                        
                    }
                    p:nth-child(2) {
                    }
                }

            }

            .b {
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
                    background-image : url('/icons/Search.png');
                    background-position:right; 
                    background-repeat:no-repeat;
                    background-size:5%;
                    :focus{
                        outline:none;
                    }
                }

    }

        .c {
            margin-top:50px;
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
            <div className="a">
                <div className="logo">로고</div>
                <div className="title_text">
                    <p>마음을 담는 기부<br/>허그에 담기다</p>
                    <p>따뜻하게 안아줄 수 있는<br/>투명하고 자율적인 기부 플랫폼</p>
                </div>
            </div>

            <div className="b">
                <input className="search_form" type="text" placeholder="해시태그로 관련 캠페인, 스토리를 검색해보세요!"/>
                {/* <img src="/icons/search.png"/> */}
            </div>

            <div className="c">
                <input className="" type="text" placeholder="#여기에 #추천태그 #여기에 #추천태그 #여기에 #추천태그"/>
            </div>
        </div>
</TotalSearchStyle>
    );
}

export default TotalSearch;