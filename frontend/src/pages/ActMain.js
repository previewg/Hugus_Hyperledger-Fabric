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
            >span {
            font-size:30px;
            border-bottom:solid orange 3px;
            padding-bottom:3px;
            }
        }
        .inputAndButton {
        margin-top:20px;
        width:100%;
        display:flex;
        justify-content:flex-end;
            .search_form {
            width:180px;
            height:23px;
            border-radius:3px;
            border:solid gray 1px;
            transition: 0.3s ease-in-out;
            border: solid orange 2px;
                :focus {
                outline: none;
                }
            }
            .search__bar {
            width:60px;
            height:29px;
            margin-left:20px;
            background-color:orange;
            border:none;
            color:white;
            border-radius:3px;
            transition: 0.2s ease-in-out;
            outline:none;
            cursor: pointer;
                :hover {
                color:black;
                }
            }
        }

        .pagination {
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
        }


    }
`;

const ActMain = () => {
    const init = useRef(true);  
    const [actList, setActList] = useState([]);
    const [total,setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    // const indexOfLastAct = currentPage * actsPerPage;
    // const indexOfFirstPost = indexOfLastAct - actsPerPage;
    // const currentActs = acts.slice(indexOfFirstPost, indexOfLastAct);
        
    useEffect(() => {
        if(init.current){
            const data =  axios.get("/act/list");
            setActList();
            setTotal();
            init.current = false;
        }

        // const fetchActs = async () => {
        //     setLoading(true);
        //     const res = await axios.get(`/act/list/${page}`);
        //     setActList(res.data.list);
        //     setLoading(false);
        // };
        // fetchActs();
    }, [actList]);

  return (
    <ActStyle>
        <div className="layout">
            <div className="title">
                <p>전달 스토리</p>
            </div>

            <Search/>
            <ActList actList={actList} loading={loading}/>
            <Pagination total={total} />
{/* 
            <div className="pagination">
            <p onClick={backPageHandler}>&lt;</p>
            <div className="page-item"><p className="page-link" href="#">1</p></div>
            <div className="page-item"><p className="page-link" href="#">2</p></div>
            <div className="page-item"><p className="page-link" href="#">3</p></div>
            <div className="page-item"><p className="page-link" href="#">4</p></div>
            <div className="page-item"><p className="page-link" href="#">5</p></div>
            <p onClick={nextPageHandler}>&gt;</p>
            </div> */}
        </div>
    </ActStyle>
  );
};

export default ActMain;
