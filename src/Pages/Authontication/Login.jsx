import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import loginImg from "../../assets/authImgs/login.png";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import SocialMediaLogin from "../../Components/Authontication/SocialMediaLogin";
import useAuth from "../../Hooks/useAuth";
import { SiSpinrilla } from "react-icons/si";
import { saveUser } from "../../api/utlils";

const Login = () => {
  const { user, loading, logInUser, setLoading } = useAuth();
  const [isShowed, setIsShowed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //   sing in
    // console.log(data.email, data.password);
    try {
      logInUser(data.email, data.password)
        .then((result) => {
          setLoading(false);
          toast.success("Login Successfully", {
            style: {
              background: "#2B3440",
              color: "#fff",
            },
          });
          navigate(from, { replace: true });
          saveUser(result.user);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    } catch (err) {
      //   console.log(err);
      toast.error(err.message);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title> novaNews || Register</title>
      </Helmet>

      <div className="max-w-[1920px] pt-[64px] mx-auto md:w-[85%] pb-10">
        <div className=" rounded-3xl lg:shadow ">
          <div className="w-full justify-center items-center flex-col lg:flex-row flex">
            <div className="w-full lg:w-1/2 max-w-lg  p-5">
              <div className=" p-5 ">
                <div className="pb-8 ">
                  <p className="text-3xl font-bold  relative z-10  text-white">
                    Login Here!
                  </p>
                  <h6 className="text-transparent  px-3 h-4 -mt-3 -skew-x-[35deg] bg-[#FF2400] w-fit">
                    RegisterHere!sfjdklfjklkfj
                  </h6>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 w-full "
                >
                  <div>
                    <fieldset className="border bg-[#101011] border-solid border-[#5B5A5A] p-3 w-full rounded-md">
                      <input
                        type="email"
                        name="email"
                        {...register("email", { required: true })}
                        id="email"
                        placeholder="Email"
                        className="px-4 py-1 bg-[#101011] text-white w-full focus:outline-0"
                      />
                    </fieldset>
                    {errors.email && (
                      <span className="text-red-600">
                        Email field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <fieldset className="border relative bg-[#101011] text-white border-solid border-[#5B5A5A] p-3 w-full rounded-md">
                      <input
                        type={isShowed ? "password" : "text"}
                        name="password"
                        id="password"
                        {...register("password", {
                          required: true,
                        })}
                        placeholder="password"
                        className="px-4 py-1 bg-[#101011] text-white w-full focus:outline-0"
                      />
                      <div
                        onClick={() => setIsShowed(!isShowed)}
                        className="absolute right-4 text-xl top-4"
                      >
                        {isShowed ? (
                          <FaEyeSlash className="text-white"></FaEyeSlash>
                        ) : (
                          <FaEye className="text-white" />
                        )}
                      </div>
                    </fieldset>
                    {errors.password?.type === "required" && (
                      <span className="text-red-600">Password is required</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="py-4 w-full px-5 text-lg text-white bg-[#FF2400] rounded-full hover:shadow-xl font-semibold"
                  >
                    {loading ? (
                      <SiSpinrilla className="m-auto animate-spin" />
                    ) : (
                      "Log in"
                    )}
                  </button>
                </form>

                <div className="text-white">
                  <p className="text-center mt-7 ">
                    New here?{" "}
                    <span
                      onClick={() => navigate("/register")}
                      className="font-normal duration-300 transition-all hover:text-white text-[#ff5537] underline cursor-pointer"
                    >
                      Create a New Account
                    </span>
                  </p>
                  <p className="text-center mt-6 divider divider-neutral ">
                    Or sign in with
                  </p>
                </div>
                <SocialMediaLogin from={from} />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <img
                src={loginImg}
                className="object-cover m-auto w-8/12 object-center"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
