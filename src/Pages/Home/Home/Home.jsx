import React from "react";
import { Helmet } from "react-helmet-async";
import AllPublisher from "../AllPublisher/AllPublisher";
import Plans from "../Plans/Plans";
import Banner from "../Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> novaNews || Home</title>
      </Helmet>

      <Banner></Banner>
      <AllPublisher></AllPublisher>
      <Plans></Plans>
    </div>
  );
};

export default Home;
