import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CampaignList,
  CampaignSlider,
  HugusInfo,
  MoreBtn,
  Main,
} from "components";

const HomeStyle = styled.section``;

const Home = (props) => {
  const [scroll, setScroll] = useState(0);

  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    setScroll(scrollTop);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <HomeStyle>
      <Main scroll={scroll} />
      <CampaignSlider />
      <HugusInfo />
      <CampaignList />
    </HomeStyle>
  );
};

export default Home;
