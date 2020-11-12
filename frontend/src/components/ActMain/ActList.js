import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { actVisit } from "../../actions/act";
import axios from "axios";

const ActListStyle = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  section {
    min-height: 750px;
    margin-bottom: 50px;
    width: 900px;
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 30px;
    >div{
      display: grid;
      grid-template-columns:1fr 4fr;
      gap: 50px;
      > a:nth-child(1) {
      border-radius: 10px;
      width: 210px;
      height: 210px;
      display: flex;
      text-decoration: none;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      .list {
        min-width: 100%;
        width: 100%;
        height: 100%;
        align-items: center;
      }
    }
    >a:nth-child(2){
      flex-direction: column;
      text-decoration: none;
      color: black;
      margin-top: 30px;
      .act__title {
        font-size : 24px;
        font-weight: bold;
      }
      .beneficiary {
      margin-top: 5px;
      color: grey;
      }
      .visitForm{
        margin-top:60px;
        display: flex;
        justify-content: flex-end;
        padding-right: 12px;
        .eye {
          margin-right: 3px;
          width: 25px;
          height: 25px;
          }
          >p {
          padding-top: 3.5px;
          margin: 0px;
          font-size: 15px;
          font-weight: bold;
          color: black;
          }
      }
      .create__time {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding-right: 12px;
        font-size: 15px;
        color: grey;
      }
    }
    }
    
  }
`;

const ThereIsNoFavorite = styled.p`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: gray;
`;

const ActList = ({  search, clicked, setClicked, setLoader }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const init = useRef(true);

  const visitHandler = (id) => {
    dispatch(actVisit(id));
  };

  const LoadHandler = () => {
    const loadInit = async () => {
        setLoading(true);
        setClicked(false);
        const initData = await axios.get(`/act/list/1?keyword=${search}`);
        setList(initData.data.list);
        if (initData.data.more || initData.data.list.length % 10 === 0) {
          setPage(page + 1);
        }
        setLoading(false);
    };

    const loadMore = async () => {
      setLoading(true);
      const moreData = await axios.get(`/act/list/${page}`);
      if (list.length % 10 !== 0) {
        let len = (page - 1) * 10;
        let newData = list.slice(0, len).concat(moreData.data.list);
        setList(newData);
      } else {
        let newData = list.concat(moreData.data.list);
        setList(newData);
      }
      if (moreData.data.more) {
        setPage(page + 1);
      }
      setLoading(false);
    };

    const scrollHandler = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight && !loading) {
        loadMore();
      }
    };
    
    useEffect(() => {
      if (clicked||init.current) {
        loadInit();
        init.current = false;
      }
      // scroll event listener 등록
      window.addEventListener("scroll", scrollHandler);
      return () => {
        // scroll event listener 해제
        window.removeEventListener("scroll", scrollHandler);
      };
    }, []);
    return null;
  };


  const getTimeStamp = (date) => {
    let givenDate = new Date(date);
    let newDate =
      leadingZeros(givenDate.getFullYear(), 4) +
      "-" +
      leadingZeros(givenDate.getMonth() + 1, 2) +
      "-" +
      leadingZeros(givenDate.getDate(), 2);
    return newDate;
  };
  
  const leadingZeros = (n, digits) => {
    let zero = "";
    n = n.toString();
  
    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  };

  // if(list.length === 0) 
  // return <ThereIsNoFavorite>검색 결과가 없습니다</ThereIsNoFavorite>;

  return (
    <ActListStyle>
      <LoadHandler />
      <section>
        {list.map((act, key) => {
          return (
            <div key={key}>
              <Link
                to={`/act/${act.id}`}
                style={{
                  backgroundImage: `url("${act.Act_Files[0] ? act.Act_Files[0].file : "http://localhost:3000/HUGUS.png"}") `,
                }}
                onClick={() => visitHandler(act.id)}
              >
                <div className="list" >
           
                </div>
              </Link>

              <Link to={`/act/${act.id}`} onClick={() => visitHandler(act.id)}>
                <div className="act__title">{act.act_title}</div>
              <div className="beneficiary">{act.beneficiary}님의 전달 소식입니다.</div>
                <div className="visitForm">
                  <img className="eye" src="/icons/eye.png" />
                  <p>{act.visited}</p>
                </div>
                <div className="create__time">{getTimeStamp(act.created_at)}</div>
              </Link>
            </div>
          );
        })}
      </section>
    </ActListStyle>
  );
};
export default ActList;
