import React from "react";
import styled from 'styled-components';
import Slider from 'react-slick';

const SliderStyle = styled.div`
  display: flex;
  justify-content: center;
  height: 30%;
  width: 80%;
  .slick-dots{
    position: relative;
    margin-top: 10px;
  }
  .slick-slider{
    width: 90%;
  }
  .slick-slide{
  display: flex;
  justify-content: center;
  transition: all 0.7s ease-in-out;
  }
  .slick-slide>div{
    padding: 15%;
  }
  .slick-center{
      transform: scale(1.2);
    }

  .campaign{
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    border-radius: 5px;
    cursor:pointer;
    :focus{
    outline: none;
    };
    .campaign__hashtag{
    font-size: 12px;
    text-align: end;
    color: orange;
    margin-right: 10px;
    }
    
    img{
    width: 100%; 
    height: auto;
    }
    .campaign__title{
    padding: 10px;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 17px;
    }
  }
  
  @media(max-width: 700px){
    .slick-slider{
        width: 700px;
        height: 550px;
      }
      
    .slick-slide>div{
    padding: 20px;
  }
  }
`;

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        style={{ ...style, display: "block",paddingLeft:'300px',transform:'scale(2)'}}
        onClick={onClick}
        src='/icons/Nexticon.png'
      />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <img
        className={className}
        style={{ ...style, display: "block",paddingRight:'300px',transform:'scale(2)'}}
        onClick={onClick}
        src='/icons/Backicon.png'
      />
    );
}

const CampaignSlider = () => {
    const settings = {
        infinite: true,
        autopspeed: 5000,
        slidesToShow:3,
        slidesToScroll: 1,
        centerMode:true,
        dots: true,
        autoplay:true,
        nextArrow:<NextArrow/>,
        prevArrow:<PrevArrow/>
    };
    return(
      <div style={{display:'flex',justifyContent:'center'}}>
        <SliderStyle>
            <Slider {...settings}>
                <div className='campaign'>
                    <p className='campaign__hashtag'>#해시태그</p>
                    <img alt='' src='/pics/1.jpg'/>
                    <p className='campaign__title'>게시물1의 제목</p>
                </div>
                <div className='campaign'>
                    <p className='campaign__hashtag'>#해시태그</p>
                    <img alt='' src='/pics/2.jpg'/>
                    <p className='campaign__title'>게시물2의 제목</p>
                </div>
                <div className='campaign'>
                    <p className='campaign__hashtag'>#해시태그</p>
                    <img alt='' src='/pics/3.jpg'/>
                    <p className='campaign__title'>게시물3의 제목</p>
                </div>
                <div className='campaign'>
                    <p className='campaign__hashtag'>#해시태그</p>
                    <img alt='' src='/pics/4.jpg'/>
                    <p className='campaign__title'>게시물4의 제목</p>
                </div>
            </Slider>
        </SliderStyle>
      </div>


    )
}

export default CampaignSlider;