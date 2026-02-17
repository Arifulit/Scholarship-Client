/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../../hooks/useTheme";
import ActionButton from "../../Shared/Button/ActionButton";

const StudentOrderDataRow = ({ orderData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  const { universityName, scholarshipCategory, subjectCategory, applyingDegree, studyGap, userName, _id } = orderData || {};

  // SVG Icons for buttons
  const DetailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const EditIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const CancelIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  useEffect(() => {
    if (modalType === "edit") {
      setFormData({
        userName,
        universityName,
        scholarshipCategory,
        subjectCategory,
        applyingDegree,
        studyGap,
      });
    }
  }, [modalType, userName, universityName, scholarshipCategory, subjectCategory, applyingDegree, studyGap]);

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/orders/${_id}`, formData);
      Swal.fire("Success", "Data updated successfully.", "success");
      closeModal();
      refetch();
    } catch (err) {
      Swal.fire("Error", `Failed to update data: ${err.message}`, "error");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      Swal.fire("Success", "Order has been canceled successfully.", "success");
      closeModal();
      refetch();
    } catch (err) {
      Swal.fire("Error", `Failed to cancel order: ${err.message}`, "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <tr className={`
        border-b text-sm md:text-base transition-all duration-300 
        hover:shadow-md hover:bg-opacity-50
        ${isDarkMode 
          ? 'border-gray-700 hover:bg-gray-800 text-gray-200' 
          : 'border-gray-200 hover:bg-blue-50 text-gray-800'
        }
      `}>
        <td className={`px-2 py-4 md:px-5 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {userName}
        </td>
        <td className={`px-2 py-4 md:px-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {universityName}
        </td>
        <td className="px-2 py-4 md:px-5">
          <span className={`
            px-3 py-1 text-xs font-semibold rounded-full
            ${isDarkMode 
              ? 'bg-blue-900 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
            }
          `}>
            {scholarshipCategory}
          </span>
        </td>
        <td className={`px-2 py-4 md:px-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {subjectCategory}
        </td>
        <td className="px-2 py-4 md:px-5">
          <span className={`
            px-3 py-1 text-xs font-semibold rounded-full
            ${isDarkMode 
              ? 'bg-purple-900 text-purple-200' 
              : 'bg-purple-100 text-purple-800'
            }
          `}>
            {applyingDegree}
          </span>
        </td>
        <td className="px-2 py-4 md:px-5">
          <span className={`
            px-3 py-1 text-xs font-semibold rounded-full
            ${studyGap === 'None' || studyGap === '0' 
              ? isDarkMode 
                ? 'bg-green-900 text-green-200' 
                : 'bg-green-100 text-green-800'
              : isDarkMode 
                ? 'bg-yellow-900 text-yellow-200' 
                : 'bg-yellow-100 text-yellow-800'
            }
          `}>
            {studyGap}
          </span>
        </td>
        <td className="px-2 py-3 md:px-5">
          <div className="flex items-center gap-2 justify-start">
            <ActionButton
              variant="primary"
              size="sm"
              onClick={() => { setModalType("details"); setIsModalOpen(true); }}
              icon={<DetailIcon />}
              className={`
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-400'
                }
                font-semibold rounded-lg px-3 py-2 border
              `}
            >
              Details
            </ActionButton>
            <ActionButton
              variant="success"
              size="sm"
              onClick={() => { setModalType("edit"); setIsModalOpen(true); }}
              icon={<EditIcon />}
              className={`
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${isDarkMode 
                  ? 'bg-green-600 hover:bg-green-500 text-white border-green-500' 
                  : 'bg-green-500 hover:bg-green-600 text-white border-green-400'
                }
                font-semibold rounded-lg px-3 py-2 border
              `}
            >
              Edit
            </ActionButton>
            <ActionButton
              variant="danger"
              size="sm"
              onClick={() => { setModalType("delete"); setIsModalOpen(true); }}
              icon={<CancelIcon />}
              className={`
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${isDarkMode 
                  ? 'bg-red-600 hover:bg-red-500 text-white border-red-500' 
                  : 'bg-red-500 hover:bg-red-600 text-white border-red-400'
                }
                font-semibold rounded-lg px-3 py-2 border
              `}
            >
              Cancel
            </ActionButton>
          </div>
        </td>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100">
            {modalType === "details" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <DetailIcon />
                    Application Details
                  </h2>
                  <ActionButton
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    icon={<CloseIcon />}
                    className="!p-1.5"
                  />
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "User Name", value: userName },
                    { label: "University Name", value: universityName },
                    { label: "Scholarship Category", value: scholarshipCategory },
                    { label: "Subject Category", value: subjectCategory },
                    { label: "Applying Degree", value: applyingDegree },
                    { label: "Study Gap", value: studyGap }
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="font-medium text-gray-600 dark:text-gray-400 mb-1 sm:mb-0">{label}:</span>
                      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <ActionButton
                    variant="secondary"
                    onClick={closeModal}
                  >
                    Close
                  </ActionButton>
                </div>
              </div>
            )}

            {modalType === "edit" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <EditIcon />
                    Edit Application
                  </h2>
                  <ActionButton
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    icon={<CloseIcon />}
                    className="!p-1.5"
                  />
                </div>
                
                <form onSubmit={handleUpdateData} className="space-y-4">
                  {Object.keys(formData).map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim().toLowerCase()}`}
                      />
                    </div>
                  ))}
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <ActionButton
                      variant="secondary"
                      type="button"
                      onClick={closeModal}
                    >
                      Cancel
                    </ActionButton>
                    <ActionButton
                      variant="success"
                      type="submit"
                    >
                      Save Changes
                    </ActionButton>
                  </div>
                </form>
              </div>
            )}

            {modalType === "delete" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                    <CancelIcon />
                    Confirm Cancellation
                  </h2>
                  <ActionButton
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    icon={<CloseIcon />}
                    className="!p-1.5"
                  />
                </div>
                
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-gray-900 dark:text-gray-100 mb-2">
                    Are you sure you want to cancel this order?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This action cannot be undone. The application will be permanently removed.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <ActionButton
                    variant="secondary"
                    onClick={closeModal}
                  >
                    No, Keep Order
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={handleDelete}
                  >
                    Yes, Cancel Order
                  </ActionButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

StudentOrderDataRow.propTypes = {
  orderData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default StudentOrderDataRow;