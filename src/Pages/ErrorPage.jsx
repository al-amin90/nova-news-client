import { useNavigate, useRouteError } from "react-router-dom";
import errorImg from "../assets/error.gif";
import { useEffect } from "react";

const ErrorPage = () => {
  const { error } = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NourishNet | Error Page";
  }, []);

  return (
    <div>
      <section className="flex items-center h-full ">
        <div className="mx-auto relative text-center">
          <figure className="w-full h-[100vh] mx-auto">
            <img
              src={errorImg}
              className="h-[100vh] w-[100vw] object-cover"
              alt=""
            />
          </figure>

          <div className=" absolute bottom-24 left-1/2 -translate-x-1/2">
            <button
              onClick={() => navigate("/")}
              className="px-8 border-2 border-[#1699A7] hover:border-white text-white  duration-300 hover:bg-black bg-[#1699A7] py-3 font-semibold rounded"
            >
              Back to homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
