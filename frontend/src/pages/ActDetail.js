import { ActContents } from "components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { actLoader, actLoadInit } from "actions/act";
import axios from "axios";
import styled from "styled-components";

const ActDetailStyle = styled.div`
`;

const ActDetail = ({ id }) => {
    // const dispatch = useDispatch();
    // const data = useSelector((state) => state.act.detail.data); 
    // const status = useSelector((state) => state.act.detail.status);
    // const currentUser = useSelector( (state) => state.authentication.status.currentUser);
    // const [actList, setActList] = useState({
    //     status: "WAITING",
    //     list: [],
    //   });
    
    // useEffect(() => {
    // const init = async () => {
    // const result = await axios.get(`/act/${id}`);
    // setActList({ status: "SUCCESS", list: result.data.list });
    // };
    // init();    
    // }, []);

    return (
    <ActDetailStyle>
    <ActContents />
    </ActDetailStyle>
    );
};

export default ActDetail;
