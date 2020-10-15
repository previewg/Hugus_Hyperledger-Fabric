import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signInBtnIsClicked } from "actions/user";

const BlockInfoStyle = styled.div``;

const BlockInfo = (props) => {
  const dispatch = useDispatch();

  return <BlockInfoStyle></BlockInfoStyle>;
};

export default BlockInfo;
