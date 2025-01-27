

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const data = useLoaderData();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Make a Payment</h2>
        <p className="text-center mb-2">
          Scholarship: <span className="font-medium">{data.scholarshipCategory}</span>
        </p>
        <p className="text-center mb-4">
          Application Fees: <span className="font-medium">${data.applicationFee}</span>
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm totalFee={data.applicationFee} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
