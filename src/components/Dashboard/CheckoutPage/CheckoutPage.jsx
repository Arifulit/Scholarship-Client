import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const CheckoutPage = () => {
  const { id } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { register, handleSubmit } = useForm();

  const handlePayment = async () => {
    try {
      const response = await axios.post(`/api/pay/${id}`);
      if (response.data.clientSecret) {
        setPaymentSuccess(true);
        toast.success("Payment Successful!");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const applicationData = {
        ...data,
        scholarshipId: id,
        userId: "USER_ID_FROM_DB", // Replace with actual user ID
        userName: "John Doe", // Replace with actual user name
        userEmail: "john.doe@example.com", // Replace with actual user email
        dateApplied: new Date().toISOString(),
      };

      const response = await axios.post(`/api/apply`, applicationData);
      if (response.status === 201) {
        Swal.fire("Application Submitted!", "You have applied successfully!", "success");
      } else {
        throw new Error("Application submission failed");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          {paymentSuccess ? "Scholarship Application Form" : "Checkout Page"}
        </h1>

        {/* Payment Section */}
        {!paymentSuccess ? (
          <div className="text-center">
            <p className="mb-4 text-gray-600">Please pay the application fee to continue.</p>
            <button
              onClick={handlePayment}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition duration-200"
            >
              Pay Application Fee
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                {...register("phone")}
                placeholder="Enter phone number"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
              <input
                {...register("photo")}
                type="file"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                {...register("address")}
                placeholder="Village, District, Country"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  {...register("gender")}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <select
                  {...register("degree")}
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                >
                  <option value="">Select</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SSC Result</label>
                <input
                  {...register("sscResult")}
                  placeholder="e.g. 4.80"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">HSC Result</label>
                <input
                  {...register("hscResult")}
                  placeholder="e.g. 5.00"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Study Gap</label>
              <select
                {...register("studyGap")}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">No Study Gap</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition duration-200"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
