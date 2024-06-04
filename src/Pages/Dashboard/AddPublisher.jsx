import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utlils";
import { FaUpLong } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddPublisher = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 1.  imageUpload
  const handleImage = async (image) => {
    const image_url = await imageUpload(image);
    if (image_url) {
      console.log(image_url);
      setImagePreview(image_url);
    } else {
      setImagePreview("");
    }
  };

  // publish the api
  const { mutateAsync } = useMutation({
    mutationFn: async (publisher) => {
      const { data } = await axiosSecure.post("/publisher", publisher);
      return data;
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Publisher added Successful!");
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const publisherInfo = {
        name: data.name,
        image: imagePreview,
      };

      console.table(publisherInfo);
      setLoading(false);

      const result = await mutateAsync(publisherInfo);
      if (result?.insertedId) {
        reset();
        setImagePreview("");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="hero min-h-screen ">
        <form
          className="max-w-7xl w-[90%] bg-gray-100/50 lg:p-14 rounded-xl lg:w-[60%] mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-w-md mx-auto">
            <div className="flex-1">
              <div
                style={{ backgroundImage: `url(${imagePreview})` }}
                className="file_upload bg-cover bg-center bg-white px-5 py-14 md:py-24 relative  border-dotted border  text-white   border-[#5B5A5A] p-3 w-full rounded-md"
              >
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      {...register("image")}
                      onChange={(e) => handleImage(e.target.files[0])}
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="font-bold cursor-pointer  uppercase text-xs ml-6 mr-5 py-1 md:py-2 rounded-lg px-3 animate-bounce md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white">
                      <FaUpLong className="text-lg" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* <button className="font-bold transform relative animate-bounce uppercase text-xs rounded-full py-5 px-5 bg-[#FF2400] transition-all shadow-md duration-1000 delay-1000 ease-in-out border border-[#FF664D] hover:bg-[#ff5537] text-white">
              <FaUpLong className="text-lg" />
            </button> */}
            <div className="mt-4">
              <label className="block mb-2 font-semibold  " htmlFor="Title">
                Enter Name ---
              </label>
              <input
                className="border  border-dotted border-[#5B5A5A] p-3 w-full rounded-md"
                type="text"
                placeholder=" Enter Publisher Name"
                id="name"
                {...register("name")}
                name="name"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-4 w-full px-5 text-lg bg-[#FF2400]/70 mt-8 text-white hover:bg-[#FF2400] rounded-full m-auto hover:shadow-xl font-semibold"
            >
              {loading ? (
                <SiSpinrilla className="m-auto animate-spin" />
              ) : (
                "Add Publisher"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
