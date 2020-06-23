import React from "react";
import loading from "../assets/images/loading.gif";
export default () => {
  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        position: "absolute",
        top: "0px",
        background: "rgba(0,0,0,0.5)",
        margin: "auto",
      }}
    >
      <img
        alt="Loading.."
        src={loading}
        style={{ height: "100px", width: "100px", margin: "20% 0px 0px 0%" }}
      />
    </div>
  );
};
