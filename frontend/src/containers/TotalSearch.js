import React from 'react';
import styled from 'styled-components'


const TotalSearchStyle = styled.div`
    display:flex;
    justify-content:center;
    padding-top:50px;
    .layout {
        margin-top:180px;
        width:80%;
        display:flex;
        flex-direction:column;
        align-items:center;
            .content {
                height: 250px;
                width:50%;
                display:flex;
                justify-content:space-around;
                .logo {
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
                justify-content: center;

                input {
                    min-width: 300px;
                    font-size: 15px;
                    padding:12px;
                    width: 100%;
                    height: 35px;
                    border-radius: 4px;
                    transition: 0.3s ease-in-out;
                    border:solid orange 6px;
                    :focus {
                        outline:none;
                    }
                    margin-left: 30px;
                }
                img{
                    width:30px;
                    position:relative;
                    z-index:1;
                    right:45px;
                }
    }

        .suggestion {
            margin-top:15px;
            display: flex;
            p {
                color: gray;
                font-size: 13px;
                border:none;
                margin-right: 15px;
                cursor:pointer;
                transition: .3s ease-in-out; 
                :hover{
                  color: orange;
                  transform: scale(1.2);
                }
            }
        }
    }
    
    @media (max-width: 1000px){
    .layout{
      .content{
      width: 80%;
        .logo{
        display: none;
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
                <input className="search_form" type="text" placeholder="해시태그로 검색해보세요!"/>
                <img alt='search__icon' src="/icons/search.png"/>
            </div>

            <div className="suggestion">
                <p>#추천태그1</p>
                <p>#추천태그2</p>
            </div>
        </div>
</TotalSearchStyle>
    );
}

export default TotalSearch;