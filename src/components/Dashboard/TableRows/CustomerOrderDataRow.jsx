
// export default CustomerOrderDataRow
import PropTypes from "prop-types";
import { useState } from "react";
import Swal from "sweetalert2";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ orderData, refetch }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const axiosSecure = useAxiosSecure();

  const closeCancelModal = () => setIsCancelModalOpen(false);

  const {
    subjectCategory,
    status,
    scholarshipCategory,
    _id,
    universityName
  } = orderData || {};

  console.log('order data:  ',orderData);

  const handleDetailsClick = () => {
    Swal.fire("Details", "Navigating to details page...", "info");
  };

  const handleEditClick = () => {
    if (status === "Pending") {
      Swal.fire(
        "Edit Application",
        "You can now edit your application.",
        "success"
      );
    } else {
      Swal.fire(
        "Cannot Edit",
        "Application is processing or completed.",
        "warning"
      );
    }
  };

  const handleAddReviewClick = () => {
    Swal.fire(
      "Add Review",
      "Add your review functionality coming soon!",
      "info"
    );
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`);
      refetch();
      Swal.fire("Success", "Order has been canceled successfully.", "success");
    } catch (err) {
      Swal.fire("Error", `Failed to cancel order: ${err.message}`, "error");
    } finally {
      closeCancelModal();
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{universityName}</p>
      </td>
      
      
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{subjectCategory}</p>
      </td>
    
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{scholarshipCategory}</p>
      </td>
      
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`px-3 py-1 inline-block font-semibold leading-tight rounded-full ${
            status === "Pending"
              ? "bg-yellow-200 text-yellow-900"
              : status === "Processing"
              ? "bg-blue-200 text-blue-900"
              : status === "Completed"
              ? "bg-green-200 text-green-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
        {/* Details Button */}
        <button
          onClick={handleDetailsClick}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Details
        </button>

        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className={`px-3 py-1 rounded ${
            status === "Pending"
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-gray-400 text-gray-800 cursor-not-allowed"
          }`}
          disabled={status !== "Pending"}
        >
          Edit
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => setIsCancelModalOpen(true)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cancel
        </button>

        {/* Add Review Button */}
        <button
          onClick={handleAddReviewClick}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add Review
        </button>
      </td>

      {/* Cancel Modal */}
      <DeleteModal
        isOpen={isCancelModalOpen}
        closeModal={closeCancelModal}
        handleDelete={handleDelete}
      />
    </tr>
  );
};

CustomerOrderDataRow.propTypes = {
  orderData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CustomerOrderDataRow;






