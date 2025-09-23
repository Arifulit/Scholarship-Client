import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imageUpload } from "../../api/utils";
import { 
  HiAcademicCap, 
  HiPhone, 
  HiPhotograph, 
  HiUser, 
  HiClipboardList,
  HiTrendingUp,
  HiClock,
  HiOfficeBuilding,
  HiBookOpen,
  HiStar,
  HiPaperAirplane,
  HiExclamationCircle
} from "react-icons/hi";

const ApplicationInModal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const data = useLoaderData();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview URL
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Form validation
  const validateForm = (formData) => {
    const newErrors = {};
    
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phone = "Please enter a valid phone number (minimum 10 digits)";
    }
    
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }
    
    if (!formData.applyingDegree) {
      newErrors.applyingDegree = "Please select the degree you're applying for";
    }
    
    if (!formData.sscResult || isNaN(formData.sscResult) || formData.sscResult < 0 || formData.sscResult > 5) {
      newErrors.sscResult = "Please enter a valid SSC result (0-5 GPA)";
    }
    
    if (!formData.hscResult || isNaN(formData.hscResult) || formData.hscResult < 0 || formData.hscResult > 5) {
      newErrors.hscResult = "Please enter a valid HSC result (0-5 GPA)";
    }
    
    if (!image) {
      newErrors.photo = "Please upload your photo";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = {
      phoneNumber: e.target.phone.value,
      gender: e.target.gender.value,
      applyingDegree: e.target.applyingDegree.value,
      sscResult: e.target.sscResult.value,
      hscResult: e.target.hscResult.value,
      studyGap: e.target.studyGap.value,
    };

    // Validate form
    if (!validateForm(formData)) {
      setIsLoading(false);
      return;
    }

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
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Image Upload Failed",
          text: `An error occurred while uploading the image. Error: ${error.message}`,
          confirmButtonColor: "#10b981",
        });
        return;
      }
    }

    const applicationData = {
      ...formData,
      universityName,
      scholarshipCategory,
      subjectCategory,
      userName,
      userEmail,
      id,
      photoURL,
      applicationDate: new Date().toISOString(),
      status: "pending"
    };

    try {
      const response = await axiosSecure.post("/order", applicationData);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted Successfully!",
          text: "Your scholarship application has been submitted. You will be notified about the status soon.",
          confirmButtonColor: "#10b981",
          showConfirmButton: true,
          timer: 5000
        });
        navigate("/dashboard/my-application");
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: `An error occurred. Please try again. Error: ${error.message}`,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-lime-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <HiAcademicCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Scholarship Application
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Complete your application to get closer to your dream education
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          
          {/* Scholarship Info Header */}
          <div className="bg-gradient-to-r from-lime-500 to-emerald-600 p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <HiOfficeBuilding className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">University</p>
                  <p className="font-semibold">{data.universityName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiBookOpen className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Category</p>
                  <p className="font-semibold">{data.scholarshipCategory}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiStar className="w-5 h-5" />
                <div>
                  <p className="text-sm opacity-90">Subject</p>
                  <p className="font-semibold">{data.subjectCategory}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <HiUser className="w-5 h-5 text-lime-600" />
                    Personal Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Provide your personal details accurately
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <HiPhone className="inline w-4 h-4 mr-2 text-lime-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.phone 
                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <HiExclamationCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <HiPhotograph className="inline w-4 h-4 mr-2 text-lime-600" />
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        onChange={handleFileChange}
                        type="file"
                        name="photo"
                        accept="image/*"
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100 dark:file:bg-lime-900 dark:file:text-lime-300 ${
                          errors.photo 
                            ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                        required
                      />
                    </div>
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-lime-200 dark:border-lime-700">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {errors.photo && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <HiExclamationCircle className="w-4 h-4" />
                      {errors.photo}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.gender 
                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <HiExclamationCircle className="w-4 h-4" />
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <HiClipboardList className="w-5 h-5 text-lime-600" />
                    Academic Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Enter your academic credentials
                  </p>
                </div>

                {/* Applying Degree */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Applying for Degree
                  </label>
                  <select
                    name="applyingDegree"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.applyingDegree 
                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    required
                  >
                    <option value="">Select Degree Level</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor&apos;s Degree</option>
                    <option value="Masters">Master&apos;s Degree</option>
                    <option value="PhD">PhD/Doctorate</option>
                  </select>
                  {errors.applyingDegree && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <HiExclamationCircle className="w-4 h-4" />
                      {errors.applyingDegree}
                    </p>
                  )}
                </div>

                {/* SSC Result */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <HiTrendingUp className="inline w-4 h-4 mr-2 text-lime-600" />
                    SSC Result (GPA)
                  </label>
                  <input
                    type="number"
                    name="sscResult"
                    step="0.01"
                    min="0"
                    max="5"
                    placeholder="Enter SSC GPA (e.g., 4.50)"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.sscResult 
                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    required
                  />
                  {errors.sscResult && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <HiExclamationCircle className="w-4 h-4" />
                      {errors.sscResult}
                    </p>
                  )}
                </div>

                {/* HSC Result */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <HiTrendingUp className="inline w-4 h-4 mr-2 text-lime-600" />
                    HSC Result (GPA)
                  </label>
                  <input
                    type="number"
                    name="hscResult"
                    step="0.01"
                    min="0"
                    max="5"
                    placeholder="Enter HSC GPA (e.g., 4.75)"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      errors.hscResult 
                        ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    required
                  />
                  {errors.hscResult && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <HiExclamationCircle className="w-4 h-4" />
                      {errors.hscResult}
                    </p>
                  )}
                </div>

                {/* Study Gap */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <HiClock className="inline w-4 h-4 mr-2 text-lime-600" />
                    Study Gap (if any)
                  </label>
                  <select
                    name="studyGap"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent hover:border-gray-300 dark:hover:border-gray-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">No Gap</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3+ Years">3+ Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-lime-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <HiPaperAirplane className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                By submitting this application, you agree to our terms and conditions.
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@scholarhub.com" className="text-lime-600 hover:text-lime-700 font-medium">
              support@scholarhub.com
            </a>
          </p>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ApplicationInModal;
