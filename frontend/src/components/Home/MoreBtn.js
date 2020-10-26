import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MoreBtnStyle = styled.div`
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.5s ease-in-out;
  position: relative;
  top: ${(props) => (props.icon ? 215 : 200)}px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreBtn = () => {
  const [icon, setIcon] = useState(false);

  const scrollDown = () => {
    window.scrollTo({ top: 750, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const moving = setInterval(() => {
      icon ? setIcon(false) : setIcon(true);
    }, 500);
    return () => clearInterval(moving);
  }, [icon]);

  return (
    <MoreBtnStyle icon={icon}>
      <img src="/icons/Downicon.png" />
    </MoreBtnStyle>
  );
};

export default MoreBtn;
