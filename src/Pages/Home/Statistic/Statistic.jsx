import { FaUsers } from "react-icons/fa";
import { CgUserlane } from "react-icons/cg";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import { TbUserFilled } from "react-icons/tb";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loader from "../../Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

const Statistic = () => {
  const axiosPublic = useAxiosPublic();
  const [counterState, setCounterState] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["statistic"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/statistic");
      return data;
    },
  });

  console.log(users);
  if (isLoading) return <Loader></Loader>;
  return (
    <div className=" max-w-7xl w-[90%] mt-24 mx-auto">
      <SectionTitle label="Statistic"></SectionTitle>
      <section className="p-6 text-white">
        <ScrollTrigger
          onEnter={() => setCounterState(true)}
          onExit={() => setCounterState(false)}
        >
          <div className="container mx-auto grid justify-center grid-cols-1 gap-9 text-center md:grid-cols-3">
            <div className="flex flex-col justify-start m-2 lg:m-6">
              <p className="text-4xl font-bold leading-none lg:text-6xl">
                {counterState && (
                  <CountUp
                    start={-375.039}
                    end={users?.users}
                    duration={2.75}
                    separator=" "
                  ></CountUp>
                )}
              </p>
              <p className="text-sm flex items-center justify-center gap-2 sm:text-base">
                <FaUsers className="text-lg text-[#FF2400]" /> Users
              </p>
            </div>
            <div className="flex flex-col justify-start m-2 lg:m-6">
              <p className="text-4xl font-bold leading-none lg:text-6xl">
                {counterState && (
                  <CountUp
                    start={-575.039}
                    end={users?.premiumUsers}
                    duration={2.75}
                    separator=" "
                  ></CountUp>
                )}
              </p>
              <p className="text-sm flex items-center justify-center gap-2 sm:text-base">
                <CgUserlane className="text-lg text-[#FF2400]" /> Premium Users
              </p>
            </div>
            <div className="flex flex-col justify-start m-2 lg:m-6">
              <p className="text-4xl font-bold leading-none lg:text-6xl">
                {counterState && (
                  <CountUp
                    start={-375.039}
                    end={users?.normalUsers}
                    duration={2.75}
                    separator=" "
                  ></CountUp>
                )}
              </p>
              <p className="text-sm flex items-center justify-center gap-2 sm:text-base">
                <TbUserFilled className="text-lg text-[#FF2400]" /> Normal Users
              </p>
            </div>
          </div>
        </ScrollTrigger>
      </section>
    </div>
  );
};

export default Statistic;
