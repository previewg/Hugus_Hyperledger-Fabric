import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { CampaignDetailLoader, CampaignContents, CampaignComments } from "components";

const CampaignDetailStyle = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CampaignDetail = ({ match, history }) => {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({});
  const init = useRef(true);
  const [campaignId, setCampaignId] = useState([]);
  const [campaignCommentList, setCampaignCommentList] = useState([]);
  const [likenum, setLikenum] = useState(0);
  const [commentLikenum, setCommentLikenum] = useState(0);


  const id = match.params.id;
  const page = match.params.page;
    
  const initFunc = async () => {
    const res = await axios.get(`/campaign/${id}`);
    const comment = await axios.get(`/campaign_comment/list/${id}/${page}`);
    setData(res.data.data);
    setCampaignId(res.data);
    setCampaignCommentList(comment.data);
    setLikenum(res.data.data.campaign_like);
    setStatus(true);
    };


  useEffect(() => {
    if (init.current) {
      initFunc();
      init.current = false;
    }
  }, []);


  if (!status) return <CampaignDetailLoader />;
  return (
    <CampaignDetailStyle>
      <CampaignContents data={data} history={history} likenum={likenum} />
      <CampaignComments 
      data={data} 
      campaignId={campaignId}
      setLikenum={setLikenum}
      setCampaignId={setCampaignId}
      campaignCommentList={campaignCommentList}
      setCampaignCommentList={setCampaignCommentList}
      commentLikenum={commentLikenum}
      setCommentLikenum={setCommentLikenum}
      />
    </CampaignDetailStyle>
  );
};

export default CampaignDetail;
