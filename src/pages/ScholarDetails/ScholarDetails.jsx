

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ScholarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetching scholarship data
  const {
    data: scholar,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholar", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/scholarship/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });

  // Loading and Error Handling
  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>Failed to fetch scholarship details. Please try again later.</p>;

  // Handle Checkout Process
  const handleCheckout = async (scholar) => {
    const cart = {
      id: scholar._id,
      applicationFee: scholar.applicationFees,
      universityName: scholar.universityName,
      scholarshipCategory: scholar.scholarshipCategory,
      subjectCategory: scholar.subjectCategory,
    };

    try {
      // Sending POST request to checkout endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/checkout`,
        cart,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content-type header
          },
        }
      );

      if (response.data.insertedId) {
        // Show success alert and navigate to payment page
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Successfully Checked Out ${scholar.scholarshipName}`,
        });
        navigate(`/payment/${cart.id}`);
      } else {
        // Show error if checkout failed
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save the checkout data. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during checkout. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {/* University Logo and Name */}
        <div className="p-6 flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <img
            src={scholar.universityImage}
            alt={`${scholar.universityName} Logo`}
            className="w-20 h-20 rounded-full object-cover border border-white"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{scholar.universityName}</h2>
            <p className="text-sm opacity-90">
              {scholar.universityCity}, {scholar.universityCountry}
            </p>
          </div>
        </div>

        {/* Scholarship Details */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Scholarship Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Scholarship Name:</span>{" "}
              {scholar.scholarshipName}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Category:</span>{" "}
              {scholar.scholarshipCategory}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Subjects:</span>{" "}
              {scholar.subjectCategory}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Deadline:</span>{" "}
              {scholar.scholarshipPostDate}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Application Fees:</span> $
              {scholar.applicationFees}
            </p>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            <button
              onClick={() => handleCheckout(scholar)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded hover:from-green-600 hover:to-green-700"
            >
              Apply for Scholarship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarDetails;
