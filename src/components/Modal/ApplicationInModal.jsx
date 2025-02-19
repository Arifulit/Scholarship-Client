import  { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageUpload } from "../../api/utils";

const ApplicationInModal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const data = useLoaderData();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  // Handle file input changes
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneNumber = e.target.phone.value;
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

    // Upload the image
    let photoURL = "";
    if (image) {
      try {
        photoURL = await imageUpload(image);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: `An error occurred while uploading the image. Error: ${error.message}`,
        });
        return;
      }
    }

    const applicationData = {
      phoneNumber,
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
      id,
      photoURL,
    };

    try {
      const response = await axiosSecure.post("/order", applicationData);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your scholarship application has been submitted successfully.",
        });
        navigate("/dashboard/my-application");
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
    <div className="max-w-3xl mx-auto p-6 mt-2 shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold  mb-6">Apply for Scholarship</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium ">Phone Number</label>
          <input
            type="text"
            name="phone"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium ">Photo</label>
          <input
            onChange={handleFileChange}
            type="file"
            name="photo"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium ">Applying Degree</label>
          <select
            name="applyingDegree"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
            required
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium ">SSC Result</label>
          <input
            type="text"
            name="sscResult"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium ">HSC Result</label>
          <input
            type="text"
            name="hscResult"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium ">Study Gap (if any)</label>
          <select
            name="studyGap"
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg  "
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
            className="w-full p-2 border rounded-md "
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Scholarship Category</label>
          <input
            type="text"
            value={data.scholarshipCategory}
            className="w-full p-2 border rounded-md "
            readOnly
          />
        </div>
        <div>
          <label className="block font-medium">Subject Category</label>
          <input
            type="text"
            value={data.subjectCategory}
            className="w-full p-2 border rounded-md "
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600  p-3 rounded-lg hover:bg-blue-700"
        >
          Submit / Apply
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ApplicationInModal;
