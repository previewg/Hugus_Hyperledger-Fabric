import React from "react";
import styled from "styled-components";
import axios from "axios";

const CampaignDetailStyle = styled.section`
  padding-top: 100px;
  width: 100%;
`;

const CampaignDetail = ({ match }) => {
  const pay = async () => {
    const data = await axios.post("/pay/", {
      campaign_id: match.params.id,
      total_amount: 370000,
    });
    window.open(
      `${data.data.data.next_redirect_pc_url}`,
      "HUGUS_pay",
      "width=430,height=500"
    );
  };

  return (
    <CampaignDetailStyle>
      <article>여기여기</article>
      <button onClick={pay}>후원하기</button>
    </CampaignDetailStyle>
  );
};

export default CampaignDetail;
