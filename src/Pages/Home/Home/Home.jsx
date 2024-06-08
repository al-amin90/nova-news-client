import { Helmet } from "react-helmet-async";
import AllPublisher from "../AllPublisher/AllPublisher";
import Plans from "../Plans/Plans";
import Banner from "../Banner";
import Statistic from "../Statistic/Statistic";
import NewsLatter from "../NewsLatter/NewsLatter";
import { useEffect, useState } from "react";
import TakePremiumModal from "../../../Components/Modal/TakePremiumModal";
import FeaturedNews from "../FeaturedNews/FeaturedNews";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isOpen) {
        setIsOpen(true);
      }
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isOpen]);

  return (
    <div>
      <Helmet>
        <title> novaNews || Home</title>
      </Helmet>

      <Banner></Banner>
      <AllPublisher></AllPublisher>
      <FeaturedNews></FeaturedNews>
      <Plans></Plans>
      <Statistic></Statistic>
      <NewsLatter></NewsLatter>
      <div className="absolute z-50">
        <TakePremiumModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        ></TakePremiumModal>
      </div>
    </div>
  );
};

export default Home;
