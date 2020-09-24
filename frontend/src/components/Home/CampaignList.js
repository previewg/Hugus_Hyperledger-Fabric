import React from 'react';
import styled from 'styled-components'

const CampaignListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;  
  section{
    width: 60%;
    height: 100vh;
    border:solid;
  }
`;

const CampaignList = () => {
    return (
        <CampaignListStyle>
            <section>
                여기에 캠페인 로딩
            </section>
        </CampaignListStyle>
    );
}

export default CampaignList;