import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { CampaignDetailLoader, CampaignContents } from "components";

const CampaignDetailStyle = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CampaignDetail = ({ match, history }) => {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({});
  const init = useRef(true);

  const loader = async () => {
    const res = await axios.get(`/campaign/${match.params.id}`);
    setData(res.data.data);
    setStatus(true);
  };

  useEffect(() => {
    if (init.current) {
      loader();
      init.current = false;
    }
  }, []);

  if (!status) return <CampaignDetailLoader />;
  return (
    <CampaignDetailStyle>
      <CampaignContents data={data} history={history} />
      {/*<CampaignComments data={data} />*/}
    </CampaignDetailStyle>
  );
};

export default CampaignDetail;
