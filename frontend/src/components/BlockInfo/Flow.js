import React, { useEffect, useState } from "react";

const Flow = ({ block_time }) => {
  const [sec, setSec] = useState(0);

  const time = (value) => {
    const now = new Date();
    const timeValue = new Date(value);

    const secondTime = Math.floor(now.getTime() - timeValue.getTime()) / 1000;

    const betweenTime = Math.floor(
      (now.getTime() - timeValue.getTime()) / 1000 / 60
    );

    if (secondTime < 60) return `${Math.floor(secondTime)}초전`;

    if (betweenTime < 60) {
      const gap = () => {
        if (secondTime - betweenTime * 60 < 10) {
          return "0" + Math.floor(secondTime - betweenTime * 60);
        } else return Math.floor(secondTime - betweenTime * 60);
      };
      return `${betweenTime}분` + `${gap()}초전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365).toString()}년전`;
  };
  useEffect(() => {
    const i = setInterval(() => setSec(sec + 1), 1000);

    return () => clearInterval(i);
  }, [sec]);
  return <p className="timestamp">{time(block_time)}</p>;
};
export default Flow;
