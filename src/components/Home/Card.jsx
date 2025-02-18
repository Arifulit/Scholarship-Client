/* eslint-disable react/prop-types */

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ scholar }) => {
  const {
    scholarshipName,
    universityName, 
    universityLogo,
    universityCountry,
    universityCity,
    universityWorldRank,
    scholarshipCategory,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    rating,
    _id,
  } = scholar || {};

 
  return (
    <Link
      to={`/scholar/${_id}`}
      className="group block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      {/* University Logo and Header */}
      <div className="p-4 flex items-center bg-blue-100">
        <img
          src={ universityLogo}
          alt={`${universityName} Logo`}
          className="w-16 h-16 rounded-full object-cover border border-gray-300"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800">{universityName}</h2>
          <p className="text-sm text-gray-600">
            {universityCity}, {universityCountry}
          </p>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Scholarship Name:</span>{" "}
          {scholarshipName}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Scholarship Category:</span>{" "}
          {scholarshipCategory}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Subjects:</span> {subjectCategory}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Application Deadline:</span> {applicationDeadline}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Application Fees:</span> ${applicationFees}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">World Rank:</span> {universityWorldRank}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-lg font-bold">{rating}</span>
      
        </div>

        {/* Scholarship Details Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          View Scholarship Details
        </button>
      </div>
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
    universityWorldRank: PropTypes.number.isRequired,
    scholarshipCategory: PropTypes.string.isRequired,
    subjectCategory: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    applicationFees: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default Card;
