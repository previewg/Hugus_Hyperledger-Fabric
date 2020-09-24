import React from 'react';
import styled from 'styled-components';
import {CampaignSlider, MoreBtn} from "../components";

const HomeStyle = styled.div`
  padding-top: 150px;
`;


const Home = () => {
    return(
      <HomeStyle>
          <CampaignSlider/>
          <MoreBtn/>
      </HomeStyle>
    )
}

export default Home;