import { Helmet } from "react-helmet-async";
import AllPublisher from "../AllPublisher/AllPublisher";
import Plans from "../Plans/Plans";
import Banner from "../Banner";
import Statistic from "../Statistic/Statistic";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> novaNews || Home</title>
      </Helmet>

      <Banner></Banner>
      <AllPublisher></AllPublisher>
      <Plans></Plans>
      <Statistic></Statistic>
    </div>
  );
};

export default Home;
