import React from "react";
import Loader from "../Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaCalendarAlt, FaEye, FaRegUser } from "react-icons/fa";
import BannerHead from "../../Components/Shared/BannerHead";

const ArticlesDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const {
    data: article = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["articlesDetails"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/article/${id}`);
      return data;
    },
  });

  console.log(article);
  if (isLoading) return <Loader></Loader>;
  return (
    <div>
      <Helmet>
        <title> novaNews || Articles Details</title>
      </Helmet>

      {/* top banner component */}
      <BannerHead image={article?.image}></BannerHead>

      <div className="text-white max-w-7xl w-[90%] mx-auto mt-20 ">
        <h2 className="text-5xl font-bold mb-6">{article?.title}</h2>
        <div className="flex items-center gap-3">
          <p className="text-white px-3 mt-3 w-fit rounded-full hover:border bg-[#FF2400]  transition-all duration-300 text-sm transform font-bold">
            {article?.publisher?.value}
          </p>
          <div className="text-white flex items-center gap-2 px-3 mt-3 w-fit rounded-full hover:border bg-[#494949]  transition-all duration-300 text-sm transform font-bold">
            <FaEye className="text-base" />
            {article?.viewCount}
          </div>
          <div className="text-white/80 justify-between gap-3 mt-3 flex items-center">
            <div className="flex text-sm  items-center ">
              <FaRegUser className=" text-sm " />
              <span className=" ml-2">{article?.author?.name}</span>
            </div>
            <div className="flex  text-base items-center ">
              <FaCalendarAlt className="text-sm" />
              <span className="text-sm ml-2">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-11">
          <img
            src={article?.author?.photo}
            className="rounded-full w-16 h-2w-16 object-cover"
            alt=""
          />
          <div>
            <h4 className="text-xl font-bold">{article?.author?.name}</h4>
            <h4 className="text-base text-gray-400">
              {article?.author?.email}
            </h4>
          </div>
        </div>

        {/* body  */}
        <div className="grid grid-cols-1 mt-10 gap-6 lg:grid-cols-3 ">
          <div className="col-span-2 border-t pt-10 border-gray-500">
            <div className=" w-full">
              <img
                src={article?.image}
                className="w-full h-[34rem] object-cover"
                alt=""
              />
            </div>
            <div className="my-6 flex flex-wrap gap-3">
              Tags:
              {article?.tags?.map((t) => (
                <p
                  key={t.value}
                  className="px-2 rounded-md cursor-pointer font-medium bg-[#555555] w-fit"
                >
                  {t.value}
                </p>
              ))}
            </div>
            <p>{article?.description}</p>
          </div>
          <div className="mt-3">
            <div class="bg-[#151515] mt-7 text-white rounded-lg p-9">
              <h4 class=" text-xl font-bold">Download</h4>
              <div class="flex items-center mt-6 justify-between">
                <div class="flex items-center gap-3">
                  <div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      dataSlot="icon"
                      class="text-3xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 17.25a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75Zm2.25-3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-5.25Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h6 class="font-medium text-base mt-2">Our Brochure</h6>
                    <p class="font-normal mt-1 text-[#A2A2A2] text-sm">
                      Download
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    href="#slide1"
                    class="bg-[#FF3811] p-4 rounded-md border-none mr-3"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      class="text-xl  text-white"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex items-center mt-4 justify-between">
                <div class="flex items-center gap-3">
                  <div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      dataSlot="icon"
                      class="text-3xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 17.25a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75Zm2.25-3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-5.25Z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h6 class="font-medium text-base mt-2">Company Details</h6>
                    <p class="font-normal mt-1 text-[#A2A2A2] text-sm">
                      Download
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    href="#slide1"
                    class="bg-[#FF3811] p-4 rounded-md border-none mr-3"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      class="text-xl  text-white"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-[#151515] mt-7 text-white rounded-lg p-9">
              <div class="flex flex-col items-center mt-6 justify-between">
                <img src="https://i.ibb.co/s9rz3kq/download.png" />
                <h4 class=" text-lg font-semibold  mt-4 mb-7 text-center">
                  Need Help? We Are Here To Help You
                </h4>
                <div class="bg-white py-3 rounded-lg px-9">
                  <p class="text-lg font-bold text-black">
                    <span class="text-[#FF3811]">Car Doctor </span>Special
                  </p>
                  <p class="text-md text-center mt-1 pb-7 text-[#FF3811] font-bold">
                    <span class="text-[#737373]">Save up to </span>60% off
                  </p>
                </div>
                <button class="bg-[#FF3811] -top-5 text-base text-white relative px-5 py-3 rounded-md border-none">
                  Get A Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetails;
