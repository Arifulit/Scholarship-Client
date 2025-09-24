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
      <div className="mx-4 lg:mx-6">
        <Link
          to={`/scholar/${_id}`}
          className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.01]"
        >
          <div className="flex flex-col md:flex-row">
            {/* Enhanced University Logo Section */}
            <div className="md:w-56 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={universityLogo || "/placeholder.jpg"}
                    alt={`${universityName} Logo`}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-white shadow-2xl mx-auto"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-2 shadow-lg">
                    <HiTrendingUp className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className={`inline-block px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20 ${rankingColors.badge}`}>
                  #{universityRank}
                </div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="flex-1 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1 pr-6">
                  {/* Enhanced Title and University */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-3 leading-tight">
                    {scholarshipName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2 text-lg">
                    <HiLocationMarker className="w-5 h-5 text-emerald-500" />
                    {universityName} • {universityCity}, {universityCountry}
                  </p>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${scholarshipColors.bg} ${scholarshipColors.text} border-2 ${scholarshipColors.border} shadow-sm`}>
                      <FiAward className="w-4 h-4" />
                      {scholarshipCategory}
                    </span>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${subjectColors.bg} ${subjectColors.text} border-2 ${subjectColors.border} shadow-sm`}>
                      <FiBookOpen className="w-4 h-4" />
                      {subjectCategory}
                    </span>
                  </div>
                </div>

                {/* Enhanced Stats Section */}
                <div className="flex items-center gap-8 mt-6 lg:mt-0">
                  {/* Enhanced Fee */}
                  <div className="text-center">
                    <div className={`p-4 rounded-2xl mb-3 shadow-lg ${feeColors.bg}`}>
                      <HiCurrencyDollar className={`w-6 h-6 mx-auto ${feeColors.icon}`} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Fee</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
                    </p>
                  </div>

                  {/* Enhanced Deadline */}
                  <div className="text-center">
                    <div className={`p-4 rounded-2xl mb-3 shadow-lg ${deadlineColors.bg}`}>
                      <HiClock className={`w-6 h-6 mx-auto ${deadlineColors.icon}`} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Deadline</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {daysRemaining > 0 ? `${daysRemaining}d left` : 'Expired'}
                    </p>
                  </div>

                  {/* Enhanced Rating */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <HiStar className="w-6 h-6 text-yellow-400 drop-shadow-sm" />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{rating}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Rating</p>
                  </div>

                  {/* Enhanced Action Button */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-emerald-500">
                    <span className="font-bold text-sm">Apply Now</span>
                    <FiExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-4 lg:mx-6">
      <Link
        to={`/scholar/${_id}`}
        className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]"
      >
        {/* Professional University Header with Enhanced Spacing */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 px-6 py-8">
          {/* Enhanced Deadline Badge */}
          {daysRemaining <= 7 && daysRemaining > 0 && (
            <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg border border-red-400">
              <HiClock className="inline w-3 h-3 mr-1" />
              {daysRemaining}d left
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-18 h-18 rounded-2xl bg-white/95 p-3 shadow-2xl ring-4 ring-white/20">
                  <img
                    src={universityLogo || "/placeholder.jpg"}
                    alt={`${universityName} Logo`}
                    className="w-full h-full rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-2 shadow-lg">
                  <HiTrendingUp className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-white flex-1">
                <h3 className="text-lg font-bold line-clamp-1 mb-2 text-white/95">{universityName}</h3>
                <div className="flex items-center gap-2 text-emerald-50/90">
                  <HiLocationMarker className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium text-sm truncate">{universityCity}, {universityCountry}</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced University Rank Badge */}
            <div className={`px-4 py-3 rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20 ${rankingColors.badge}`}>
              #{universityRank}
            </div>
          </div>
        </div>

        {/* Professional Card Content with Enhanced Spacing */}
        <div className="px-6 py-8 space-y-6">
          {/* Enhanced Scholarship Name Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-4 leading-tight">
              {scholarshipName}
            </h2>
            
            {/* Enhanced Category Tags */}
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${scholarshipColors.bg} ${scholarshipColors.text} border-2 ${scholarshipColors.border} shadow-sm`}>
                <FiAward className="w-3 h-3" />
                {scholarshipCategory}
              </span>
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${subjectColors.bg} ${subjectColors.text} border-2 ${subjectColors.border} shadow-sm`}>
                <FiBookOpen className="w-3 h-3" />
                {subjectCategory}
              </span>
            </div>
          </div>

          {/* Enhanced Information Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Application Deadline */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors duration-300">
              <div className={`p-3 rounded-xl shadow-md ${deadlineColors.bg}`}>
                <HiCalendar className={`w-5 h-5 ${deadlineColors.icon}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Deadline</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{formatDate(applicationDeadline)}</p>
                <p className={`text-xs font-semibold mt-1 ${deadlineColors.text}`}>{deadlineColors.status}</p>
              </div>
            </div>

            {/* Application Fees */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 transition-colors duration-300">
              <div className={`p-3 rounded-xl shadow-md ${feeColors.bg}`}>
                <HiCurrencyDollar className={`w-5 h-5 ${feeColors.icon}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Application Fee</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                  {applicationFees === 0 ? 'Free Application' : `$${applicationFees}`}
                </p>
                {applicationFees === 0 && (
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">No fees required</p>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Rating and Action Section */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            {/* Enhanced Rating Display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <HiStar
                    key={index}
                    className={`w-5 h-5 transition-colors duration-200 ${
                      index < Math.floor(rating)
                        ? "text-yellow-400 drop-shadow-sm"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                {rating}/5
              </span>
            </div>
            
            {/* Enhanced Action Button */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-emerald-500">
              <span className="font-bold text-sm">Apply Now</span>
              <FiExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
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
