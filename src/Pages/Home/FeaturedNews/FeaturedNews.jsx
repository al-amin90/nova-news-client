import { FaCalendarAlt, FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarMinus } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import Loader from "../../Shared/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const FeaturedNews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/articles");
      return data;
    },
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="max-w-7xl w-[90%] mt-24 mx-auto">
      <SectionTitle label={"Featured News"}></SectionTitle>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper "
      >
        {articles?.slice(10, 15)?.map((a) => (
          <SwiperSlide key={a?._id}>
            <div className="flex lg:flex-row flex-col gap-12 items-center">
              <div className="flex-1">
                <img
                  className="object-cover w-full object-center rounded-2xl h-[250] md:h-[350px]"
                  src={a?.image}
                  alt=""
                />
              </div>
              <div className="flex-1">
                <span className="text-white rounded-full hover:border hover:border-[#E46752]  transition-all duration-300 text-base p-px px-3 2xl:text-sm transform font-bold bg-[#FF2400]">
                  {a?.publisher?.value}
                </span>

                <h2 className="mt-4 text-white text-2xl md:text-5xl md:leading-tight font-nunito pt-3 font-extrabold">
                  {a?.title.slice(0, 50)}...
                </h2>

                <div className="mt-4 text-white/80 text-base">
                  {a?.description.slice(0, 150)}...
                </div>

                <div className="text-white/80 gap-6 mt-3 flex items-center">
                  <div className="flex text-sm  items-center ">
                    <FaRegUser className=" text-sm " />
                    <span className=" ml-2">{a?.author?.name}</span>
                  </div>
                  <div className="flex  text-base items-center ">
                    <FaCalendarAlt className="text-sm" />
                    <span className="text-sm ml-2">
                      {new Date(a?.timeStamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedNews;
