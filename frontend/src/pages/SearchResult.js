import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchResultHead, SearchResultList } from "components";
import axios from "axios";

const SearchResultStyle = styled.section``;

const SearchResult = () => {
  const init = useRef(true);
  const [loading, setLoading] = useState(false);

  return (
    <SearchResultStyle>
      <SearchResultHead />
      <SearchResultList />
    </SearchResultStyle>
  );
};

export default SearchResult;
