/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ModeratorOrderDataRow = ({ orderData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');


  const { subjectCategory, scholarshipCategory, _id, universityName, applyingDegree, userId } = orderData || {};

  // Handle order rejection (delete)
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      refetch();
      toast.success('Application Rejected');
    } catch (err) {
      toast.error(err.response?.data || 'Failed to reject application');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  

  // Handle feedback submission
  // eslint-disable-next-line no-unused-vars
  const handleFeedbackSubmit = async () => {
    if (feedback.trim() === '') {
      toast.error('Please provide some feedback');
      return;
    }

    try {
      await axiosSecure.patch(`/orders/feedback/${_id}`, { feedback });
      toast.success('Feedback submitted successfully');
      refetch();
      setFeedback('');
      setFeedbackModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data || 'Failed to submit feedback');
    }
  };

  return (
    <>
      <tr>
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
          <div className="flex items-center gap-2">
            <button onClick={() => setDetailsModalOpen(true)} className="text-blue-500 hover:underline">
              <FaInfoCircle /> Details
            </button>
           
            <button onClick={() => setDeleteModalOpen(true)} className="text-red-500 hover:underline">
              <FaTimes /> Cancel
            </button>
          </div>
        </td>
      </tr>

      {/* Details Modal */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <p><strong>University:</strong> {universityName}</p>
            <p><strong>Degree:</strong> {applyingDegree}</p>
            <p><strong>Scholarship Category:</strong> {scholarshipCategory}</p>
            <div className="mt-4">
              <button onClick={() => setDetailsModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Close</button>
            </div>
          </div>
        </div>
      )}

  
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to reject this application?</h2>
            <div className="flex justify-between">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModeratorOrderDataRow;
