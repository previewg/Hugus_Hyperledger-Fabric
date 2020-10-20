import React, { useEffect, useState ,useRef } from "react";
import axios from "axios";
import { ActList,Search,Pagination } from "components";
import styled from "styled-components";

const ActStyle = styled.section`
    width:100%;
    padding-top:70px;
    display:flex;
    justify-content:center;
    .layout {
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-top: 100px;
    width:75%;
        .title {
        width:100%;
            >p {
            font-size:30px;
            border-bottom:solid orange 3px;
            padding-bottom:3px;
            }
        }
        /* .pagination {
        width:310px;
        display:flex;
        justify-content:space-around;
            >p {
                cursor: pointer;
                display:flex;
                justify-content:center;
                width:25px;
                padding-top:4px;
                border:none;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
            }
            .page-item {
                >p {
                cursor: pointer;
                display:flex;
                justify-content:center;
                width:25px;
                padding-top:4px;
                border:none;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
            }
            }
        } */
    }
`;

const ActMain = () => {
    const [total,setTotal] = useState(0);
    const init = useRef(true);  
    // const [actList, setActList] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const indexOfLastAct = currentPage * actsPerPage;
    // const indexOfFirstPost = indexOfLastAct - actsPerPage;
    // const currentActs = acts.slice(indexOfFirstPost, indexOfLastAct);
        

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    // useEffect(() => {
    //     const initFunc = async () => {
    //         const data =  await axios.get("/act/list");
    //         setTotal(data.data.count);
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

  return (
    <ActStyle>
        <div className="layout">
            <div className="title">
                <p>전달 스토리</p>
            </div>
            <Search/>
            <ActList/>
            <Pagination total={total} />
        </div>
    </ActStyle>
  );
};

export default ActMain;
