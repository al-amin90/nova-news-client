import React from "react";
import Banner from "../Banner";
import { Helmet } from "react-helmet-async";
import AllPublisher from "../AllPublisher/AllPublisher";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> novaNews || Home</title>
      </Helmet>

      <Banner></Banner>
      <AllPublisher></AllPublisher>
    </div>
  );
};

export default Home;
