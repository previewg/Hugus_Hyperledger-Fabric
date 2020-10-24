import React from "react";
import styled from "styled-components";
import {
  CampaignList,
  CampaignSlider,
  HugusInfo,
  MoreBtn,
  Main,
} from "components";

const HomeStyle = styled.section`
  padding-top: 150px;
`;

const Home = () => {
  return (
    <HomeStyle>
      <Main />
      <CampaignSlider />
      <MoreBtn />
      <HugusInfo />
      <CampaignList />
    </HomeStyle>
  );
};

export default Home;
