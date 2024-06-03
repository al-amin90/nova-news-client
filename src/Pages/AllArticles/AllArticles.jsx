import React from "react";
import BannerHead from "../../Components/Shared/BannerHead";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../Shared/Loader";
import ArticleCard from "../../Components/AllArticles/ArticleCard";

const AllArticles = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/articles");
      return data;
    },
  });

  console.log(articles);
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="pb-28">
      <Helmet>
        <title> novaNews || All Articles</title>
      </Helmet>

      {/* top banner component */}
      <BannerHead
        label={"All Articles"}
        image={"https://i.ibb.co/SwMHqyL/allarticles.jpg"}
      ></BannerHead>

      {/* cards */}
      <div className="flex max-w-7xl w-[90%] mt-20 mx-auto gap-7">
        <div className="grid w-3/4 grid-cols-1 md:grid-cols-3 gap-6">
          {articles?.map((arti) => (
            <ArticleCard key={arti?._id} article={arti}></ArticleCard>
          ))}
        </div>
        <div className="w-1/4">the 2nd part here</div>
      </div>
    </div>
  );
};

export default AllArticles;
