
import { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

const CategorisForm = () => {
  // const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImage: "",
    categoryQuantity: ""
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for empty fields
    if (!formData.categoryName || !formData.categoryImage || !formData.categoryQuantity) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
    } else {
      // Extract form data
      const categoryName = e.target.categoryName.value;
      const categoryImage = e.target.categoryImage.value;
      const categoryQuantity = parseInt(e.target.categoryQuantity.value);
  
      console.log(categoryName, categoryImage, categoryQuantity);
  

      // Clear form and close modal
      setFormData({ categoryName: "", categoryImage: "", categoryQuantity: "" });
      setModalIsOpen(false);
  
      // Success notification
      Swal.fire({
        title: "Category added successfully!",
        icon: "success",
        draggable: true,
      });
    }
  };
  


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Add Category Button */}
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Category
      </button>

     

      {/* Modal for Adding Category */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter category name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category Image URL</label>
            <input
              type="text"
              name="categoryImage"
              value={formData.categoryImage}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter image URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category Quantity</label>
            <input
              type="number"
              name="categoryQuantity"
              value={formData.categoryQuantity}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter quantity"
              min="0"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategorisForm;
