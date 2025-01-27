import {   useNavigate,  useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Swal from "sweetalert2";

const ScholarDetails = () => {
  const { id } = useParams();

  const nevigate = useNavigate();

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

  // const { data: reviews } = useQuery({
  //   queryKey: ["scholarshipReviews", id],
  //   queryFn: async () => {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/scholarship/${id}/reviews`);
  //     return response.data;
  //   },
  //   enabled: !!id,
  // });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>Failed to fetch scholarship details. Please try again later.</p>;

  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    scholarshipCategory,
    subjectCategory,
    scholarshipPostDate,
    applicationFees,
    stipend,
    serviceCharge,
    // eslint-disable-next-line no-unused-vars
    description,
    rating,
  } = scholar;

  const handleCheckout = async (scholar) => {
    const cart = {
      id: scholar._id,
      applicationFee: scholar.applicationFees,
      universityName: scholar.universityName,
      scholarshipCategory: scholar.scholarshipCategory,
      subjectCategory: scholar.subjectCategory,
    };

    await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, cart);
    console.log("Cart item for checkout:", cart);
    
    Swal.fire({
      icon: "success",
      title: "Success",
      text: `Successfully Checkout ${scholar.scholarshipName}`,
    });
    nevigate(`/payment/${cart.id}`);
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        {/* University Logo and Name */}
        <div className="p-6 flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <img
            src={universityImage}
            alt={`${universityName} Logo`}
            className="w-20 h-20 rounded-full object-cover border border-white"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{universityName}</h2>
            <p className="text-sm opacity-90">
              {universityCity}, {universityCountry}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Scholarship Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Scholarship Name:</span>{" "}
              {scholarshipName}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Category:</span>{" "}
              {scholarshipCategory}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Subjects:</span> {subjectCategory}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Deadline:</span>{" "}
              {scholarshipPostDate}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Stipend:</span>{" "}
              {stipend ? `$${stipend}` : "Not provided"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Service Charge:</span> $
              {serviceCharge}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Application Fees:</span> $
              {applicationFees}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">World Rank:</span> #
              {universityWorldRank}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Rating:</span> {rating} / 5.0
            </p>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            
              <button
                onClick={() => handleCheckout(scholar)}
                className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded hover:from-green-600 hover:to-green-700"
              >
                Apply for Scholarship
              </button>
            
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {/* <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">User Reviews</h3>
        {reviews && reviews.length > 0 ? (
          <Slider {...settings} className="bg-gray-50 p-6 rounded-lg shadow">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white">
                <div className="flex items-center mb-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-bold text-gray-800">{review.reviewerName}</p>
                    <p className="text-sm text-gray-600">{review.reviewDate}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Rating:</span> {review.rating} / 5.0
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Comments:</span> {review.comments}
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-sm text-gray-600">No reviews available for this scholarship.</p>
        )}
      </div> */}
    </div>
  );
};

export default ScholarDetails;
