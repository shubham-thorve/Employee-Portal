import React from "react";
import Footer from "../components/Footer/Footer";
import Benefits from "../components/HomePage/Benefits";
import Panel2 from "../components/HomePage/Panel2";
import Panel3 from "../components/HomePage/Panel3";
import Panel from "../components/HomePage/Panel";
import HomeCards from "../components/HomePage/HomeCards";
import GoToTop from "../components/HomePage/GoToTop";

const Home = () => {
  return (
    <div className="main">
      <Panel />
      <HomeCards/>
      <Panel2 />
      <Panel3 />
      <Benefits />
      <GoToTop/>
      <Footer />
    </div>
  );
};

export default Home;
