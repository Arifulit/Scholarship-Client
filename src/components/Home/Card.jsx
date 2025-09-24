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
      <div className="p-2 sm:p-3 md:p-4 lg:p-5">
        <Link
          to={`/scholar/${_id}`}
          className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/60 dark:border-gray-600/60 hover:border-emerald-400/80 dark:hover:border-emerald-400/80 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.01] backdrop-blur-lg bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/30"
        >
          <div className="flex flex-col md:flex-row">
            {/* Compact University Logo Section */}
            <div className="md:w-48 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 p-6 flex items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full translate-x-8 translate-y-8"></div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="relative mb-4 group">
                  <img
                    src={universityLogo || "/placeholder.jpg"}
                    alt={`${universityName} Logo`}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-lg p-2 shadow-lg border border-white/50">
                    <HiTrendingUp className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className={`inline-block px-3 py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur-md border border-white/30 ${rankingColors.badge} transform hover:scale-110 transition-all duration-300`}>
                  <span className="drop-shadow-lg">#{universityRank}</span>
                </div>
              </div>
            </div>

            {/* Compact Content Section */}
            <div className="flex-1 p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1 pr-4">
                  {/* Compact Title and University */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 mb-2 leading-tight">
                    {scholarshipName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2 text-sm">
                    <HiLocationMarker className="w-4 h-4 text-emerald-500" />
                    {universityName} • {universityCity}, {universityCountry}
                  </p>

                  {/* Compact Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${scholarshipColors.bg} ${scholarshipColors.text} border ${scholarshipColors.border} shadow-sm`}>
                      <FiAward className="w-3 h-3" />
                      {scholarshipCategory}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${subjectColors.bg} ${subjectColors.text} border ${subjectColors.border} shadow-sm`}>
                      <FiBookOpen className="w-3 h-3" />
                      {subjectCategory}
                    </span>
                  </div>
                </div>

                {/* Compact Stats Section */}
                <div className="flex items-center gap-4 mt-4 lg:mt-0">
                  {/* Compact Fee */}
                  <div className="text-center">
                    <div className={`p-2 rounded-lg mb-2 shadow-sm ${feeColors.bg}`}>
                      <HiCurrencyDollar className={`w-4 h-4 mx-auto ${feeColors.icon}`} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Fee</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                      {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
                    </p>
                  </div>

                  {/* Compact Deadline */}
                  <div className="text-center">
                    <div className={`p-2 rounded-lg mb-2 shadow-sm ${deadlineColors.bg}`}>
                      <HiClock className={`w-4 h-4 mx-auto ${deadlineColors.icon}`} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Deadline</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                      {daysRemaining > 0 ? `${daysRemaining}d left` : 'Expired'}
                    </p>
                  </div>

                  {/* Compact Rating */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <HiStar className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{rating}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Rating</p>
                  </div>

                  {/* Compact Action Button */}
                  <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-emerald-500">
                    <span className="font-semibold text-sm">Apply Now</span>
                    <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
    <div className="p-2 sm:p-3 md:p-4 lg:p-5">
      <Link
        to={`/scholar/${_id}`}
        className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/60 dark:border-gray-600/60 hover:border-emerald-400/80 dark:hover:border-emerald-400/80 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-lg bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-900/30"
      >
        {/* Compact Professional University Header */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 px-4 py-6 overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12 blur-sm"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/30 rounded-full -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white rounded-full translate-x-10 translate-y-10 blur-sm"></div>
          </div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          
          {/* Compact Deadline Badge */}
          {daysRemaining <= 7 && daysRemaining > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg border border-red-400/50 animate-pulse">
              <HiClock className="inline w-3 h-3 mr-1" />
              {daysRemaining}d left
            </div>
          )}
          
          <div className="relative flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-white/95 p-2 shadow-lg ring-2 ring-white/40 group-hover:ring-white/60 transition-all duration-300 group-hover:shadow-xl">
                  <img
                    src={universityLogo || "/placeholder.jpg"}
                    alt={`${universityName} Logo`}
                    className="w-full h-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-lg p-1.5 shadow-lg border border-white/60">
                  <HiTrendingUp className="w-3 h-3 text-white drop-shadow-md" />
                </div>
              </div>
              <div className="text-white flex-1 space-y-1">
                <h3 className="text-lg font-bold line-clamp-1 text-white drop-shadow-lg">{universityName}</h3>
                <div className="flex items-center gap-2 text-white/95">
                  <HiLocationMarker className="w-4 h-4 flex-shrink-0 drop-shadow-md" />
                  <span className="font-semibold text-sm truncate drop-shadow-md">{universityCity}, {universityCountry}</span>
                </div>
              </div>
            </div>
            
            {/* Compact University Rank Badge */}
            <div className={`px-3 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-md border-2 border-white/40 ${rankingColors.badge} transform hover:scale-110 transition-all duration-300`}>
              <span className="drop-shadow-lg">#{universityRank}</span>
            </div>
          </div>
        </div>

        {/* Compact Card Content */}
        <div className="px-5 py-6 space-y-5 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/30 dark:from-gray-800/80 dark:via-gray-800 dark:to-gray-900/30">
          {/* Compact Scholarship Name Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300 leading-tight">
              {scholarshipName}
            </h2>
            
            {/* Compact Category Tags */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${scholarshipColors.bg} ${scholarshipColors.text} border ${scholarshipColors.border} shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105`}>
                <FiAward className="w-3 h-3" />
                {scholarshipCategory}
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${subjectColors.bg} ${subjectColors.text} border ${subjectColors.border} shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105`}>
                <FiBookOpen className="w-3 h-3" />
                {subjectCategory}
              </span>
            </div>
          </div>

          {/* Compact Information Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Compact Application Deadline */}
            <div className="group flex flex-col items-center gap-2 p-3 bg-gradient-to-r from-white via-gray-50/90 to-emerald-50/50 dark:from-gray-700 dark:via-gray-800/90 dark:to-emerald-900/30 rounded-xl border border-gray-200/80 dark:border-gray-600/80 hover:border-emerald-400/80 dark:hover:border-emerald-500/80 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
              <div className={`p-2 rounded-lg shadow-md group-hover:scale-110 transition-all duration-300 ${deadlineColors.bg}`}>
                <HiCalendar className={`w-4 h-4 ${deadlineColors.icon}`} />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Deadline</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{formatDate(applicationDeadline)}</p>
              </div>
            </div>

            {/* Compact Application Fees */}
            <div className="group flex flex-col items-center gap-2 p-3 bg-gradient-to-r from-white via-gray-50/90 to-blue-50/50 dark:from-gray-700 dark:via-gray-800/90 dark:to-blue-900/30 rounded-xl border border-gray-200/80 dark:border-gray-600/80 hover:border-blue-400/80 dark:hover:border-blue-500/80 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
              <div className={`p-2 rounded-lg shadow-md group-hover:scale-110 transition-all duration-300 ${feeColors.bg}`}>
                <HiCurrencyDollar className={`w-4 h-4 ${feeColors.icon}`} />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Fee</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
                </p>
              </div>
            </div>
          </div>

          {/* Compact Rating and Action Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/60 dark:border-gray-600/60">
            {/* Compact Rating Display */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-amber-50 dark:from-yellow-900/40 dark:to-amber-900/40 px-3 py-2 rounded-xl border border-yellow-300/60 dark:border-yellow-600/60 shadow-sm">
                {[...Array(5)].map((_, index) => (
                  <HiStar
                    key={index}
                    className={`w-4 h-4 transition-all duration-300 ${
                      index < Math.floor(rating)
                        ? "text-yellow-500 drop-shadow-sm"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{rating}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Rating</div>
              </div>
            </div>
            
            {/* Compact Action Button */}
            <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-600 to-green-600 hover:from-emerald-600 hover:via-teal-700 hover:to-green-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 border border-emerald-400/60">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <span className="font-bold text-sm">Apply Now</span>
                <FiExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </button>
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
