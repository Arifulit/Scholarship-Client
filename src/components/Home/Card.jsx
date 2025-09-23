import { Link } from "react-router-dom";
import { HiStar, HiLocationMarker, HiCalendar, HiCurrencyDollar, HiTrendingUp, HiClock } from "react-icons/hi";
import { FiExternalLink, FiAward, FiBookOpen } from "react-icons/fi";
import PropTypes from "prop-types";
import { 
  getScholarshipTypeColors, 
  getSubjectCategoryColors, 
  getRankingTier, 
  getApplicationFeeColors,
  getDeadlineUrgencyColors 
} from "../../utils/scholarshipColors";

const Card = ({ scholar, viewMode = "grid" }) => {
  // Debug log
  console.log('Card received scholar data:', scholar);
  
  const {
    scholarshipName = "Scholarship Name",
    universityName = "University Name", 
    universityLogo = "/placeholder.jpg",
    universityCountry = "Country",
    universityCity = "City",
    universityRank = 999,
    scholarshipCategory = "Academic",
    applicationDeadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    subjectCategory = "General",
    applicationFees = 0,
    rating = 4.0,
    _id = "default-id",
  } = scholar || {};

  // Get colors for different elements
  const scholarshipColors = getScholarshipTypeColors(scholarshipCategory);
  const subjectColors = getSubjectCategoryColors(subjectCategory);
  const rankingColors = getRankingTier(universityRank);
  const feeColors = getApplicationFeeColors(applicationFees);
  const deadlineColors = getDeadlineUrgencyColors(applicationDeadline);

  // Format deadline date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const daysRemaining = getDaysRemaining(applicationDeadline);

  if (viewMode === "list") {
    return (
      <Link
        to={`/scholar/${_id}`}
        className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* University Logo Section */}
          <div className="md:w-48 bg-gradient-to-br from-lime-500 to-emerald-600 p-6 flex items-center justify-center">
            <div className="text-center">
              <img
                src={universityLogo || "/placeholder.jpg"}
                alt={`${universityName} Logo`}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${rankingColors.badge}`}>
                #{universityRank}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex-1">
                {/* Title and University */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300 mb-2">
                  {scholarshipName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <HiLocationMarker className="w-4 h-4" />
                  {universityName} • {universityCity}, {universityCountry}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${scholarshipColors.bg} ${scholarshipColors.text}`}>
                    <FiAward className="w-3 h-3" />
                    {scholarshipCategory}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${subjectColors.bg} ${subjectColors.text}`}>
                    <FiBookOpen className="w-3 h-3" />
                    {subjectCategory}
                  </span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="flex items-center gap-6 mt-4 lg:mt-0">
                {/* Fee */}
                <div className="text-center">
                  <div className={`p-2 rounded-lg mb-1 ${feeColors.bg}`}>
                    <HiCurrencyDollar className={`w-5 h-5 mx-auto ${feeColors.icon}`} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Fee</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
                  </p>
                </div>

                {/* Deadline */}
                <div className="text-center">
                  <div className={`p-2 rounded-lg mb-1 ${deadlineColors.bg}`}>
                    <HiClock className={`w-5 h-5 mx-auto ${deadlineColors.icon}`} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Deadline</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {daysRemaining > 0 ? `${daysRemaining}d left` : 'Expired'}
                  </p>
                </div>

                {/* Rating */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HiStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                </div>

                {/* Action */}
                <div className="text-lime-600 dark:text-lime-400 group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors duration-300">
                  <FiExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/scholar/${_id}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up"
    >
      {/* University Header */}
      <div className="relative bg-gradient-to-r from-lime-500 to-emerald-600 p-6">
        {/* Deadline Urgency Badge */}
        {daysRemaining <= 7 && daysRemaining > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            {daysRemaining}d left
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={universityLogo || "/placeholder.jpg"}
                alt={`${universityName} Logo`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                <HiTrendingUp className="w-4 h-4 text-lime-500" />
              </div>
            </div>
            <div className="text-white">
              <h3 className="text-lg font-bold line-clamp-1">{universityName}</h3>
              <div className="flex items-center gap-1 text-lime-100">
                <HiLocationMarker className="w-4 h-4" />
                <span className="text-sm">{universityCity}, {universityCountry}</span>
              </div>
            </div>
          </div>
          
          {/* University Rank Badge */}
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${rankingColors.badge}`}>
            #{universityRank}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Scholarship Name */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300 mb-3">
            {scholarshipName}
          </h2>
          
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${scholarshipColors.bg} ${scholarshipColors.text} border ${scholarshipColors.border}`}>
              <FiAward className="w-3 h-3" />
              {scholarshipCategory}
            </span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${subjectColors.bg} ${subjectColors.text} border ${subjectColors.border}`}>
              <FiBookOpen className="w-3 h-3" />
              {subjectCategory}
            </span>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Application Deadline */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${deadlineColors.bg}`}>
              <HiCalendar className={`w-4 h-4 ${deadlineColors.icon}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Deadline</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatDate(applicationDeadline)}</p>
              <p className={`text-xs font-medium ${deadlineColors.text}`}>{deadlineColors.status}</p>
            </div>
          </div>

          {/* Application Fees */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${feeColors.bg}`}>
              <HiCurrencyDollar className={`w-4 h-4 ${feeColors.icon}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Application Fee</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {applicationFees === 0 ? 'Free Application' : `$${applicationFees}`}
              </p>
              {applicationFees === 0 && (
                <p className="text-xs font-medium text-green-600 dark:text-green-400">No fees required</p>
              )}
            </div>
          </div>
        </div>

        {/* Rating and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <HiStar
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}/5</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(Reviews)</span>
          </div>
          
          {/* Action Button */}
          <div className="flex items-center gap-2 text-lime-600 dark:text-lime-400 group-hover:text-lime-700 dark:group-hover:text-lime-300 transition-colors duration-300">
            <span className="text-sm font-medium">Apply Now</span>
            <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
};

Card.propTypes = {
  scholar: PropTypes.shape({
    scholarshipName: PropTypes.string.isRequired,
    universityName: PropTypes.string.isRequired,
    universityLogo: PropTypes.string.isRequired,
    universityCountry: PropTypes.string.isRequired,
    universityCity: PropTypes.string.isRequired,
    universityRank: PropTypes.number.isRequired,
    scholarshipCategory: PropTypes.string.isRequired,
    subjectCategory: PropTypes.string.isRequired,
    applicationDeadline: PropTypes.string.isRequired,
    applicationFees: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  viewMode: PropTypes.oneOf(['grid', 'list']),
};

export default Card;
