import Select from "react-select";
import { Helmet } from "react-helmet-async";
import BannerHead from "../../Components/Shared/BannerHead";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const { subPrice, setSubPrice } = useAuth();
  const [selectedOption, setSelectedOption] = useState([]);
  const navigate = useNavigate();

  const options = [
    { value: "1 minutes", label: "1 minutes" },
    { value: "5 days", label: "5 days" },
    { value: "10 days", label: "10 days" },
  ];

  const handleChange = (e) => {
    setSelectedOption(e);
    if (parseInt(e?.value?.split(" ")[0]) === 5) {
      setSubPrice(15);
    } else if (parseInt(e?.value?.split(" ")[0]) === 1) {
      setSubPrice(1);
    } else if (parseInt(e?.value?.split(" ")[0]) === 10) {
      setSubPrice(24.99);
    }
  };

  return (
    <div className="pb-28">
      <Helmet>
        <title> novaNews || Subscription</title>
      </Helmet>

      {/* top banner component */}
      <BannerHead
        label={"Subscription"}
        image={"https://i.ibb.co/tzLwh36/planet-1348079-1280.jpg"}
      ></BannerHead>

      <div className="max-w-7xl mt-10 w-[90%] lg:w-[60%] mx-auto">
        <div className="bg-white  rounded-xl mt-6 py-5">
          <div className="flex justify-between border-b pb-4 px-6">
            <div>
              <p className="text-xs uppercase font-medium text-[#A2AAAB]">
                Amount COST
              </p>
              <p className="text-2xl mt-1  font-bold text-[#FF5537]">
                ${subPrice}
                <span className="text-black/90 ml-1 text-sm font-medium ">
                  /Per Person
                </span>
              </p>
            </div>
          </div>
          <div className="px-6 pb-5 mt-4">
            <div>
              <label
                className="block mt-4 font-semibold mb-2 "
                htmlFor="AVGCost"
              >
                Select Period ---
              </label>
              <Select
                classNamePrefix={"bg-black"}
                defaultValue={selectedOption}
                onChange={(e) => handleChange(e)}
                placeholder="Time Period"
                options={options}
              />
            </div>

            <button
              onClick={() => navigate("/payment")}
              className="py-2 mt-4 px-5 text-base border-2 border-[#FF5537] hover:text-[#FF5537] text-white duration-300 hover:bg-white bg-[#FF5537] rounded-full flex items-center gap-2 hover:shadow-xl font-medium"
            >
              Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
