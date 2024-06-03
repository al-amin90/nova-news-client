import { FaArrowRight } from "react-icons/fa6";
import { FaRegUser, FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import artibg from "../../assets/allArticle/premium.jpg";

const ArticleCard = ({ article }) => {
  return (
    <div className="min-h-full">
      <div className="card min-h-full group rounded-2xl text-white card-compact font-open shadow-lg">
        <div className="relative">
          <figure
            className="md:h-60 w-full h-[250px] rounded-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${article?.image})` }}
          ></figure>
          <div className="text-center absolute bottom-4 left-4">
            <span className="text-white rounded-full hover:border hover:border-[#E46752]  transition-all duration-300 text-base p-px px-3 2xl:text-sm transform font-bold bg-[#FF2400]">
              {article?.publisher}
            </span>
          </div>
          <div className=" hidden  duration-300 group-hover:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-between pb-5">
            <div className="bg-black/30 animate-bounce overflow-hidden shadow-inner rounded-full px-2 py-2">
              <button
                onClick={() => navigate(`/food/${_id}`)}
                className="font-bold transform relative group-hover:translate-y-0 translate-y-full uppercase text-xs rounded-full py-4 px-4 bg-[#FF2400] transition-all shadow-md duration-1000 delay-1000 ease-in-out border border-[#FF664D] hover:bg-[#ff5537] text-white"
              >
                <FaArrowRightLong className="text-lg" />
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${article?.isPremium ? artibg : ""})`,
          }}
          className=" p-1 min-h-full bg-cover font-fire bg-center pt-1"
        >
          <div className="font-md flex items-center justify-between">
            <h2 className="text-xl font-nunito pt-3 font-extrabold">
              {article?.title.slice(0, 42)}
              {article?.title.length > 42 ? "..." : ""}
            </h2>
          </div>
          <div className="mt-4 text-white/80 text-base">
            {article?.description.slice(0, 88)}...
          </div>

          <div className="text-white/80 justify-between mt-3 flex items-center">
            <div className="flex text-sm  items-center ">
              <FaRegUser className=" text-sm " />
              <span className=" ml-2">{"locationPickup"}</span>
            </div>
            <div className="flex  text-base items-center ">
              <FaCalendarAlt className="text-sm" />
              <span className="text-sm ml-2">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
