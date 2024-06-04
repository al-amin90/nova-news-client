import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Checkoutform.css";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const axiosSecure = useAxiosSecure();
  const { user, subPrice } = useAuth();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: subPrice })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
  }, [subPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    //   confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      toast.error(error.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      //   1. create payment info obj
      const paymentInfo = {
        transactionId: paymentIntent.id,
        date: new Date(),
        name: user?.displayName,
        email: user?.email,
        amount: subPrice,
      };
      toast.success(`Successfull Your transactionId: ${paymentIntent.id}`);
      console.log(paymentInfo);

      try {
        // console.log(paymentInfo);
        //   2. save payment info in booking collection (db)
        // const { data } = await axiosSecure.post("/donate", donateInfo);
        // if (data.insertedId) {
        //   navigate("/dashboard/donateHistory");
        // }
        //   3. change room status to booked in db
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        className="py-2 mt-4 px-5 text-base border-2 border-[#FF5537] hover:text-[#FF5537] text-white duration-300 hover:bg-white bg-[#FF5537] rounded-full flex items-center gap-2 hover:shadow-xl font-medium"
      >
        Donate Now
      </button>
    </form>
  );
};

export default CheckoutForm;
