import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import {
  FaGraduationCap,
  FaUniversity,
  FaGlobe,
  FaMapMarkerAlt,
  FaTag,
  FaCalendarAlt,
  FaDollarSign,
  FaUpload,
  FaSave,
  FaTimes,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

// Utility function to handle errors
const handleError = (error) => {
  let errorMessage = "An error occurred while processing the form.";

  if (error.message === "Network Error") {
    errorMessage = "Cannot connect to the server. Please check your internet connection.";
  } else if (error.response?.status === 404) {
    errorMessage = "API endpoint not found. Please check server configuration.";
  } else if (error.response?.status === 500) {
    errorMessage = "Server error. Please try again later.";
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  }

  return errorMessage;
};

// FormField Component
const FormField = ({ label, icon: Icon, children, required = false, error = null, id }) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
    >
      <Icon className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && (
      <div
        id={`${id}-error`}
        className="flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
      >
        <FaInfoCircle className="w-3 h-3 mr-1" />
        {error}
      </div>
    )}
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
};

// Main ScholarshipForm Component
const ScholarshipForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    postedUserEmail: user?.email || "",
  });

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize default dates and user email
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setFormData((prev) => ({
      ...prev,
      scholarshipPostDate: today.toISOString().split("T")[0],
      applicationDeadline: nextWeek.toISOString().split("T")[0],
      postedUserEmail: user?.email || prev.postedUserEmail,
    }));
  }, [user?.email]);



  // Form validation
 const validateForm = () => {
    const newErrors = {};

    if (!formData.scholarshipName.trim()) {
      newErrors.scholarshipName = "Scholarship name is required.";
    }
    if (!formData.universityName.trim()) {
      newErrors.universityName = "University name is required.";
    }
    if (!formData.universityCountry.trim()) {
      newErrors.universityCountry = "University country is required.";
    }
    if (!formData.universityCity.trim()) {
      newErrors.universityCity = "University city is required.";
    }
    if (!formData.universityRank || formData.universityRank < 1) {
      newErrors.universityRank = "Valid university rank is required.";
    }
    if (!formData.subjectCategory) {
      newErrors.subjectCategory = "Subject category is required.";
    }
    if (!formData.scholarshipCategory) {
      newErrors.scholarshipCategory = "Scholarship category is required.";
    }
    if (!formData.degree) {
      newErrors.degree = "Degree level is required.";
    }
    if (!formData.applicationFees || formData.applicationFees < 0) {
      newErrors.applicationFees = "Valid application fee is required.";
    }
    if (!formData.serviceCharge || formData.serviceCharge < 0) {
      newErrors.serviceCharge = "Valid service charge is required.";
    }
    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = "Application deadline is required.";
    } else {
      const deadlineDate = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate <= today) {
        newErrors.applicationDeadline = "Deadline must be in the future.";
      }
    }
    if (!formData.scholarshipPostDate) {
      newErrors.scholarshipPostDate = "Post date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 10 * 1024 * 1024) {
      Swal.fire({
        title: "File Too Large",
        text: "Please select an image smaller than 10MB.",
        icon: "warning",
        background: "#1f2937",
        color: "#fff",
      });
      return;
    }

    if (file && !file.type.startsWith("image/")) {
      Swal.fire({
        title: "Invalid File Type",
        text: "Please select a valid image file.",
        icon: "warning",
        background: "#1f2937",
        color: "#fff",
      });
      return;
    }

    setImage(file);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Reset form data
  const resetFormData = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

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
      applicationDeadline: nextWeek.toISOString().split("T")[0],
      scholarshipPostDate: today.toISOString().split("T")[0],
      postedUserEmail: user?.email || "",
    });
    setImage(null);
    setImagePreview(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: "Validation error",
        text: "Please fill all fields correctly.",
        icon: "warning",
        background: "#1f2937",
        color: "#fff",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoURL = "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop&crop=center";

      if (image && import.meta.env.VITE_IMGBB_API_KEY) {
        try {
          photoURL = await imageUpload(image);
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
        }
      }

      const dataToSubmit = {
        scholarshipName: formData.scholarshipName,
        universityName: formData.universityName,
        universityCountry: formData.universityCountry,
        universityCity: formData.universityCity,
        universityRank: parseInt(formData.universityRank) || 0,
        subjectCategory: formData.subjectCategory,
        scholarshipCategory: formData.scholarshipCategory,
        degree: formData.degree,
        tuitionFees: parseFloat(formData.tuitionFees) || 0,
        applicationFees: parseFloat(formData.applicationFees) || 0,
        serviceCharge: parseFloat(formData.serviceCharge) || 0,
        applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
        scholarshipPostDate: new Date(formData.scholarshipPostDate).toISOString(),
        postedUserEmail: formData.postedUserEmail,
        universityLogo: photoURL,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active",
      };

      await axiosSecure.post("/scholarship", dataToSubmit);

      Swal.fire({
        title: "Success",
        text: "Scholarship submitted successfully!",
        icon: "success",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#10b981",
      });

      resetFormData();
      // navigate("/dashboard/manage-scholarship"); // Uncomment if navigation is needed
    } catch (error) {
      console.error("Error submitting scholarship:", error);
      const errorMessage = handleError(error);
      Swal.fire({
        title: "এরর",
        text: errorMessage,
        icon: "error",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic Information Section Component
  const BasicInformationSection = () => (
    <div className="space-y-8">
      <div className="flex items-center pb-6 border-b-2 border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg mr-4">
          <FaGraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Enter the fundamental details about the scholarship
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField label="Scholarship Name" icon={FaGraduationCap} required error={errors.scholarshipName} id="scholarshipName">
          <input
            type="text"
            name="scholarshipName"
            id="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.scholarshipName ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., International Excellence Scholarship"
            required
            aria-describedby={errors.scholarshipName ? "scholarshipName-error" : undefined}
          />
        </FormField>
        <FormField label="University Name" icon={FaUniversity} required error={errors.universityName} id="universityName">
          <input
            type="text"
            name="universityName"
            id="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.universityName ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., Harvard University"
            required
            aria-describedby={errors.universityName ? "universityName-error" : undefined}
          />
        </FormField>
        <FormField label="University Country" icon={FaGlobe} required error={errors.universityCountry} id="universityCountry">
          <input
            type="text"
            name="universityCountry"
            id="universityCountry"
            value={formData.universityCountry}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.universityCountry ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., United States"
            required
            aria-describedby={errors.universityCountry ? "universityCountry-error" : undefined}
          />
        </FormField>
        <FormField label="University City" icon={FaMapMarkerAlt} required error={errors.universityCity} id="universityCity">
          <input
            type="text"
            name="universityCity"
            id="universityCity"
            value={formData.universityCity}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.universityCity ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., Cambridge"
            required
            aria-describedby={errors.universityCity ? "universityCity-error" : undefined}
          />
        </FormField>
        <FormField label="University Rank" icon={FaTag} required error={errors.universityRank} id="universityRank">
          <input
            type="number"
            name="universityRank"
            id="universityRank"
            value={formData.universityRank}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.universityRank ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., 1"
            min="1"
            required
            aria-describedby={errors.universityRank ? "universityRank-error" : undefined}
          />
        </FormField>
        <FormField label="Posted User Email" icon={FaGraduationCap} required id="postedUserEmail">
          <input
            type="email"
            name="postedUserEmail"
            id="postedUserEmail"
            value={formData.postedUserEmail}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300"
            placeholder="Enter your email"
            readOnly={!!user?.email}
            required
            aria-describedby="postedUserEmail-info"
          />
          <p id="postedUserEmail-info" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ℹ️ Email is auto-filled from your account
          </p>
        </FormField>
      </div>
      <FormField label="University Logo (Optional)" icon={FaUpload} error={errors.image} id="universityLogo">
        <div
          className={`border-3 border-dashed rounded-2xl p-8 hover:border-indigo-500 transition-all duration-300 ${errors.image ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10"}`}
        >
          <div className="text-center relative">
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="University logo preview"
                  className="w-40 h-40 object-contain rounded-2xl mx-auto mb-4 shadow-lg border-4 border-white dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg transform hover:scale-110"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <FaUpload className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg font-medium">
                  Click to upload university logo (Optional)
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG up to 10MB • Recommended: 512x512px
                </p>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload university logo"
            />
          </div>
        </div>
      </FormField>
    </div>
  );

  // Academic Information Section Component
  const AcademicInformationSection = () => (
    <div className="space-y-8">
      <div className="flex items-center pb-6 border-b-2 border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg mr-4">
          <FaGraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Information</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Select the academic category and degree level
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FormField label="Subject Category" icon={FaTag} required error={errors.subjectCategory} id="subjectCategory">
          <select
            name="subjectCategory"
            id="subjectCategory"
            value={formData.subjectCategory}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.subjectCategory ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            required
            aria-describedby={errors.subjectCategory ? "subjectCategory-error" : undefined}
          >
            <option value="">Select Category</option>
            <option value="Agriculture">🌾 Agriculture</option>
            <option value="Engineering">⚙️ Engineering</option>
            <option value="Doctor">🩺 Doctor</option>
            <option value="Business">💼 Business</option>
            <option value="Computer Science">💻 Computer Science</option>
            <option value="Arts">🎨 Arts</option>
          </select>
        </FormField>
        <FormField label="Scholarship Category" icon={FaTag} required error={errors.scholarshipCategory} id="scholarshipCategory">
          <select
            name="scholarshipCategory"
            id="scholarshipCategory"
            value={formData.scholarshipCategory}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.scholarshipCategory ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            required
            aria-describedby={errors.scholarshipCategory ? "scholarshipCategory-error" : undefined}
          >
            <option value="">Select Category</option>
            <option value="Full fund">💰 Full fund</option>
            <option value="Partial">💵 Partial</option>
            <option value="Self-fund">💳 Self-fund</option>
          </select>
        </FormField>
        <FormField label="Degree" icon={FaGraduationCap} required error={errors.degree} id="degree">
          <select
            name="degree"
            id="degree"
            value={formData.degree}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.degree ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            required
            aria-describedby={errors.degree ? "degree-error" : undefined}
          >
            <option value="">Select Degree</option>
            <option value="Diploma">📜 Diploma</option>
            <option value="Bachelor">🎓 Bachelor</option>
            <option value="Masters">🎖️ Masters</option>
            <option value="PhD">👨‍🎓 PhD</option>
          </select>
        </FormField>
      </div>
    </div>
  );

  // Financial Information Section Component
  const FinancialInformationSection = () => (
    <div className="space-y-8">
      <div className="flex items-center pb-6 border-b-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-700 dark:to-emerald-700">
        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg mr-4">
          <FaDollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Information</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Set the scholarship fees and charges
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FormField label="Tuition Fees (Optional)" icon={FaDollarSign} id="tuitionFees">
          <input
            type="number"
            name="tuitionFees"
            id="tuitionFees"
            value={formData.tuitionFees}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
            placeholder="e.g., 50000"
            min="0"
            aria-describedby="tuitionFees-info"
          />
          <p id="tuitionFees-info" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ℹ️ Enter tuition fees if applicable
          </p>
        </FormField>
        <FormField label="Application Fees" icon={FaDollarSign} required error={errors.applicationFees} id="applicationFees">
          <input
            type="number"
            name="applicationFees"
            id="applicationFees"
            value={formData.applicationFees}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.applicationFees ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., 100"
            min="0"
            required
            aria-describedby={errors.applicationFees ? "applicationFees-error" : undefined}
          />
        </FormField>
        <FormField label="Service Charge" icon={FaDollarSign} required error={errors.serviceCharge} id="serviceCharge">
          <input
            type="number"
            name="serviceCharge"
            id="serviceCharge"
            value={formData.serviceCharge}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.serviceCharge ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            placeholder="e.g., 50"
            min="0"
            required
            aria-describedby={errors.serviceCharge ? "serviceCharge-error" : undefined}
          />
        </FormField>
      </div>
    </div>
  );

  // Dates Section Component
  const DatesSection = () => (
    <div className="space-y-8">
      <div className="flex items-center pb-6 border-b-2 border-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-700">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg mr-4">
          <FaCalendarAlt className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Important Dates</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Set the application deadline and post date
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField label="Application Deadline" icon={FaCalendarAlt} required error={errors.applicationDeadline} id="applicationDeadline">
          <input
            type="date"
            name="applicationDeadline"
            id="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.applicationDeadline ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            required
            aria-describedby={errors.applicationDeadline ? "applicationDeadline-error" : "applicationDeadline-info"}
          />
          <p id="applicationDeadline-info" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ℹ️ Deadline must be at least tomorrow
          </p>
        </FormField>
        <FormField label="Scholarship Post Date" icon={FaCalendarAlt} required error={errors.scholarshipPostDate} id="scholarshipPostDate">
          <input
            type="date"
            name="scholarshipPostDate"
            id="scholarshipPostDate"
            value={formData.scholarshipPostDate}
            onChange={handleChange}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 ${errors.scholarshipPostDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            max={new Date().toISOString().split("T")[0]}
            required
            aria-describedby={errors.scholarshipPostDate ? "scholarshipPostDate-error" : "scholarshipPostDate-info"}
          />
          <p id="scholarshipPostDate-info" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            ℹ️ Post date should be today or in the past
          </p>
        </FormField>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8 px-4 transition-all duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl">
            <FaGraduationCap className="w-10 h-10 text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <FaCheckCircle className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Add New Scholarship
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Create a new scholarship opportunity for students worldwide
          </p>
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <div className="w-8 h-1 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
            <div className="w-3 h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>
            <div className="w-8 h-1 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
            <div className="w-3 h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">

          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            <BasicInformationSection />
            <AcademicInformationSection />
            <FinancialInformationSection />
            <DatesSection />
            <div className="pt-8 border-t-2 border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-700 dark:to-purple-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to cancel? All data will be lost.")) {
                      resetFormData();
                      navigate("/dashboard");
                    }
                  }}
                  className="flex items-center justify-center px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <FaTimes className="w-5 h-5 mr-3" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  )}
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Scholarship...
                    </>
                  ) : (
                    <>
                      <FaSave className="w-5 h-5 mr-3" />
                      Add Scholarship
                    </>
                  )}
                </button>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <div className="flex items-start">
                  <FaInfoCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-indigo-700 dark:text-indigo-300">
                    <p className="font-medium mb-1">Before submitting:</p>
                    <ul className="space-y-1 text-indigo-600 dark:text-indigo-400">
                      <li>• Double-check all information for accuracy</li>
                      <li>• Ensure the university logo is clear and properly sized</li>
                      <li>• Verify that all required fields are completed</li>
                      <li>• Make sure dates are correct and deadline is in the future</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipForm;