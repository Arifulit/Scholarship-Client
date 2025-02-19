/* eslint-disable no-unused-vars */




import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ScholarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetching scholarship data
  const { data: scholar, isLoading, isError } = useQuery({
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
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to fetch scholarship details. Please try again later.
        </p>
      </div>
    );

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/checkout`,
        cart,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Successfully Checked Out ${scholar.scholarshipName}`,
        });
        navigate(`/payment/${cart.id}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to save the checkout data. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during checkout. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  px-6">
      <div className=" shadow-lg rounded-lg overflow-hidden border border-gray-200 max-w-4xl w-full">
        {/* University Header */}
        <div className="relative">
          <div className="h-56 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={scholar.universityLogo}
              alt={`${scholar.universityName} Logo`}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
            <h2 className="mt-6 text-2xl font-bold ">
              {scholar.universityName}
            </h2>
            <p className="text-lg  opacity-90">
              {scholar.universityCity}, {scholar.universityCountry}
            </p>
          </div>
        </div>

        {/* Scholarship Details */}
        <div className="p-8 ">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Scholarship Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            <p>
              <span className="font-medium">Scholarship Name:</span>{" "}
              {scholar.scholarshipName}
            </p>
            <p>
              <span className="font-medium">Category:</span>{" "}
              {scholar.scholarshipCategory}
            </p>
            <p>
              <span className="font-medium">Subjects:</span>{" "}
              {scholar.subjectCategory}
            </p>
            <p>
              <span className="font-medium">Degree:</span>{" "}
              {scholar.degree}
            </p>
            <p>
              <span className="font-medium">Application Deadline:</span>{" "}
              {scholar.applicationDeadline}
            </p>
            <p>
              <span className="font-medium">Application Fees:</span> $
              {scholar.applicationFees}
            </p>
            <p>
              <span className="font-medium">Tuition Fees:</span> $
              {scholar.tuitionFees}
            </p>
            <p>
              <span className="font-medium">University Rank:</span>{" "}
              {scholar.universityRank}
            </p>
          </div>

          {/* Apply Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => handleCheckout(scholar)}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition-transform"
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
