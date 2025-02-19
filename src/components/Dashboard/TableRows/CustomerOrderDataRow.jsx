
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ orderData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();

  const { universityName, scholarshipCategory, subjectCategory, applyingDegree, studyGap, userName, _id } = orderData || {};

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
      <tr className="border-b text-sm md:text-base">
        <td className="px-2 py-3 md:px-5">{userName}</td>
        <td className="px-2 py-3 md:px-5">{universityName}</td>
        <td className="px-2 py-3 md:px-5">{scholarshipCategory}</td>
        <td className="px-2 py-3 md:px-5">{subjectCategory}</td>
        <td className="px-2 py-3 md:px-5">{applyingDegree}</td>
        <td className="px-2 py-3 md:px-5">{studyGap}</td>
        <td className="px-2 py-3 md:px-5 flex flex-wrap gap-2">
          <button onClick={() => { setModalType("details"); setIsModalOpen(true); }} className="bg-blue-500 text-white px-2 py-1 md:px-3 rounded hover:bg-blue-600">Details</button>
          <button onClick={() => { setModalType("edit"); setIsModalOpen(true); }} className="bg-green-500 text-white px-2 py-1 md:px-3 rounded hover:bg-green-600">Edit</button>
          <button onClick={() => { setModalType("delete"); setIsModalOpen(true); }} className="bg-red-500 text-white px-2 py-1 md:px-3 rounded hover:bg-red-600">Cancel</button>
        </td>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            {modalType === "details" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Application Details</h2>
                <p><strong>User Name:</strong> {userName}</p>
                <p><strong>University Name:</strong> {universityName}</p>
                <p><strong>Scholarship Category:</strong> {scholarshipCategory}</p>
                <p><strong>Subject Category:</strong> {subjectCategory}</p>
                <p><strong>Applying Degree:</strong> {applyingDegree}</p>
                <p><strong>Study Gap:</strong> {studyGap}</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={closeModal}>Close</button>
              </>
            )}

            {modalType === "edit" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
                <form onSubmit={handleUpdateData} className="space-y-4">
                  {Object.keys(formData).map((field) => (
                    <input key={field} type="text" name={field} value={formData[field] || ""} onChange={handleChange} className="border p-2 rounded w-full" placeholder={field.replace(/([A-Z])/g, " $1").trim()} />
                  ))}
                  <div className="mt-4 flex justify-end gap-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
                    <button type="button" onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                  </div>
                </form>
              </>
            )}

            {modalType === "delete" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to cancel this order?</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes, Cancel</button>
                  <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">No, Close</button>
                </div>
              </>
            )}
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