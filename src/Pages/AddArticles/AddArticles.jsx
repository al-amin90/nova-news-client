import Select from "react-select";
import inputId from "react-select";
import { useState } from "react";
import classNames from "classnames";
import { SiSpinrilla } from "react-icons/si";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../api/utlils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import BannerHead from "../../Components/Shared/BannerHead";

const AddArticles = () => {
  const update = false;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle image
  const handleImage = async (image) => {
    // 1.  imageUpload
    const image_url = await imageUpload(image);
    if (image_url) {
      console.log(image_url);
      setImagePreview(image_url);
    } else {
      setImagePreview("");
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (article) => {
      const { data } = await axiosSecure.post("/article", article);
      return data;
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Successful! Wait for the Admin response..");
      navigate("/");
    },
  });

  // add Articles
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const articleInfo = {
        title: data.title,
        image: imagePreview,
        publisher: selectedOption.value,
        tags: selectedOptions,
        description: data.description,
        isPremium: false,
        timeStamp: new Date(),
        viewCount: 0,
        status: "pending",
        author: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
      };

      console.table(articleInfo);
      await mutateAsync(articleInfo);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const options = [
    { value: "Namibian", label: "Namibian" },
    { value: "Ei Pais", label: "Ei Pais" },
    { value: "The Irish Times", label: "The Irish Times" },
    { value: "Independent", label: "Independent" },
    { value: "Toronto Star", label: "Toronto Star" },
  ];

  const options2 = [
    { value: "#culture", label: "Culture" },
    { value: "#entertainment", label: "Entertainment" },
    { value: "#fashion", label: "Fashion" },
    { value: "#lifestyle", label: "Lifestyle" },
    { value: "#technology", label: "Technology" },
    { value: "#travel", label: "Travel" },
  ];

  return (
    <div className="pb-28">
      <Helmet>
        <title> novaNews || Add Articles</title>
      </Helmet>

      {/* top banner component */}
      <BannerHead
        label={"Add Articles"}
        image={"https://i.ibb.co/80dQ7Zz/typify-demo-software-4.jpg"}
      ></BannerHead>

      {/* form add articles */}
      <form
        className="max-w-7xl w-[90%] lg:w-[70%] mx-auto mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="flex-1">
            <label
              className="block text-white font-semibold mb-2 "
              htmlFor="AVGCost"
            >
              Add Image ---
            </label>
            <div
              style={{ backgroundImage: `url(${imagePreview})` }}
              className="file_upload bg-cover bg-center px-5 py-14 md:py-24 relative  border-dotted border bg-[#101011] text-white   border-[#5B5A5A] p-3 w-full rounded-md"
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
                  <div className="font-bold cursor-pointer  uppercase text-xs ml-6 mr-5 py-1 md:py-2 rounded-lg px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white">
                    Add Image
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1 ">
            <div>
              <label
                className="block text-white mb-2 font-semibold  "
                htmlFor="Title"
              >
                Enter Title ---
              </label>
              <input
                className="border bg-[#101011] text-white border-dotted border-[#5B5A5A] p-3 w-full rounded-md"
                type="text"
                //   defaultValue={spot?.Title || ""}
                placeholder=" Title is here"
                id="Title"
                {...register("title")}
                name="title"
              />
            </div>
            <div>
              <label
                className="block mt-4 text-white font-semibold mb-2 "
                htmlFor="AVGCost"
              >
                Select Publisher ---
              </label>
              <Select
                inputId={inputId}
                classNamePrefix={"bg-black"}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder="Publisher"
                options={options}
              />
            </div>
            <div>
              <label
                className="block mt-5 text-white font-semibold mb-2 "
                htmlFor="AVGCost"
              >
                Select Tags ---
              </label>
              <Select
                options={options2}
                value={selectedOptions}
                onChange={(selectedOption) =>
                  setSelectedOptions(selectedOption)
                }
                isMulti={true}
              />
            </div>
          </div>
        </div>
        <label
          className="block mb-2 text-white font-semibold mt-2 "
          htmlFor="description"
        >
          Enter Description ---
        </label>

        <textarea
          //   defaultValue={spot?.description || ""}
          placeholder="Enter Description"
          className="border bg-[#101011] text-white border-dotted border-[#5B5A5A] p-3 w-full rounded-md"
          id="description"
          cols="10"
          {...register("description")}
          name="description"
          rows="3"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="py-4 w-full px-5 text-lg bg-[#FF2400]/70 mt-8 text-white hover:bg-[#FF2400] rounded-full m-auto hover:shadow-xl font-semibold"
        >
          {loading ? (
            <SiSpinrilla className="m-auto animate-spin" />
          ) : update ? (
            "Update Article"
          ) : (
            "Add Article"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddArticles;
