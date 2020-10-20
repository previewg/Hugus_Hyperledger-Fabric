import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { actListLoader, actVisit } from "../../actions/act";
import Loader from "./Loader";


const ActListStyle = styled.div`
    margin-top:50px;
    width:100%;
    a{
      text-decoration:none;
    }
    .list_tit {
    border-bottom: solid orange 2px;
    color : black;
    font-weight:bold;
    padding-bottom:3px;
    }
    .list_grid {
        display: grid;
        grid-template-columns: 10% 60% 13% 17%;
    }
    .acenter {
        text-align: center;
    }
      .list_data {
        width: 100%;
        line-height: 40px;
        border-bottom: solid gray 0.1px;
        color: black;
        font-size:17px;
        transition: 0.1s ease-in-out;
        outline:none;
        cursor: pointer;
              :hover {
              color:orange;
            }
        .act__id {
        width:20%;
        display:flex;
        justify-content:center;
        }
        .act__title {
        }
        .act__visit {
        margin-left:13px;
        }
        .create__time {
        display:flex;
        justify-content:center;
        }
    }
    `;

const ActList = ({ actList }) => {
  const dispatch = useDispatch();
  const init = useRef(true);  
  // const [actList, setActList] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initFunc = async () => {
//         const data =  await axios.get("/act/list");
//         setActList(data.data.list);
//     }
//     if(init.current) {
//         initFunc(); 
//         init.current = false;
//     }
//     // const fetchActs = async () => {
//     //     setLoading(true);
//     //     const res = await axios.get(`/act/list/${page}`);
//     //     setActList(res.data.list);
//     //     setLoading(false);
//     // };
//     // fetchActs();
// }, []);

  const visitHandler = (id) => {
    dispatch(actVisit(id));
  };

  return (
    <ActListStyle>
       <div className='list_grid list_tit'>
                <div> 번호 </div>
                <div> 제목 </div>
                <div> 조회수 </div>
                <div className='acenter'> 작성일자 </div>
              </div>

              {actList.length !==0 && actList.map((act, key) => {
            return (
              <Link
              to={`/act/${act.id}`}
              onClick={() => visitHandler(act.id) }
              key={key}
              >  
              <div className='list_grid list_data' key={key}>
                <div className="act__id">{act.id}</div>
                <div className="act__title">{act.act_title}</div> 
                <div className="act__visit">{act.visited}</div>
                <div className='create__time'>{act.created_at}</div>
              </div>
              </Link>
            )
          }) }

        {/* {actList.length !== 0 && <Loader />} */}
    </ActListStyle>
  );
};
export default ActList;
