import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/Shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../Hooks/useAuth";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY);
console.log(stripePromise);

const Payment = () => {
  const { subPrice } = useAuth();

  return (
    <div className="pb-28">
      <Helmet>
        <title> novaNews || Payment</title>
      </Helmet>

      <div className="max-w-7xl pt-32 w-[90%] lg:w-[60%] mx-auto">
        <div className="p-2">
          <SectionTitle label={"Billing Details"}></SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 lg:grid-cols-4">
            <div className="md:col-span-2">
              <label
                className="text-black font-medium dark:text-gray-200"
                htmlFor="username"
              >
                First name ---
              </label>
              <input
                id="username"
                name="firstName"
                placeholder="First name"
                type="text"
                className="block w-full px-4 py-2 mt-1 text-black bg-white border border-[#023022] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#FF5537] focus:ring-[#FF5537] focus:ring-opacity-40 dark:focus:border-[#FF5537] focus:outline-none focus:ring"
              />
            </div>
            <div className="md:col-span-2">
              <label
                className="text-black font-medium dark:text-gray-200"
                htmlFor="username"
              >
                Last name ---
              </label>
              <input
                id="username"
                name="lastName"
                placeholder="Last name"
                type="text"
                className="block w-full px-4 py-2 mt-1 text-black bg-white border border-[#023022] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#FF5537] focus:ring-[#FF5537] focus:ring-opacity-40 dark:focus:border-[#FF5537] focus:outline-none focus:ring"
              />
            </div>

            <div className="md:col-span-4">
              <label
                className="text-black font-medium dark:text-gray-200"
                htmlFor="username"
              >
                Street Address ---
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="block w-full px-4 py-2 mt-1 text-black bg-white border border-[#023022] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#FF5537] focus:ring-[#FF5537] focus:ring-opacity-40 dark:focus:border-[#FF5537] focus:outline-none focus:ring"
              />
            </div>

            <div className="md:col-span-2">
              <label
                className="text-black font-medium dark:text-gray-200"
                htmlFor="username"
              >
                Phone ---
              </label>
              <input
                id="username"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="block w-full px-4 py-2 mt-1 text-black bg-white border border-[#023022] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#FF5537] focus:ring-[#FF5537] focus:ring-opacity-40 dark:focus:border-[#FF5537] focus:outline-none focus:ring"
              />
            </div>

            <div className="md:col-span-2">
              <label
                className="text-black font-medium dark:text-gray-200"
                htmlFor="username"
              >
                Email ---
              </label>
              <input
                id="username"
                name="email"
                type="text"
                className="block w-full px-4 py-2 mt-1 text-black bg-white border border-[#023022] rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#FF5537] focus:ring-[#FF5537] focus:ring-opacity-40 dark:focus:border-[#FF5537] focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="mt-14">
            <SectionTitle label={"Payment "}></SectionTitle>
            <p className="text-lg text-white relative -top-7 font-bold mt-2">
              Payment Amount:{" "}
              <span className=" text-[#FF5537]">${subPrice}</span>
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
