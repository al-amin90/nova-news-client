import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import registerImg from "../../assets/authImgs/register2.png";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { SiSpinrilla } from "react-icons/si";
import useAuth from "../../Hooks/useAuth";
import { imageUpload, saveUser } from "../../api/utlils";

const Register = () => {
  const { createUser, loading, updateUserProfile, setUser, setLoading, user } =
    useAuth();
  const [isShowed, setIsShowed] = useState(true);
  const location = useLocation();
  const from = location?.state || "/";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(name, email, password, image?.data?.display_url);

    try {
      // 1.  imageUpload
      const image_url = await imageUpload(data.image[0]);
      console.log(image_url);

      // 2. create user
      createUser(data.email, data.password)
        .then((result) => {
          updateUserProfile(data.name, image_url).then(() => {
            setUser({
              ...user,
              email: data.email,
              displayName: data.name,
              photoURL: image_url,
            });
            saveUser({
              email: data.email,
              displayName: data.name,
              photoURL: image_url,
            });

            toast.success("Register Successfully", {
              style: {
                background: "#2B3440",
                color: "#fff",
              },
            });
            navigate(from, { replace: true });
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.message);
        });

      // 3.user name and photo url in firebase
    } catch (err) {
      setLoading(false);
      console.log(err.message);
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
            <div className="w-full p-9 lg:w-1/2">
              <img
                src={registerImg}
                className="object-cover object-center"
                alt=""
              />
            </div>

            <div className="w-full lg:w-1/2 max-w-lg  p-5">
              <div className=" p-5 ">
                <div className="pb-8 ">
                  <p className="text-3xl font-bold  relative z-10  text-white">
                    Register Here!
                  </p>
                  <h6 className="text-transparent  px-3 h-4 -mt-3 -skew-x-[35deg] bg-[#FF2400] w-fit">
                    RegisterHere!sfjdklfjkldjfkljkfj
                  </h6>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 w-full "
                >
                  <div>
                    <div className="border bg-[#101011] text-white border-solid border-[#5B5A5A] p-3 w-full rounded-md">
                      <input
                        type="text"
                        name="name"
                        {...register("name", { required: true })}
                        id="name"
                        placeholder="Name"
                        className="px-4  bg-[#101011]  text-white py-1 w-full focus:outline-0"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-600 ">
                        Name field is required
                      </span>
                    )}
                  </div>

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
                          minLength: 6,
                          pattern:
                            /(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])/,
                        })}
                        placeholder="password"
                        className="px-4 py-1 bg-[#101011] text-white w-full focus:outline-0"
                      />
                      <div
                        onClick={() => setIsShowed(!isShowed)}
                        className="absolute right-4 text-xl cursor-pointer top-4"
                      >
                        {isShowed ? (
                          <FaEyeSlash className="text-white cursor-pointer"></FaEyeSlash>
                        ) : (
                          <FaEye className="text-white cursor-pointer" />
                        )}
                      </div>
                    </fieldset>
                    {errors.password?.type === "required" && (
                      <span className="text-red-600">Password is required</span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-500 mt-2">
                        Password must be 6 characters
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-500 mt-2">
                        Password must have a capital,number and special
                        characters
                      </p>
                    )}
                  </div>

                  <div>
                    <legend className="text-white mb-2 ">
                      Select Your Image...
                    </legend>
                    <input
                      type="file"
                      id="image"
                      placeholder="Image"
                      {...register("image", { required: true })}
                      className="file-input bg-[#101011] text-white  file-input-bordered w-full"
                    />
                  </div>
                  {errors.image && (
                    <span className="text-red-600">User Image is required</span>
                  )}
                  <button
                    type="submit"
                    className="py-4 w-full px-5 text-lg text-white bg-[#FF2400] rounded-full m-auto hover:shadow-xl font-semibold"
                  >
                    {loading ? (
                      <SiSpinrilla className="m-auto animate-spin" />
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>

                <div className="text-white mt-7 text-center mb-6 font-medium text-lg">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className=" font-normal duration-300 transition-all hover:text-white text-[#ff5537] underline"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
