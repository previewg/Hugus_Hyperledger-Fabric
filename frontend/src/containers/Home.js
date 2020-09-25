import React from 'react';
import styled from 'styled-components';
import {CampaignList, CampaignSlider, HugusInfo, MoreBtn} from "../components";

const HomeStyle = styled.div`
  padding-top: 150px;
`;


const Home = () => {
    return(
      <HomeStyle>
          <CampaignSlider/>
          <MoreBtn/>
          <HugusInfo/>
          <CampaignList/>
      </HomeStyle>
    )
}

export default Home;