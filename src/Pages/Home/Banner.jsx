import React, { useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarMinus } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper "
      >
        <SwiperSlide>
          <div className="md:h-[120vh] relative 2xl:h-[100vh] h-[400px]">
            <div
              className="md:h-[120vh]  2xl:h-[100vh] h-[400px] object-center"
              style={{}}
            >
              <div className="bg-gradient-to-b from-[#00000000] min-h-full to-[#050505] w-full z-10 absolute"></div>
              <img
                className="object-cover w-full object-center md:h-[120vh] opacity-100 2xl:h-[100vh] h-[400px]"
                src="https://i.ibb.co/DkWkm2x/typify-demo-technology-5-1536x1536.jpg"
                alt=""
              />
            </div>
            <div className="max-w-7xl w-[94%] mx-auto">
              <div className="absolute  text-white top-1/2  -translate-y-1/2  z-20 ">
                <div className="text-2xl font-extrabold">
                  <h6 className="z-40 relative">Technology</h6>
                  <h6 className="text-transparent px-3 h-4 -mt-3 -skew-x-[35deg] bg-[#FF2400] w-fit">
                    Technology
                  </h6>
                </div>
                <h1 className=" font-extrabold my-4 text-xl md:text-4xl lg:text-6xl lg:leading-snug w-10/12">
                  Why Diversity Matters in the Modern Workplace
                </h1>
                <div className="font-fire flex items-center text-sm">
                  <FaRegHeart className="mr-2" />
                  <p className="mr-4">2 Likes</p>
                  <FaRegUser className="mr-2" />
                  <p className="mr-4">Phonix Ponder</p>
                  <FaRegCalendarMinus className="mr-2" />
                  <p className="mr-4">10 May 2034</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:h-[120vh] relative 2xl:h-[100vh] h-[400px]">
            <div
              className="md:h-[120vh]  2xl:h-[100vh] h-[400px] object-center"
              style={{}}
            >
              <div className="bg-gradient-to-b from-[#00000000] min-h-full to-[#050505] w-full z-10 absolute"></div>
              <img
                className="object-cover w-full object-center md:h-[120vh] opacity-100 2xl:h-[100vh] h-[400px]"
                src="https://i.ibb.co/tqxs23s/typify-demo-entertainment3-1536x878.jpg"
                alt=""
              />
            </div>
            <div className="max-w-7xl w-[94%] mx-auto">
              <div className="absolute  text-white top-1/2  -translate-y-1/2  z-20 ">
                <div className="text-2xl font-extrabold">
                  <h6 className="z-40 relative">Entertainment</h6>
                  <h6 className="text-transparent px-3 h-4 -mt-3 -skew-x-[35deg] bg-[#FF2400] w-fit">
                    Entertainment
                  </h6>
                </div>
                <h1 className=" font-extrabold my-4 text-xl md:text-4xl lg:text-6xl lg:leading-snug w-10/12">
                  The Intersection of Art and Technology in Entertainment
                </h1>
                <div className="font-fire flex items-center text-sm">
                  <FaRegHeart className="mr-2" />
                  <p className="mr-4">2 Likes</p>
                  <FaRegUser className="mr-2" />
                  <p className="mr-4">Willow Whon </p>
                  <FaRegCalendarMinus className="mr-2" />
                  <p className="mr-4">13 May 2024</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="md:h-[120vh] relative 2xl:h-[100vh] h-[400px]">
            <div
              className="md:h-[120vh]  2xl:h-[100vh] h-[400px] object-center"
              style={{}}
            >
              <div className="bg-gradient-to-b from-[#00000000] min-h-full to-[#050505] w-full z-10 absolute"></div>
              <img
                className="object-cover w-full object-center md:h-[120vh] opacity-100 2xl:h-[100vh] h-[400px]"
                src="https://i.ibb.co/LzT95Ps/typify-demo-entertainment4.jpg"
                alt=""
              />
            </div>
            <div className="max-w-7xl w-[94%] mx-auto">
              <div className="absolute  text-white top-1/2  -translate-y-1/2  z-20 ">
                <div className="text-2xl font-extrabold">
                  <h6 className="z-40 relative">Entertainment</h6>
                  <h6 className="text-transparent px-3 h-4 -mt-3 -skew-x-[35deg] bg-[#FF2400] w-fit">
                    Entertainment
                  </h6>
                </div>
                <h1 className=" font-extrabold my-4 text-xl md:text-4xl lg:text-6xl lg:leading-snug w-10/12">
                  Changing Landscape Of Music and Entertainment
                </h1>
                <div className="font-fire flex items-center text-sm">
                  <FaRegHeart className="mr-2" />
                  <p className="mr-4">2 Likes</p>
                  <FaRegUser className="mr-2" />
                  <p className="mr-4">Willow Whon </p>
                  <FaRegCalendarMinus className="mr-2" />
                  <p className="mr-4">30 May 2024</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
