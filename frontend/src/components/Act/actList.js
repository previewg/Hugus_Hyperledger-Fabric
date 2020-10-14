import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CountUp from "react-countup";
import { actListLoader, actVisit } from "../../actions/act";
// import Loader from "./Loader";

const ActListStyle = styled.div`
    display:flex;
    justify-content:flex-start;
`;

const BarStyle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .count {
    width: 90%;
    background: transparent;
    margin: 0;
    font-size: 13px;
    color: white;
    display: flex;
    justify-content: flex-end;
  }
  div {
    width: 90%;
    display: flex;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    height: 5px;
    transition: all 2s ease-in-out;

    > div {
      height: 5px;
      background-color: white;
      border-radius: 10px;
      font-size: 13px;
      ${(props) => `width:${props.ratio}%`};
    }
  }
`;

const ActList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.story.list.status);
  const list = useSelector((state) => state.act.list.data);
  const num = useSelector((state) => state.story.list.num);
  const init = useRef(true);

  useEffect(() => {
    if (init.current) dispatch(actListLoader(1));
    init.current = false;
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  }, [num]);

  const loadMore = () => {
    console.log(num);
    dispatch(actListLoader(num));
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && status !== "WAITING") {
      loadMore();
    }
  };

  const visitHandler = (id) => {
    dispatch(actVisit(id));
  };

    // useEffect(() => {
    //   const init = setTimeout(() => {
    //     if (vote > goal) setRatio(100);
    //     setRatio((vote / goal) * 100);
    //   });
    //   return () => clearTimeout(init);
    // }, []);

    // return (
    //   <BarStyle ratio={ratio}>
    //     <div className="count">
    //       <CountUp end={ratio} duration={2} />
    //       <span> %</span>
    //     </div>

    //     <div>
    //       <div></div>
    //     </div>
    //   </BarStyle>
    // );


//   const UserInfo = ({ story }) => {
//     if (story.user_info.length > 100)
//       return <p>{story.user_info.substr(0, 100)}...</p>;
//     return <p>{story.user_info}</p>;
//   };

  return (
    <ActListStyle>
        {list.map((act, key) => {
            return (
              <Link
                to={`/act/${act.id}`}
                onClick={() => visitHandler(act.id)}
                key={key}
              >
                <div>
                  <p className="act__title">{act.act_title}</p>
                </div>
                {/* <div className="more__info">
                  <UserInfo act={act} />
                </div> */}
                <div>
                  <p className="act_visit">{act.visited}</p>
                </div>
                <div>
                  <p className="act_title">{act.created_at}</p>
                </div>
              </Link>
            );
        })}
        {/* {status === "WAITING" && <Loader />} */}
    </ActListStyle>
  );
};
export default ActList;
