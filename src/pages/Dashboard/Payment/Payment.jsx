

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useLoaderData } from "react-router-dom";
// import CheckoutForm from "./CheckoutForm";

// // Load Stripe with your public key
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const Payment = () => {
//   const data = useLoaderData();

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">Make a Payment</h2>
//         <p className="text-center mb-2">
//           Scholarship: <span className="font-medium">{data.scholarshipCategory}</span>
//         </p>
//         <p className="text-center mb-4">
//           Application Fees: <span className="font-medium">${data.applicationFee}</span>
//         </p>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm totalFee={data.applicationFee} />
//         </Elements>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const data = useLoaderData();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-6 rounded-t-xl">
          <h2 className="text-3xl font-bold">Make a Payment</h2>
        </div>

        {/* Scholarship & Fee Details */}
        <div className="p-6 text-gray-800">
          <p className="text-lg font-medium text-center mb-3">
            Scholarship: <span className="text-blue-600">{data.scholarshipCategory}</span>
          </p>
          <p className="text-lg font-medium text-center mb-6">
            Application Fees: <span className="text-green-600">${data.applicationFee}</span>
          </p>

          {/* Payment Form */}
          <div className="border-t border-gray-300 pt-6">
            <Elements stripe={stripePromise}>
              <CheckoutForm totalFee={data.applicationFee} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;


