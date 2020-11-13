import React, { useRef } from "react";
import styled from "styled-components";
import CampaignCommentInput from "./CampaignCommentInput";
import CampaignCommentList from "./CampaignCommentList";

const CampaignCommentStyle = styled.div`
  width: 700px;
`;
const CampaignComments = ({ campaignId, campaignCommentList, setCampaignCommentList, setLikenum, commentLikenum, setCommentLikenum }) => {
  return (
    <CampaignCommentStyle>
      <CampaignCommentInput setLikenum={setLikenum} campaignId={campaignId} campaignCommentList={campaignCommentList} setCampaignCommentList={setCampaignCommentList}/>
      <CampaignCommentList 
      campaignId={campaignId} 
      campaignCommentList={campaignCommentList} 
      setCampaignCommentList={setCampaignCommentList}
      commentLikenum={commentLikenum}
      setCommentLikenum={setCommentLikenum}
      />
    </CampaignCommentStyle>
  );
};

export default CampaignComments;
