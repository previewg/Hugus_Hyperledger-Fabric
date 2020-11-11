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

        .visit_form {
          display: flex;
          margin-right: 2px;
          .eye {
          margin-right: 4px;
          width: 25px;
          height: 25px;
          }
          >p {
          margin-top: 4px;
          font-size: 15px;
          font-weight: bold;
          color: wheat;
          }
        }
      }
    }
    >a:nth-child(2){
      display: grid;
      flex-direction: column;
      text-decoration: none;
      color: black;
      margin-top: 30px;
      .act__title {
        font-size : 24px;
        font-weight: bold;
      }
      .beneficiary {
      color: grey;
      }
      .create__time {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 12px;
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

const ActList = ({ changed, setChanged, search }) => {
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
      if (init.current) {
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


  useEffect(() => {
    if (changed === true) {
      setChanged(false);
      setPage(1);
      init.current = true;
    }
  }, [changed]);

  // if(actList.length === 0) 
  // return <ThereIsNoFavorite>검색 결과가 없습니다</ThereIsNoFavorite>;

  return (
    <ActListStyle>
      <LoadHandler search={search} />
      {/* <div className="list_grid list_tit">
        <div className="acenter"> 작성일자 </div>
      </div> */}
  <section>
      {list.map((act, key) => {
        //  if (act.Act_Files[0]) {
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
              <div className="visit_form">
              <img className="eye" src= "/icons/eye.png"/>
              <p>{act.visited}</p>
              </div>  
              </div>
              
            </Link>
            <Link to={`/act/${act.id}`} onClick={() => visitHandler(act.id)}>
            <div className="act__title">{act.act_title}</div>
            <div className="beneficiary">김영호님의 전달 소식입니다.</div>
            <div className="create__time">{act.created_at}</div>
          </Link> 
        </div>
        );
      // } else {
      //     return (
      //       <Link
      //         to={`/act/${act.id}`}
      //         style={{
      //           backgroundImage: `url("http://localhost:3000/HUGUS.png") `,
      //         }}
      //         onClick={() => visitHandler(act.id)}
      //         key={key}
      //       >
      //       <div className="list" key={key}>
      //       <div className="visit_form">
      //       <img className="eye" src= "/icons/eye.png"/>
      //       <p>{act.visited}</p>
      //       </div>
      //       </div>

      //       <div className="contents">
      //         <div className="act__title">{act.act_title}</div>
      //         <div className="create__time">{act.created_at}</div>
      //       </div>
      //       </Link>
      //     )
      //   };
      })}
      </section>
    </ActListStyle>
  );
};
export default ActList;
