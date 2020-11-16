import { ActContents } from "components";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const ActDetailStyle = styled.div`
  min-height: 900px;
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
`;

const ActDetail = ({ match }) => {
  const init = useRef(true);
  const [actId, setActId] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = match.params.id;
    const initFunc = async () => {
      const data = await axios.get(`/act/${id}`);
      setActId(data.data);
    };
    if (init.current) {
      init.current = false;
      initFunc();
    }
  }, []);

  return (
    <ActDetailStyle>
      {actId.length !== 0 && <ActContents actId={actId} />}
    </ActDetailStyle>
  );
};

export default ActDetail;
