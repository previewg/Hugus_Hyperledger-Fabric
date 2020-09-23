import React, {useState} from 'react';
import styled from 'styled-components';

const StoryNavStyle = styled.div`
  margin-top: 50px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  section{
      transition: all 0.4s ease-in-out;
      width: 40%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      article{
        font-size: 20px;
        cursor: pointer;
        padding: 10px;
        :hover{
        color: orange;
        }
      }
  }
   .underline__current{
      position:relative;
      left:${props=>{
    if(props.type==='hot') return '-15%';
    else if(props.type==='new') return '-5%'
    else if(props.type==='my') return '5%'
    else return '15%'
}};
      width: 8%;
      height: 3px;
      background-color: orange;
      transition: all .4s ease-in-out;
      }
      
  .underline{
      margin-top: 1px;
      width: 38%;
      height: 2px;
      background-color: lightgrey;
      transition: all .5s ease-in-out;
      }
  }
  
  .res__section{
    display: none;  
  }
  
  @media (max-width: 1150px) {
      section{
      transition: all 0.7s ease-in-out;
      width: 80%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      article{
        font-size: 20px;
        cursor: pointer;
        padding: 10px;
        :hover{
        color: orange;
        }
      }
  }
   .underline__current{
      position:relative;
          left:${props=>{
      if(props.type==='hot') return '-30%';
      else if(props.type==='new') return '-10%'
      else if(props.type==='my') return '10%'
      else return '30%'
    }};
          width: 15%;
          height: 3px;
          background-color: orange;
          transition: all .4s ease-in-out;
          }
          
      .underline{
          margin-top: 1px;
          width: 75%;
          height: 2px;
          background-color: lightgrey;
          transition: all .7s ease-in-out;
          }
      }
  
  @media (max-width: 700px) {
    section{
      display: none;
    }
    
    .res__section{
      display: block;
      width: 80%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      article{
        min-width: 0;
        font-size: 20px;
        cursor: pointer;
        padding: 10px;
        :hover{
        color: orange;
        }
      }
    }
  }
`;

const StoryNav = () => {
    const [storyType, setStoryType] = useState('hot');

    const typeChange = (e) => {
        e.preventDefault();
        setStoryType(e.target.getAttribute('name'));
    }

    return (
        <StoryNavStyle type={storyType}>
            <section>
                <article name='hot' onClick={(e)=>typeChange(e)}>인기 스토리</article>
                <article name='new' onClick={(e)=>typeChange(e)}>최신 스토리</article>
                <article name='my' onClick={(e)=>typeChange(e)}>관심 스토리</article>
                <article name='past' onClick={(e)=>typeChange(e)}>지난 스토리</article>
            </section>
            <section className='res__section'>
              <article name='hot' onClick={(e)=>typeChange(e)}>인기</article>
              <article name='new' onClick={(e)=>typeChange(e)}>최신</article>
              <article name='my' onClick={(e)=>typeChange(e)}>관심</article>
              <article name='past' onClick={(e)=>typeChange(e)}>지난</article>
            </section>
            <div className='underline__current'></div>
            <div className='underline'></div>
        </StoryNavStyle>
    );
}

export default StoryNav;