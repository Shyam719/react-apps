import React from "react";
import MainView from "./MainView";
import Tags from "./Tags";

let homeCount = 0;

export const Home = () => {
  console.log("Home: " + homeCount++);
  //debugger;
  return (
    <div className="home-page">
      <div className="container-fluid page">
        <div className="row">
          <Tags />
          <MainView />
        </div>
      </div>
    </div>
  );
};

export default Home;
