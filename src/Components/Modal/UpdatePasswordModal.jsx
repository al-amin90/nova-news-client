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
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdatePasswordModal = ({ setOpen, open }) => {
  const { resetPassword, setLoading, logOut } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    resetPassword(data.email)
      .then(() => {
        setOpen(false);
        logOut();
        toast.success("Pleas Check Your Email Box");
      })
      .catch((error) => console.log(error));
  };
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
                  Update User Password
                </DialogTitle>

                <div className="mt-4">
                  <label className="block mb-2 font-semibold  " htmlFor="Title">
                    Enter Email ---
                  </label>
                  <input
                    className="border  border-dotted border-[#5B5A5A] p-3 w-full rounded-md"
                    type="email"
                    placeholder=" Enter Your Email"
                    id="email"
                    {...register("email")}
                    name="email"
                  />
                </div>

                <div className="flex mt-8 justify-center gap-5">
                  <button
                    type="submit"
                    className="font-bold uppercase text-xs ml-6 mr-5 py-1 md:py-2 rounded-full px-3 md:px-6 bg-green-600 transition-all shadow-md duration-300 border-y border-green-500 hover:bg-green-500 text-white focus-visible:ring-offset-2"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="font-bold uppercase text-xs ml-6 mr-5 py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white focus-visible:ring-offset-2"
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

export default UpdatePasswordModal;
