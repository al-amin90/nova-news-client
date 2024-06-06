import banner from "../../../assets/home/subcription.png";
import background from "../../../assets/home/7.webp";
import { useState } from "react";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const [showSubscription, setShowSubscription] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl w-[90%] mt-24 mx-auto">
      <SectionTitle label={"Plans"}></SectionTitle>
      <section
        style={{ backgroundImage: `url(${background})` }}
        className="border  rounded-2xl border-gray-400/20 glass text-white"
      >
        <div className="backdrop-blur-lg h-full rounded-2xl">
          {showSubscription ? (
            <div>
              <h3 className="text-center font-medium md:mb-6 py-5 mx-2 text-2xl text-white">
                Sign up for free or go Premium
              </h3>
              <div className=" pb-4 md:pb-10 pt-5  flex flex-col  lg:flex-row">
                {/* left side */}
                <div className="bg-white scale-90 text-[#101011] md:mx-12 w-full md:w-96 rounded-3xl p-2">
                  <div>
                    <p className="w-fit bg-[#FF2400]/20 text-[#FF2400] px-5 py-2  rounded-2xl transition-colors duration-500 transform ">
                      Free
                    </p>
                  </div>
                  <div className="px-2 ">
                    <h6 className="font-bold mt-8">Experience Normal </h6>
                    <h4 className="text-5xl font-bold mt-3">
                      $0.00 <span className="text-2xl opacity-80">/month</span>
                    </h4>
                    <div className="mt-6 text-base  font-fire space-y-2">
                      <p className="flex items-center gap-3">
                        <FaCheck className="opacity-70" /> Limited Access to the
                        Articles
                      </p>
                      <p className="flex items-center gap-3">
                        <FaCheck className="opacity-70" /> Ads display
                      </p>
                      <p className="flex items-center gap-3">
                        <FaCheck className="opacity-70" /> Support only via
                        email
                      </p>
                      <p className="flex items-center gap-3">
                        <FaCheck className="opacity-70" /> Max article post 1
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full mt-6  bg-[#FF2400]/80 hover:bg-[#FF2400] px-5 py-2  rounded-2xl transition-colors duration-500 transform text-white "
                  >
                    Sing Up
                  </button>
                </div>
                {/* right side */}
                <div
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundBlendMode: "difference",
                  }}
                  className="bg-white scale-90 md:scale-100 text-black md:mx-12 rounded-3xl"
                >
                  <div className="backdrop-blur-xl h-full w-full md:w-96 rounded-3xl p-2">
                    <div>
                      <p className="w-fit bg-[#FF2400]/20 text-[#FF2400] px-5 py-2  rounded-2xl transition-colors duration-500 transform ">
                        Premium
                      </p>
                    </div>
                    <div className="px-2 ">
                      <h6 className="font-bold  mt-8">
                        Experience Full Potential{" "}
                      </h6>
                      <h4 className="text-5xl font-bold mt-3">
                        $24.99 <span className="text-2xl">/month</span>
                      </h4>
                      <div className="mt-6 text-base font-medium font-fire space-y-2">
                        <p className="flex items-center gap-3">
                          <FaCheck /> Unlimited Access to the Articles
                        </p>
                        <p className="flex items-center gap-3">
                          <FaCheck /> No Ads display
                        </p>
                        <p className="flex items-center gap-3">
                          <FaCheck /> Full Support
                        </p>
                        <p className="flex items-center gap-3">
                          <FaCheck /> Unlimited article post
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/register")}
                      className="w-full mt-6 bg-[#FF2400] px-5 py-2  rounded-2xl transition-colors duration-500 transform text-white "
                    >
                      Start Free trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container overflow-hidden justify-between flex flex-col mx-auto lg:flex-row">
              <div className="flex  flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
                <h6 className="text-lg font-semibold">UNLIMITED ACCESS</h6>
                <h2 className="text-4xl mt-5 font-bold leading-none">
                  Try Premium for 10 days
                </h2>
                <div className="mt-8 flex gap-2  items-center mb-7 text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6  text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Enjoy unlimited reading
                </div>
                <div className=" flex gap-2  items-center mb-7 text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6  text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Unlimited Article Post
                </div>
                <div className=" flex gap-2  items-center mb-8 text-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6  text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Cancel anytime
                </div>
                <button
                  onClick={() => setShowSubscription(true)}
                  className="w-fit bg-[#FF2400] px-6 py-2  rounded-full transition-colors duration-500 transform  hover:bg-[#ff5537]  hover:text-white"
                >
                  Try free for 10 Days
                </button>
              </div>
              <div className="w-full mg:w-[56%] flex relative -bottom-10 justify-end">
                <img src={banner} className="object-contain " alt="" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Plans;
