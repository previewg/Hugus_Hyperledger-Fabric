import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import styled from 'styled-components'
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
                margin-right:10px;
                width: 80px;
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
                  left:95%;
                    width:80px;
                    display: flex;
                    align-items: center;
                        label{
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
            .items {
                font-weight: bold;
                margin-top:35px;
                >div{
                display: flex;
                align-items: center;
                width: 100%;
                height: 50px;
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
                    .added__item{
                      display: flex;
                        .item{
                          padding: 10px;
                          border-radius: 20px;
                          background-color: orange;
                          font-size:12px;
                          margin: 5px;
                          color: white;
                          font-weight: 200;
                          min-width: auto;
                        }
                        .clear{
                          position:relative;
                          border-radius: 7.5px;
                          font-size: 12px;
                          right: 15px;
                          top:-10px;
                          height: 15px;
                          width: 15px;
                          background-color: darkgray;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          cursor:pointer;
                        }
                  }
                }
            }
            .hashtags {
                font-weight: bold;
                margin-top:20px;
                >div{
                display: flex;
                align-items: center;
                width: 100%;
                height: 50px;
                    input {
                        margin-right:7px;
                        padding: 5px;
                        height: 20px;
                        outline:none;
                        border: none;
                        transition: 0.3s ease-in-out;
         
                    }
                    .added__hashtag{
                    display: flex;
                        .hashtag{
                        display: flex; 
                        padding-top:10px;
                        padding-bottom:-1px;
                        font-size:12px;
                        margin: 5px;
                        color: orange;
                        font-weight: 200;
                        min-width: auto;
                        border-bottom:solid 0.1px orange;
                        }
                        .clear{
                          position:relative;
                          border-radius: 7.5px;
                          font-size: 6px;
                          right: 6px;
                          top:-4px;
                          height: 15px;
                          width: 15px;
                          background-color: darkgray;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          cursor:pointer;
                        }
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

const ErrorBoxStyle = styled.div`
  position: fixed;
  right: 30px;
  top: 100px;
  width: 200px;
  height: 50px;
  

`;

const errorMsg = [
    '',
    '제목을 입력하세요',
    '소개를 입력하세요',
    '내용을 입력하세요',
    '필요 품목을 입력하세요',
    '해시태그를 입력하세요'
]

const StoryWrite = (props) => {
    const dispatch = useDispatch();
    const title = useRef();
    const info = useRef();
    const content = useRef();
    const items = useRef();
    const hashtags = useRef();

    const [data, setData] = useState({
        title:'',
        info:'',
        content:'',
        files:null,
        item:'',
        hashtag:'',
        items:[],
        hashtags:[],
    })

    const [filled,setFilled] = useState({
        title:true,
        info:true,
        content:true,
        items:true,
        hashtags:true
    })

    const [errorCode,setErrorCode] = useState(0);

    const errorHandler = () => {
        if(!data.title) {
            setErrorCode(1)
            setFilled({
                ...filled,
                title: false
            })
            title.current.focus();
            return false;
        } else if(!data.info){
            info.current.focus();
            setFilled({
                ...filled,
                info: false
            })
            setErrorCode(2)
            return false;
        } else if(!data.content){
            content.current.focus();
            setFilled({
                ...filled,
                content: false
            })
            setErrorCode(3)
            return false;
        } else if(data.items.length==0) {
            items.current.focus();
            setFilled({
                ...filled,
                items: false
            })
            setErrorCode(4)
            return false;
        } else if(data.hashtags.length==0) {
            hashtags.current.focus();
            setFilled({
                ...filled,
                hashtags: false
            })
            setErrorCode(5)
            return false;
        }
        return true
    }

    const storyAddHandler = () => {
        if(errorHandler()){
            const formData = new FormData();
            formData.append('title',data.title);
            formData.append('info',data.info);
            formData.append('content',data.content);
            formData.append('items',data.items);
            formData.append('hashtags',data.hashtags);

            if(data.files!==null){for (const file of data.files) {
                formData.append(`files`, file);
            }}else formData.append('files',null);

            dispatch(storyAdd(formData));
            setData({
                title:'',
                info:'',
                content:'',
                files:null,
                item:'',
                hashtag:'',
                items:[],
                hashtags:[],
            });
            props.history.push('/story');
        }
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        if(e.target.name==='files'){
            setData({
                ...data,
                [e.target.name]:e.target.files
            });
        } else{
            setData({
                ...data,
                [e.target.name]:e.target.value
            });
            setErrorCode(0)
            if(e.target.name!=='item'&&e.target.name!=='hashtag')
            setFilled({
                ...filled,
                [e.target.name]:true
            })
        }
    }

    const addItem = (e) => {
        let items=data.items.concat(e.target.value);
        setData({
            ...data,
            item:'',
            items,
        })
        setFilled({
            ...filled,
            items:true
        })
    }

    const addHashtag = (e) => {
        let hashtags=data.hashtags.concat(e.target.value);
        setData({
            ...data,
            hashtag:'',
            hashtags,
        })
        setFilled({
            ...filled,
            hashtags:true
        })
    };

    const onDeleteHandler = (key) => ()=>{
        let items = data.items;
        if(key===0){
            items=data.items.slice(1,data.items.length);
        }else if(key===data.items.length-1){
            items=data.items.slice(0,key);
        }else{
            items=data.items.slice(0,key).concat(data.items.slice(key+1,data.items.length))
        }
        setData({
            ...data,
            items,
        })
    }

    const onTagDeleteHandler = (key) => ()=>{
        let hashtags = data.hashtags;
        if(key===0){
            hashtags=data.hashtags.slice(1,data.hashtags.length);
        }else if(key===data.hashtags.length-1){
            hashtags=data.hashtags.slice(0,key);
        }else{
            hashtags=data.hashtags.slice(0,key).concat(data.hashtags.slice(key+1,data.hashtags.length))
        }
        setData({
            ...data,
            hashtags,
        })
    }

    useEffect(()=>{

    },[errorCode])

    return (
        <>
            <StoryWriteStyle>
                <div className="layout">
                    <div className="write_title">
                        <p>글쓰기</p>
                    </div>
                    <div className='title'>
                        <p>제목</p>
                        <input name='title' ref={title} value={data.title} type="text" placeholder="제목을 입력하세요." onChange={onChangeHandler}/>
                    </div>


                    <div className="info">
                        <p>작성자 소개</p>
                        <textarea name='info' ref={info} value={data.info} required placeholder="본인을 마음껏 표현해주세요." onChange={onChangeHandler}></textarea>
                    </div>


                    <div className="content">
                        <div>
                            <p>내용</p>
                            <div>
                                <label htmlFor='files'>파일 첨부</label>
                                <input id='files' name='files' type='file' multiple  accept="image/*" onChange={onChangeHandler}/>
                            </div>
                        </div>
                        <textarea name='content' ref={content} value={data.content} required placeholder="내용을 입력하세요. " onChange={onChangeHandler}></textarea>
                    </div>


                    <div className="items">
                        <p>필요 물품</p>
                        <div>
                            <input name='item'  ref={items} value={data.item} placeholder="# 물품입력" onChange={onChangeHandler} onKeyDown={(e)=>{if(e.keyCode===13) addItem(e)}}/>
                            {data.items.map((item,key)=> {
                                return(
                                    <div className='added__item' >
                                        <p className='item' key={key}>
                                            {item}
                                        </p>
                                        <p className='clear' onClick={onDeleteHandler(key)} key={key+100}>
                                            x
                                        </p>
                                    </div>)
                            })}
                        </div>
                    </div>

                    <div className="hashtags">
                        <p>태그</p>
                        <div>
                            <input name='hashtag' ref={hashtags} value={data.hashtag} placeholder="# 태그입력" onChange={onChangeHandler} onKeyDown={(e)=>{if(e.keyCode===13) addHashtag(e)}}/>
                            {data.hashtags.map((hashtag,key)=> {
                                return(
                                    <div className='added__hashtag' >
                                        <p className='hashtag' key={key}>
                                            #{hashtag}
                                        </p>
                                        <p className='clear' onClick={onTagDeleteHandler(key)} key={key+100}>
                                            x
                                        </p>
                                    </div>)
                            })}
                        </div>
                    </div>


                    <div className="submit">
                        <button onClick={storyAddHandler}>
                            제출하기
                            <img src="/icons/PaperPlane.png"/>
                        </button>

                    </div>
                </div>
            </StoryWriteStyle>
            <ErrorBoxStyle>
                {errorMsg[errorCode]}
            </ErrorBoxStyle>
        </>

    );
}

export default StoryWrite;