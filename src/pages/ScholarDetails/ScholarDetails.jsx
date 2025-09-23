/* eslint-disable no-unused-vars */

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { 
  FiCalendar, 
  FiDollarSign, 
  FiMapPin, 
  FiBook, 
  FiAward, 
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiArrowLeft
} from "react-icons/fi";
import { HiAcademicCap, HiGlobeAlt } from "react-icons/hi";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Container from "../../components/Shared/Container";
import { getScholarshipTypeColors } from "../../utils/scholarshipColors";

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
  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-4xl text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Failed to Load Scholarship
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We couldn&apos;t fetch the scholarship details. Please try again later.
          </p>
          <button
            onClick={() => navigate('/all-scholarship')}
            className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Back to Scholarships
          </button>
        </div>
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

  const scholarshipColors = getScholarshipTypeColors(scholar.scholarshipCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>{scholar.scholarshipName} | Scholarship Details</title>
      </Helmet>

      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Container>
          <div className="py-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-200"
            >
              <FiArrowLeft className="text-lg" />
              Back to Scholarships
            </button>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          {/* University Header */}
          <div className="relative bg-gradient-to-br from-lime-500 via-emerald-500 to-teal-600 rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 p-8 lg:p-12 text-center text-white">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white p-2 shadow-2xl mb-6">
                  <img
                    src={scholar.universityLogo}
                    alt={`${scholar.universityName} Logo`}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                  {scholar.universityName}
                </h1>
                <div className="flex items-center gap-2 text-lime-100 mb-6">
                  <FiMapPin className="text-xl" />
                  <span className="text-xl">
                    {scholar.universityCity}, {scholar.universityCountry}
                  </span>
                </div>
                
                {/* University Stats */}
                <div className="flex flex-wrap justify-center gap-8 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <HiAcademicCap className="text-2xl" />
                      <span className="text-2xl font-bold">#{scholar.universityRank}</span>
                    </div>
                    <p className="text-lime-100 text-sm">Global Ranking</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <HiGlobeAlt className="text-2xl" />
                      <span className="text-2xl font-bold">{scholar.universityCountry}</span>
                    </div>
                    <p className="text-lime-100 text-sm">Location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Scholarship Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${scholarshipColors.bg} rounded-lg flex items-center justify-center`}>
                    <FiAward className={`text-2xl ${scholarshipColors.text}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {scholar.scholarshipName}
                    </h2>
                    <div className={`inline-flex items-center gap-2 ${scholarshipColors.bg} ${scholarshipColors.text} px-3 py-1 rounded-full text-sm font-medium mt-2`}>
                      <span className="w-2 h-2 bg-current rounded-full"></span>
                      {scholar.scholarshipCategory}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                  <p className="text-lg leading-relaxed">
                    This {scholar.scholarshipCategory.toLowerCase()} scholarship program offers excellent opportunities 
                    for students pursuing {scholar.subjectCategory} studies. Join a prestigious academic community 
                    and advance your career with world-class education.
                  </p>
                </div>
              </div>

              {/* Scholarship Details Grid */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Scholarship Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <FiBook className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Subject Category</p>
                        <p className="text-gray-600 dark:text-gray-300">{scholar.subjectCategory}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <FiAward className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Degree Level</p>
                        <p className="text-gray-600 dark:text-gray-300">{scholar.degree}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                        <FiCalendar className="text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Application Deadline</p>
                        <p className="text-gray-600 dark:text-gray-300">{scholar.applicationDeadline}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <FiTrendingUp className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">University Ranking</p>
                        <p className="text-gray-600 dark:text-gray-300">#{scholar.universityRank} Globally</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Pricing Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Investment</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg border border-lime-200 dark:border-lime-800">
                    <div className="flex items-center gap-3">
                      <FiDollarSign className="text-lime-600 dark:text-lime-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Application Fee</span>
                    </div>
                    <span className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                      ${scholar.applicationFees}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiBook className="text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">Tuition Fees</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${scholar.tuitionFees?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout(scholar)}
                  className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:from-lime-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Apply for Scholarship
                </button>

                <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    <span>Secure application process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    <span>Expert guidance included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    <span>24/7 support available</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-lime-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-lime-100 mb-4 text-sm">
                  Our expert counselors are here to guide you through the application process.
                </p>
                <button className="w-full bg-white/20 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-lg hover:bg-white/30 transition-colors duration-200">
                  Contact Counselor
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ScholarDetails;
