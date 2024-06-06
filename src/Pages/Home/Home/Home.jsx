import { Helmet } from "react-helmet-async";
import AllPublisher from "../AllPublisher/AllPublisher";
import Plans from "../Plans/Plans";
import Banner from "../Banner";
import Statistic from "../Statistic/Statistic";
import NewsLatter from "../NewsLatter/NewsLatter";

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
      <NewsLatter></NewsLatter>
    </div>
  );
};

export default Home;
