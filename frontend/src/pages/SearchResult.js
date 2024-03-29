import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SearchResultStoryList,
  SearchResultCampaignList,
  SearchBar,
  SearchResultLoader,
} from "components";
import axios from "axios";

const SearchResultStyle = styled.section`
  width: 100%;
`;

const SearchResult = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [storyList, setStoryList] = useState([]);
  const [campaignList, setCampaignList] = useState([]);

  const load = async (hashtag) => {
    setLoading(true);
    const data = await axios.post("/hashtag/search", {
      search: match.params.hashtag,
    });
    setStoryList(data.data.storyList);
    setCampaignList(data.data.campaignList);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    load();
  }, [match]);

  return (
    <SearchResultStyle>
      <SearchBar history={history} />
      {loading ? (
        <SearchResultLoader />
      ) : (
        <>
          <SearchResultCampaignList campaignList={campaignList} />
          <SearchResultStoryList storyList={storyList} />
        </>
      )}
    </SearchResultStyle>
  );
};

export default SearchResult;
