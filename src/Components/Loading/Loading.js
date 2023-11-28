import React from "react";
import "./Loading.css";

const Loading = ({ nums, height }) => {
  return (
    <div className="loading-element">
      {Array.from({ length: nums }).map((el) => (
        <div className="loading" key={el} style={{ height: height }}>
          <div className=" loading-toggler">
            <div className="loading-effect"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
