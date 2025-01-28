import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CustomerOrderDataRow = ({ orderData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'details', 'delete', or 'edit'
  const [formData, setFormData] = useState({}); // For handling form data
  const axiosSecure = useAxiosSecure();

  const {
    universityName,
    scholarshipCategory,
    subjectCategory,
    applyingDegree,
    studyGap,
    userName,
    status,
    _id,
  } = orderData || {};

  useEffect(() => {
    if (modalType === 'edit') {
      setFormData({
        universityName,
        scholarshipCategory,
        subjectCategory,
        applyingDegree,
        studyGap,
      });
    }
  }, [modalType, universityName, scholarshipCategory, subjectCategory, applyingDegree, studyGap]);

  const handleDetailsClick = () => {
    setModalType('details');
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setModalType('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleEditClick = () => {
    if (status === 'Pending') {
      setModalType('edit');
      setIsModalOpen(true);
    } else {
      Swal.fire('Cannot Edit', 'Application is processing or completed.', 'warning');
    }
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      refetch();
      Swal.fire('Success', 'Order has been canceled successfully.', 'success');
    } catch (err) {
      Swal.fire('Error', `Failed to cancel order: ${err.message}`, 'error');
    } finally {
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/orders/${_id}`, formData);
      refetch();
      Swal.fire('Success', 'Order has been updated successfully.', 'success');
      closeModal();
    } catch (err) {
      Swal.fire('Error', `Failed to update order: ${err.message}`, 'error');
    }
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{userName}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{universityName}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{scholarshipCategory}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{subjectCategory}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{applyingDegree}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{studyGap}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
          <button
            onClick={handleDetailsClick}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Details
          </button>
          <button
            onClick={handleEditClick}
            className={`px-3 py-1 rounded ${
              status === 'Pending'
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-400 text-gray-800 cursor-not-allowed'
            }`}
            disabled={status !== 'Pending'}
          >
            Edit
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {modalType === 'details' && (
              <>
                <h2 className="text-lg font-semibold mb-4">Application Details</h2>
                <div className="space-y-2">
                  <p><strong>User Name:</strong> {userName}</p>
                  <p><strong>University Name:</strong> {universityName}</p>
                  <p><strong>Scholarship Category:</strong> {scholarshipCategory}</p>
                  <p><strong>Subject Category:</strong> {subjectCategory}</p>
                  <p><strong>Applying Degree:</strong> {applyingDegree}</p>
                  <p><strong>Study Gap:</strong> {studyGap}</p>
                </div>
              </>
            )}
            {modalType === 'edit' && (
              <>
                <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="universityName"
                      value={formData.universityName || ''}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="University Name"
                    />
                    <input
                      type="text"
                      name="scholarshipCategory"
                      value={formData.scholarshipCategory || ''}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Scholarship Category"
                    />
                    <input
                      type="text"
                      name="subjectCategory"
                      value={formData.subjectCategory || ''}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Subject Category"
                    />
                    <input
                      type="text"
                      name="applyingDegree"
                      value={formData.applyingDegree || ''}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Applying Degree"
                    />
                    <input
                      type="text"
                      name="studyGap"
                      value={formData.studyGap || ''}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Study Gap"
                    />
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
            {modalType === 'delete' && (
              <>
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to cancel this order?</p>
                <div className="mt-4 text-right space-x-2">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Yes, Cancel
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    No, Close
                  </button>
                </div>
              </>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CustomerOrderDataRow.propTypes = {
  orderData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CustomerOrderDataRow;
