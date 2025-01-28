
import "react-toastify/dist/ReactToastify.css";

import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";


const ApplicationInModal = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();
   const data = useLoaderData()
   const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   const phoneNumber = e.target.phone.value;
   const photo = e.target.photo.files[0];
   const gender = e.target.gender.value;
   const applyingDegree = e.target.applyingDegree.value;
   const sscResult = e.target.sscResult.value;
   const hscResult = e.target.hscResult.value;
   const studyGap = e.target.studyGap.value;
   const universityName = data.universityName;
   const scholarshipCategory = data.scholarshipCategory;
   const subjectCategory = data.subjectCategory;
   const userName = user?.displayName;
   const userEmail = user?.email;
   const id = data.id;



 const applicationData = {
      phoneNumber,
      photo,
      gender,
      applyingDegree,
      sscResult,
      hscResult,
      studyGap,
      universityName,
      scholarshipCategory,
      subjectCategory,
      userName,
      userEmail,
      id
 
 }



    try {
      const response = await axiosSecure.post("/order", applicationData); 

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your scholarship application has been submitted successfully.",
        });
        navigate("dashboard/my-application");

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
            
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            name="photo"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            
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
            
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">HSC Result</label>
          <input
            type="text"
            name="hscResult"
           
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Study Gap (if any)</label>
          <select
            name="studyGap"
            
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
            value={data.universityName}
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Scholarship Category</label>
          <input
            type="text"
            value={data.scholarshipCategory}
            
            className="w-full p-2 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Subject Category</label>
          <input
            type="text"
            value={data.subjectCategory}
            
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








