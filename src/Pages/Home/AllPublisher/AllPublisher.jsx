import React from "react";
import Loader from "../../Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/Shared/SectionTitle";

const AllPublisher = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: publisher = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["publisher"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/publisher");
      return data;
    },
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="max-w-7xl w-[90%] mt-24 mb-28 mx-auto">
      <SectionTitle label={"All Publisher"}></SectionTitle>
      <div className="flex flex-wrap  gap-6 items-center justify-center">
        {publisher?.map((p, idx) => (
          <div
            key={idx}
            className="rounded-lg cursor-pointer hover:animate-ping flex flex-col items-center justify-center border border-[#FF2400]/80 p-5 bg-[#FF2400]/5"
          >
            <figure className="h-16 p-2 w-36 overflow-hidden flex items-center justify-center rounded-lg bg-[#F3F3F3]">
              <img className="rounded-lg  " src={p?.image} alt="Shoes" />
            </figure>
            <div className="text-center mt-6">
              <h2 className="text-xl text-white/90 font-fire my-1 font-semibold">
                {p?.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublisher;
