import { Fragment, useState } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { FaUpLong } from "react-icons/fa6";
import { imageUpload } from "../../api/utlils";

const UpdateUserModal = ({ setIsOpen, isOpen, modalHandler, user }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle image
  const handleImage = async (image) => {
    setLoading(true);
    const image_url = await imageUpload(image);
    if (image_url) {
      console.log(image_url);
      setImagePreview(image_url);
      setLoading(false);
    } else {
      setImagePreview("");
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const articleInfo = {
        name: data.name,
        image: imagePreview,
      };

      console.table(articleInfo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed inset-0 overflow-y-auto"
        >
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full h-2/6 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update User Profile
                </DialogTitle>
                <div className="flex-1">
                  <div
                    style={{ backgroundImage: `url(${imagePreview})` }}
                    className="file_upload bg-cover bg-center bg-white px-5 py-14 mt-6 relative  border-dotted border  text-white   border-[#5B5A5A] p-3 w-full rounded-full"
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

                <div className="flex mt-8 justify-center gap-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 disabled:cursor-progress hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default UpdateUserModal;
