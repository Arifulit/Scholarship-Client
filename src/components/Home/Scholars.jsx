
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import { Link } from "react-router-dom";
import { HiAcademicCap, HiArrowRight, HiTrendingUp } from "react-icons/hi";
import { mockScholarships } from "../../services/mockData";

const Scholars = () => {
  // Fetching scholarship data with comprehensive error handling
  const { data: scholarships, isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      try {
        console.log('🔍 API URL:', import.meta.env.VITE_API_URL);
        console.log('🚀 Fetching scholarships from:', `${import.meta.env.VITE_API_URL}/scholarship`);
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/scholarship`);
        console.log('✅ API Response:', response.data);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        } else {
          console.log('⚠️ API returned empty array, using mock data');
          return mockScholarships;
        }
      } catch (apiError) {
        console.error('❌ API Error:', apiError);
        console.log('🎭 Using mock data as fallback');
        return mockScholarships;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  if (isLoading) return <LoadingSpinner />;

  // Sort scholarships: Lowest application fees first, then most recent posts
  const sortedScholarships = scholarships
    ? [...scholarships].sort((a, b) =>
        a.applicationFee !== b.applicationFee
          ? a.applicationFee - b.applicationFee
          : new Date(b.postedDate) - new Date(a.postedDate)
      )
    : [];

  // Display only the top 6 scholarships
  const topScholarships = sortedScholarships.slice(0, 6);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-300">
      <Container>
        {scholarships?.length > 0 ? (
          <section>
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full mb-6 shadow-lg">
                <HiAcademicCap className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-500">Scholarships</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the most popular and accessible scholarship opportunities. 
                These featured scholarships offer the best value and highest success rates.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiAcademicCap className="text-2xl text-lime-600 dark:text-lime-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{scholarships.length}+</h3>
                <p className="text-gray-600 dark:text-gray-400">Available Scholarships</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiTrendingUp className="text-2xl text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">95%</h3>
                <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">$</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$50M+</h3>
                <p className="text-gray-600 dark:text-gray-400">Total Awarded</p>
              </div>
            </div>

            {/* Ultra Professional Scholarship Grid with Perfect Window Spacing */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mb-16">
                {topScholarships.map((scholar, index) => (
                  <div
                    key={scholar._id}
                    className="transform transition-all duration-700 hover:z-10"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    <Card scholar={scholar} />
                  </div>
                ))}
              </div>
            </div>

            {/* "View All Scholarships" Button */}
            {sortedScholarships.length > 6 && (
              <div className="text-center">
                <Link
                  to="/all-scholarship"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-lime-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View All Scholarships
                  <HiArrowRight className="w-5 h-5" />
                </Link>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Explore {scholarships.length - 6} more scholarship opportunities
                </p>
              </div>
            )}
          </section>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiAcademicCap className="text-4xl text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Scholarships Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We&apos;re currently updating our scholarship database. Please check back soon!
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Go to Dashboard
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Scholars;
