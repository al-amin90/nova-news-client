import Select from "react-select";
import inputId from "react-select";
import BannerHead from "../../Components/Shared/BannerHead";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../Shared/Loader";
import ArticleCard from "../../Components/AllArticles/ArticleCard";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useUserPremium from "../../Hooks/useUserPremium";
import server from "../../assets/allArticle/cyber.jpg";
import news from "../../assets/allArticle/newss.png";

const AllArticles = () => {
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [selectPublisher, setSelectPublisher] = useState("");
  const [tags, setTags] = useState("");
  const [isUserPremium] = useUserPremium();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // get all the articles
  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["articles", title, selectPublisher, tags],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/articles?title=${title}&publisher=${selectPublisher}&tag=${tags}`
      );
      return data;
    },
  });

  // get the publisher
  const { data: publisher = [] } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/publisher");
      return data;
    },
  });

  const options = publisher.map((p, idx) => ({
    value: p?.name,
    label: p?.name,
  }));

  const options2 = [
    {
      value: "#culture",
      label: "Culture",
      image: "https://i.ibb.co/MsgB2BS/typify-demo-event-3-150x150.jpg",
    },
    {
      value: "#entertainment",
      label: "Entertainment",
      image: "https://i.ibb.co/j9NZkr3/typify-demo-entertainment4.jpg",
    },
    {
      value: "#fashion",
      label: "Fashion",
      image: "https://i.ibb.co/mGW3ksr/typify-demo-fashion-6-150x150.jpg",
    },
    {
      value: "#lifestyle",
      label: "Lifestyle",
      image: "https://i.ibb.co/8D6LLnG/typify-demo-culture-5-150x150.jpg",
    },
    {
      value: "#technology",
      label: "Technology",
      image: "https://i.ibb.co/NThSt20/typify-demo-technology-8-150x150.jpg",
    },
    {
      value: "#travel",
      label: "Travel",
      image: "https://i.ibb.co/m0cQZqX/typify-demo-travel-9-150x150.jpg",
    },
  ];

  const onSubmit = async (data) => {
    try {
      setTitle(data?.title);
    } catch (err) {
      console.log(err);
    }
  };

  // filter by publisher
  const handleChange = (e) => {
    setSelectPublisher(e.value);
  };

  // filter by tags
  const handleTags = (value) => {
    setTags(value);
  };

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
      <div className=" max-w-7xl w-[90%] mt-20 mx-auto ">
        <form className="flex mb-10 gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Select
              inputId={inputId}
              classNamePrefix={"bg-black"}
              onChange={(e) => handleChange(e)}
              placeholder="Publisher"
              className=""
              options={options}
            />
          </div>

          <div className="flex-grow">
            <input
              className="border text-white bg-[#101011] border-dotted border-[#5B5A5A] p-[7px] w-full rounded-md"
              type="text"
              placeholder=" Enter Title Name"
              id="title"
              {...register("title")}
              name="title"
            />
          </div>
          <button className="font-bold uppercase text-xs md:ml-4 md:mr-5 py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white">
            Search
          </button>
        </form>

        <div className=" flex items-start justify-center gap-5 flex-wrap">
          {options2?.map((t) => (
            <div
              key={t.value}
              onClick={() => handleTags(t.label)}
              className="pr-7 gap-4 flex items-center justify-center py-1 rounded-full cursor-pointer text-sm md:text-xl text-white font-medium bg-[#1D1D1D] w-fit"
            >
              <img
                src={t.image}
                className="w-12 h-12 object-cover rounded-full"
                alt=""
              />
              <p>{t.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row mt-10 gap-7">
          <div className="grid lg:w-3/4 grid-cols-1 md:grid-cols-3 gap-6">
            {articles?.map((arti) => (
              <ArticleCard
                isUserPremium={isUserPremium}
                key={arti?._id}
                article={arti}
              ></ArticleCard>
            ))}
          </div>
          <div className="w-1/4">
            <div>
              <img src={server} className="w-full rounded-md" alt="" />
            </div>
            <div>
              <img src={news} className="w-full mt-6 rounded-md" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
