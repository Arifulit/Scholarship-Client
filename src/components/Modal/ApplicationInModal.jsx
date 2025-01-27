// /* eslint-disable react/prop-types */
// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment, useState } from 'react';

// import Swal from 'sweetalert2';
// import useAuth from '../../hooks/useAuth';

// import useAxiosSecure from '../../hooks/useAxiosSecure';
// const [applicationData,setapplicationData] = useState({});
// import { useAuth } from '../../hooks/useAuth';

// const ApplicationInModal = ({
//   closeModal,
//   isOpen,
//   scholarshipName,
//   scholarshipCategory,
//   subjectCategory,
//   universityName,
//   _id,
// }) => {
  // const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();

  // const [formData, setFormData] = useState({
  //   phone: '',
  //   photo: '',
  //   address: '',
  //   gender: '',
  //   degree: '',
  //   sscResult: '',
  //   hscResult: '',
  //   studyGap: '',
  // });

  // const [ setApplicationData] = useState({}); // Store application data

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const applicationDetails = {
  //     ...formData,
  //     applicant: {
  //       name: user?.displayName || 'Guest',
  //       email: user?.email || 'guest@example.com',
  //       userId: user?._id || 'N/A',
  //     },
  //     scholarshipId: _id,
  //     scholarshipName,
  //     scholarshipCategory,
  //     subjectCategory,
  //     universityName,
  //     applicationDate: new Date().toISOString(),
  //   };

  //   setApplicationData(applicationDetails); // Store application data in state

  //   try {
  //     const response = await axiosSecure.post('/order', applicationDetails);

  //     if (response.data.insertedId) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Application Submitted!',
  //         text: 'Your scholarship application has been submitted successfully.',
  //       });
  //       closeModal();
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Submission Failed',
  //       text: `Something went wrong. Please try again. ${error.message}`,
  //     });
  //   }
  // };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeModal}>
//         <div className="fixed inset-0 bg-black bg-opacity-25" />
//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
//               <h3 className="text-lg font-medium text-gray-900 text-center">Scholarship Application</h3>
// //               <form onSubmit={handleSubmit} className="space-y-4 mt-4">
// //                 {/** Input Fields */}
//                 <div>
//                   <label className="block font-medium">Phone Number</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium">Photo URL</label>
//                   <input
//                     type="text"
//                     name="photo"
//                     value={formData.photo}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium">Gender</label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block font-medium">Degree</label>
//                   <select
//                     name="degree"
//                     value={formData.degree}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                     required
//                   >
//                     <option value="">Select Degree</option>
//                     <option value="Diploma">Diploma</option>
//                     <option value="Bachelor">Bachelor</option>
//                     <option value="Masters">Masters</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block font-medium">SSC Result</label>
//                   <input
//                     type="text"
//                     name="sscResult"
//                     value={formData.sscResult}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium">HSC Result</label>
//                   <input
//                     type="text"
//                     name="hscResult"
//                     value={formData.hscResult}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block font-medium">Study Gap (Optional)</label>
//                   <input
//                     type="text"
//                     name="studyGap"
//                     value={formData.studyGap}
//                     onChange={handleInputChange}
//                     className="w-full border rounded px-3 py-2 bg-white"
//                   />
//                 </div>
//                 {/** Submit Button */}
//                 <div className="mt-4">
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//                   >
//                     Submit Application
//                   </button>
//                 </div>
//               </form>
//             </Dialog.Panel>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default ApplicationInModal;



import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const ApplicationInModal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['scholarship'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  console.log('Data found:', scholarship);
  
  const [formData, setFormData] = useState({
    phone: "",
    photo: null,
    address: { village: "", district: "", country: "" },
    gender: "",
    applyingDegree: "",
    sscResult: "",
    hscResult: "",
    studyGap: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["village", "district", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      Swal.fire({
        icon: "warning",
        title: "Photo Missing",
        text: "Please upload your photo before submitting.",
      });
      return;
    }

    const applicationDetails = {
      ...formData,
      applicant: {
        name: user?.displayName || "Guest",
        email: user?.email || "guest@example.com",
        userId: user?._id || "N/A",
      },
      scholarshipId: scholarship?._id,
      scholarshipName: scholarship?.name,
      scholarshipCategory: scholarship?.category,
      subjectCategory: scholarship?.subject,
      universityName: scholarship?.universityName,
      applicationDate: new Date().toISOString(),
    };

    try {
      const response = await axiosSecure.post("/order", applicationDetails);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your scholarship application has been submitted successfully.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: `An error occurred. Please try again. Error: ${error.message}`,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Apply for Scholarship</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="village"
            value={formData.address.village}
            onChange={handleInputChange}
            placeholder="Village"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
          <input
            type="text"
            name="district"
            value={formData.address.district}
            onChange={handleInputChange}
            placeholder="District"
            className="mt-3 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="mt-3 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Applying Degree</label>
          <select
            name="applyingDegree"
            value={formData.applyingDegree}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">SSC Result</label>
          <input
            type="text"
            name="sscResult"
            value={formData.sscResult}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">HSC Result</label>
          <input
            type="text"
            name="hscResult"
            value={formData.hscResult}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Study Gap (if any)</label>
          <select
            name="studyGap"
            value={formData.studyGap}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
          >
            <option value="">No Gap</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3+ Years">3+ Years</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">University Name</label>
          <input
            type="text"
            value={scholarship.universityName}
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Scholarship Category</label>
          <input
            type="text"
            value={scholarship.category}
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Subject Category</label>
          <input
            type="text"
            value={scholarship.subject}
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Submit / Apply
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ApplicationInModal;
