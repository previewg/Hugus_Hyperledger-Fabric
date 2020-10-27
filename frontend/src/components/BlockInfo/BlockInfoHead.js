import React from "react";
import styled from "styled-components";

const BlockInfoHeadStyle = styled.article`
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 80%;
    display: flex;
    align-items: flex-end;
    p {
      margin: 0;
    }
    p:nth-child(1) {
      font-size: 40px;
      font-weight: bold;
      color: orange;
      margin-right: 30px;
    }
    p:nth-child(2) {
      color: #1eb71e;
      padding-bottom: 5px;
    }
  }

  .summary {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 80%;
    justify-content: space-between;
    > div {
      display: flex;
      flex-direction: column;
      width: 350px;
      height: 150px;
      background-color: orange;
      justify-content: space-between;
      align-items: flex-start;
      p {
        padding: 15px;
        color: white;
        font-size: 20px;
        font-weight: normal;
      }
      p:nth-child(2) {
        align-self: flex-end;
        font-size: 30px;
      }
    }
  }
`;

const BlockInfoHead = () => {
  return (
    <BlockInfoHeadStyle>
      <div>
        <p>HUGUS CHAIN</p>
        <p>RUNNING</p>
      </div>
      <div className="summary">
        <div>
          <p>LATEST BLOCK</p>
          <p>1,220,200</p>
        </div>
        <div>
          <p>TOTAL TX</p>
          <p>1,220,200</p>
        </div>
        <div>
          <p>TOTAL HUG</p>
          <p>358,220,200</p>
        </div>
      </div>
    </BlockInfoHeadStyle>
  );
};

export default BlockInfoHead;
