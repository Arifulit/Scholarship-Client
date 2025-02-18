
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ orderData, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'details', 'delete', or 'edit'
  const [formData, setFormData] = useState({});
  const axiosSecure = useAxiosSecure();

  const {
    universityName,
    scholarshipCategory,
    subjectCategory,
    applyingDegree,
    studyGap,
    userName,
    _id,
  } = orderData || {};

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
  }, [
    modalType,
    userName,
    universityName,
    scholarshipCategory,
    subjectCategory,
    applyingDegree,
    studyGap,
  ]);

  const handleDetailsClick = () => {
    setModalType("details");
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setModalType("delete");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = {
        userName: formData.userName,
        universityName: formData.universityName,
        scholarshipCategory: formData.scholarshipCategory,
        subjectCategory: formData.subjectCategory,
        applyingDegree: formData.applyingDegree,
        studyGap: formData.studyGap,
      };

      await axiosSecure.put(`/orders/${_id}`, updatedCategory);
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200">{userName}</td>
        <td className="px-5 py-5 border-b border-gray-200">{universityName}</td>
        <td className="px-5 py-5 border-b border-gray-200">{scholarshipCategory}</td>
        <td className="px-5 py-5 border-b border-gray-200">{subjectCategory}</td>
        <td className="px-5 py-5 border-b border-gray-200">{applyingDegree}</td>
        <td className="px-5 py-5 border-b border-gray-200">{studyGap}</td>
        <td className="px-5 py-5 border-b border-gray-200 flex gap-2">
          <button
            onClick={handleDetailsClick}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Details
          </button>
          <button
            onClick={() => {
              setModalType("edit");
              setIsModalOpen(true);
            }}
            className="bg-green-500  px-3 py-1 rounded hover:bg-green-600"
          >
            Edit
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-red-500  px-3 py-1 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {modalType === "details" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Application Details</h2>
                <div className="space-y-2">
                  <p>
                    <strong>User Name:</strong> {userName}
                  </p>
                  <p>
                    <strong>University Name:</strong> {universityName}
                  </p>
                  <p>
                    <strong>Scholarship Category:</strong> {scholarshipCategory}
                  </p>
                  <p>
                    <strong>Subject Category:</strong> {subjectCategory}
                  </p>
                  <p>
                    <strong>Applying Degree:</strong> {applyingDegree}
                  </p>
                  <p>
                    <strong>Study Gap:</strong> {studyGap}
                  </p>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-red-500  rounded hover:bg-red-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {modalType === "edit" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
                <form onSubmit={handleUpdateData}>
                  <div className="space-y-4">
                    {["userName", "universityName", "scholarshipCategory", "subjectCategory", "applyingDegree", "studyGap"].map(
                      (field) => (
                        <input
                          key={field}
                          type="text"
                          name={field}
                          value={formData[field] || ""}
                          onChange={handleChange}
                          className="border p-2 rounded w-full"
                          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                        />
                      )
                    )}
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-600"
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

            {modalType === "delete" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to cancel this order?</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
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
