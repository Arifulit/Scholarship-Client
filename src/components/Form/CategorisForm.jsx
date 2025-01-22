// const AddPlantForm = () => {
//   return (
//     <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
//       <form>
//         <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
//           <div className='space-y-6'>
//             {/* Name */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='name' className='block text-gray-600'>
//                 Name
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='name'
//                 id='name'
//                 type='text'
//                 placeholder='Plant Name'
//                 required
//               />
//             </div>
//             {/* Category */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='category' className='block text-gray-600 '>
//                 Category
//               </label>
//               <select
//                 required
//                 className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='category'
//               >
//                 <option value='Indoor'>Indoor</option>
//                 <option value='Outdoor'>Outdoor</option>
//                 <option value='Succulent'>Succulent</option>
//                 <option value='Flowering'>Flowering</option>
//               </select>
//             </div>
//             {/* Description */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='description' className='block text-gray-600'>
//                 Description
//               </label>

//               <textarea
//                 id='description'
//                 placeholder='Write plant description here...'
//                 className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
//                 name='description'
//               ></textarea>
//             </div>
//           </div>
//           <div className='space-y-6 flex flex-col'>
//             {/* Price & Quantity */}
//             <div className='flex justify-between gap-2'>
//               {/* Price */}
//               <div className='space-y-1 text-sm'>
//                 <label htmlFor='price' className='block text-gray-600 '>
//                   Price
//                 </label>
//                 <input
//                   className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                   name='price'
//                   id='price'
//                   type='number'
//                   placeholder='Price per unit'
//                   required
//                 />
//               </div>

//               {/* Quantity */}
//               <div className='space-y-1 text-sm'>
//                 <label htmlFor='quantity' className='block text-gray-600'>
//                   Quantity
//                 </label>
//                 <input
//                   className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                   name='quantity'
//                   id='quantity'
//                   type='number'
//                   placeholder='Available quantity'
//                   required
//                 />
//               </div>
//             </div>
//             {/* Image */}
//             <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
//               <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
//                 <div className='flex flex-col w-max mx-auto text-center'>
//                   <label>
//                     <input
//                       className='text-sm cursor-pointer w-36 hidden'
//                       type='file'
//                       name='image'
//                       id='image'
//                       accept='image/*'
//                       hidden
//                     />
//                     <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
//                       Upload
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type='submit'
//               className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
//             >
//               Save & Continue
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default AddPlantForm




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
