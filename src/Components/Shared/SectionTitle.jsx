import React from "react";

const SectionTitle = ({ label }) => {
  return (
    <div className="flex mb-10 items-end">
      <h1 className="text-3xl text-white font-nunito font-bold ">{label}</h1>
      <h6 className="bg-[#FF2400] ml-2 mb-2 h-1 -skew-x-[30deg]">
        <span className="text-transparent">......</span>
      </h6>
    </div>
  );
};

export default SectionTitle;
