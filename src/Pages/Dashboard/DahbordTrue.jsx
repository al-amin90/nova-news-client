import { Chart } from "react-google-charts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import AnimationChart from "../../Components/Dashboard/AnimationChart";
import RegionChart from "../../Components/Dashboard/RegionChart";
const data = [
  ["Task", "Hours per Day"],
  ["Work", 10],
  ["Eat", 1],
  ["Commute", 1],
  ["Watch TV", 1],
  ["Sleep", 7],
];

const options = {
  is3D: true,
};

const DahbordTrue = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allPublisherCount = [], isLoading } = useQuery({
    queryKey: ["allPublisherCount"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allPublisherCount");
      const publisherCount = data?.map((p) => [p.publisher, p.articleCount]);
      return [["Publisher", "Publisher Articles"], ...publisherCount];
    },
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="relative">
      <h3 className="capitalize  mt-5 ml-4 font-semibold text-xl">
        the percentage of{" "}
        <span className="text-[#FF5537]">Publication Articles...</span>
      </h3>
      <Chart
        chartType="PieChart"
        data={allPublisherCount}
        options={options}
        width={"100%"}
        height={"400px"}
      />

      <div className="">
        <h3 className="capitalize  left-6  z-10 relative font-semibold text-xl">
          Duration Of <span className="text-[#FF5537]">Our News...</span>
        </h3>
        <AnimationChart></AnimationChart>
        <h3 className="capitalize  left-6  z-10 relative font-semibold text-xl">
          Popularity of <span className="text-[#FF5537]">Our News...</span>
        </h3>
        <RegionChart></RegionChart>
      </div>
    </div>
  );
};

export default DahbordTrue;
