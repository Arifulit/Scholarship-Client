
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
// import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";
// eslint-disable-next-line no-unused-vars
import useAxiosSecure, { axiosSecure } from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const ScholarshipForm = () => {
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityLogo: "",
    universityCountry: "",
    universityCity: "",
    universityRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: "",
    postedUserEmail: "",
  });

  const [image, setImage] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input changes (for uploading university logo)
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Reset the form data after successful submission
  const resetFormData = () => {
    setFormData({
      scholarshipName: "",
      universityName: "",
      universityLogo: "",
      universityCountry: "",
      universityCity: "",
      universityRank: "",
      subjectCategory: "",
      scholarshipCategory: "",
      degree: "",
      tuitionFees: "",
      applicationFees: "",
      serviceCharge: "",
      applicationDeadline: "",
      scholarshipPostDate: "",
      postedUserEmail: "",
    });
    setImage(null);
  };

  // Handle form submission (upload image, submit data)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      Swal.fire({
        title: "Error",
        text: "Please upload a university logo.",
        icon: "error",
      });
      return;
    }
  
    const imageData = new FormData();
    imageData.append("image", image);
  
    try {
      // Log all form data
      console.log("Form Data:", formData);
      console.log("Image File:", image);
  
      // Upload the image to your image upload function/API
      const photoURL = await imageUpload(image);
      console.log(photoURL);
      // Prepare data to submit
      const dataToSubmit = { ...formData, universityLogo: photoURL };
  
    console.log("data",dataToSubmit);
      // Send data to the server (replace with your actual endpoint and token)
     await axiosSecure.post('/scholarship', dataToSubmit);
  
      // Handle success or failure
      
        Swal.fire({
          title: "Success",
          text: "Scholarship added successfully!",
          icon: "success",
        });
        resetFormData();
        navigate('/dashboard/manage-scholarship');
      } 
    
     catch (error) {
      console.error("Error submitting scholarship:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing the form.",
        icon: "error",
      });
    }
  };
  

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Scholarship Name */}
          <div>
            <label className="block  font-semibold mb-2">
              Scholarship Name
            </label>
            <input
              type="text"
              name="scholarshipName"
              value={formData.scholarshipName}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* University Name */}
          <div>
            <label className="block  font-semibold mb-2">
              University Name
            </label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* University Logo */}
          <div>
            <label className="block  font-semibold mb-2">
              University Logo
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* University Country */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              University Country
            </label>
            <input
              type="text"
              name="universityCountry"
              value={formData.universityCountry}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* University City */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              University City
            </label>
            <input
              type="text"
              name="universityCity"
              value={formData.universityCity}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* University Rank */}
          <div>
            <label className="block font-semibold mb-2">
              University Rank
            </label>
            <input
              type="number"
              name="universityRank"
              value={formData.universityRank}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Subject Category */}
          <div>
            <label className="block  font-semibold mb-2">
              Subject Category
            </label>
            <select
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Engineering">Engineering</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>

          {/* Scholarship Category */}
          <div>
            <label className="block font-semibold mb-2">
              Scholarship Category
            </label>
            <select
              name="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
          </div>

          {/* Degree */}
          <div>
            <label className="block  font-semibold mb-2">
              Degree
            </label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
          </div>

          {/* Tuition Fees (Optional) */}
          <div>
            <label className="block  font-semibold mb-2">
              Tuition Fees (Optional)
            </label>
            <input
              type="number"
              name="tuitionFees"
              value={formData.tuitionFees}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Application Fees */}
          <div>
            <label className="block  font-semibold mb-2">
              Application Fees
            </label>
            <input
              type="number"
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Service Charge */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Service Charge
            </label>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Scholarship Post Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Scholarship Post Date
            </label>
            <input
              type="date"
              name="scholarshipPostDate"
              value={formData.scholarshipPostDate}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Posted User Email */}
          <div>
            <label className="block  font-semibold mb-2">
              Posted User Email
            </label>
            <input
              type="email"
              name="postedUserEmail"
              value={formData.postedUserEmail}
              onChange={handleChange}
              className="w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScholarshipForm;
