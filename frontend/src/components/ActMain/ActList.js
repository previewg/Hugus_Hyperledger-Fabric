import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { actVisit } from "../../actions/act";
import axios from "axios";

const ActListStyle = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    margin-bottom: 50px;
    width: 900px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 30px;
    > a {
      width: 230px;
      height: 230px;
      display: flex;
      text-decoration: none;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      .list {
        padding-left: 7px;
        min-width: 100%;
        height: 100%;
        align-items: center;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.5) 10%,
          rgba(0, 0, 0, 0.4) 20%,
          rgba(0, 0, 0, 0.3) 30%,
          rgba(0, 0, 0, 0.2) 40%,
          rgba(0, 0, 0, 0.1) 50%,
          transparent
        );

        .act__visit {
        display: flex;
        .eye {
        margin-right: 4px;
        width: 25px;
        height: 25px;
        }
        >p {
        display: flex;
        font-size: 15px;
        font-weight: bold;
        color: black;

        }

        }
      }
      .contents {
        align-items: center;
        margin-left: 50px;
        width: 100%;
        .act__title {
          font-size : 20px;
          font-weight: bold;
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

const ActList = ({ changed, setChanged }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  console.log(list);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const init = useRef(true);

  const visitHandler = (id) => {
    dispatch(actVisit(id));
  };

  const LoadHandler = () => {

    const loadInit = async () => {
      setLoading(true);
      const initData = await axios.get(`/act/list/1`);
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
      <LoadHandler />
      {/* <div className="list_grid list_tit">
        <div className="acenter"> 작성일자 </div>
      </div> */}
  <section>
      {list.map((act, key) => {
         if (act.Act_Files[0]) {
        return (
          <Link
            to={`/act/${act.id}`}
            style={{
              backgroundImage: `url("${act.Act_Files[0].file}") `,
            }}
            onClick={() => visitHandler(act.id)}
            key={key}
          >
            <div className="list" key={key}>
              
            </div>
            <div className="contents">
              <div className="act__title">{act.act_title}</div>
              <div className="act__visit">{act.visited}</div>
              <div className="create__time">{act.created_at}</div>
            </div> 
          </Link>
        );
      } else {
          return (
            <Link
              to={`/act/${act.id}`}
              style={{
                backgroundImage: `url("http://localhost:3000/HUGUS.png") `,
              }}
              onClick={() => visitHandler(act.id)}
              key={key}
            >
            <div className="list" key={key}>
            <div className="act__visit">
            <img className="eye" src= "/icons/eye.png"/>
            <p>{act.visited}</p>
            </div>
            </div>

            <div className="contents">
              <div className="act__title">{act.act_title}</div>
              <div className="create__time">{act.created_at}</div>
            </div>
            </Link>
          )
        };
      })}
      </section>
    </ActListStyle>
  );
};
export default ActList;
