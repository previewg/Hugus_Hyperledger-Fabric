import { ActContents } from "components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState ,useRef } from "react";
import { actLoader, actLoadInit } from "actions/act";
import axios from "axios";
import styled from "styled-components";

const ActDetailStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
`;

const ActDetail = ({ }) => {
    // const dispatch = useDispatch();
    // const currentUser = useSelector( (state) => state.authentication.status.currentUser);
    const init = useRef(true);  
    const [actList, setActList] = useState([]);
    const [loading, setLoading] = useState(true);
            
    useEffect(() => {
        const initFunc = async (id) => {
            const data =  await axios.get(`/act/${id}`)
            console.log(data.data);
            setActList(data.data);
        }
        if(init.current) {
            init.current = false;
            initFunc(); 
        }
    }, []);




    return (
    <ActDetailStyle>
    <ActContents actList={actList}/>
    </ActDetailStyle>
    );
};

export default ActDetail;
