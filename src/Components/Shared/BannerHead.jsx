import React from "react";

const BannerHead = ({ label, image }) => {
  return (
    <div className="md:h-[50vh] relative h-[300px]">
      <div className="md:h-[50vh]  h-[300px] object-center" style={{}}>
        <div className="bg-gradient-to-b from-[#00000000] min-h-full to-[#050505] w-full z-10 absolute"></div>
        <img
          className="object-cover w-full object-center md:h-[50vh] opacity-100 h-[300px]"
          src={image}
          alt={label}
        />
      </div>
      <div className="max-w-7xl w-[94%] mx-auto">
        <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2  z-20 ">
          <div className="text-2xl md:text-5xl font-bold">
            <h6 className="z-40 relative pl-2 shadow-xl">{label}</h6>
            <h6 className="text-transparent px-3 h-4 shadow-md duration-300 border-y border-[#FF664D] -mt-4 -skew-x-[35deg] bg-[#FF2400] w-fit">
              {label}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHead;
