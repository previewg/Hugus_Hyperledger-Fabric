import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ActContentsStyle = styled.div`

`;

const ActContents = ({ id }) => {
  
  const [actList, setActList] = useState({
    status: "WAITING",
    list: [],
  });

useEffect(() => {
const init = async () => {
const result = await axios.get(`/act/${id}`);
setActList({ status: "SUCCESS", list: result.data.list });
};
init();    
}, []);

  return (
    <ActContentsStyle>
     <p>asdfasdf</p>
    </ActContentsStyle>
  );
};

export default ActContents;
