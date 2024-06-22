import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import BannerHead from "../../Components/Shared/BannerHead";
import ArticleCard from "../../Components/AllArticles/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useUserPremium from "../../Hooks/useUserPremium";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [isUserPremium] = useUserPremium();
  const navigate = useNavigate();

  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/premium-articles");
      return data;
    },
  });

  if (!isUserPremium) return navigate("/");
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="pb-28">
      <Helmet>
        <title> novaNews || Premium Articles</title>
      </Helmet>

      {/* top banner component */}
      <BannerHead
        label={"Premium Articles"}
        image={"https://i.ibb.co/wpnstK5/typify-demo-entertainment5.jpg"}
      ></BannerHead>

      {/* cards */}
      <div className=" max-w-7xl w-[90%] mt-28 mx-auto gap-7">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles?.map((arti) => (
            <ArticleCard
              isUserPremium={isUserPremium}
              key={arti?._id}
              article={arti}
            ></ArticleCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumArticles;
