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

const Home = () => {
  const [scroll, setScroll] = useState(0);

  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    setScroll(scrollTop);
  };

  // const pay = async () => {
  //   const data = await axios.post("/pay/", {
  //     email: "preview8@naver.com",
  //     campaign: "테스트입니다",
  //     total_amount: 100000,
  //   });
  //   window.location.href = data.data.data.next_redirect_pc_url;
  // };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  console.log(scroll);
  return (
    <HomeStyle>
      <Main scroll={scroll} />
      <CampaignSlider scroll={scroll} />
      <HugusInfo />
      <CampaignList />
    </HomeStyle>
  );
};

export default Home;
