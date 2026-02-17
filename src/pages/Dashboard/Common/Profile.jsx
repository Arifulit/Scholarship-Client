

import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaEdit, FaUser, FaEnvelope, FaIdCard, FaCamera, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState(user || {});
  const [selectedImage, setSelectedImage] = useState(null);

  // Update localUser when user changes
  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No User Data Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please login to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (selectedImage) {
      formData.append("photoURL", selectedImage);
    }

    const updatedData = Object.fromEntries(formData);

    setLocalUser((prev) => ({
      ...prev,
      displayName: updatedData.displayName,
      email: updatedData.email,
      photoURL: selectedImage ? URL.createObjectURL(selectedImage) : prev.photoURL,
    }));

    closeModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin": return "bg-gradient-to-r from-red-500 to-pink-500";
      case "moderator": return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "student": return "bg-gradient-to-r from-green-500 to-emerald-500";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="flex-1 py-4">
      <Helmet>
        <title>Profile | Scholarship Platform</title>
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Cover Photo */}
          <div className="relative h-64 md:h-80">
            <img
              alt="cover photo"
              src={coverImg}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  alt="profile"
                  src={localUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser.displayName || 'User')}&background=6366f1&color=fff&size=128`}
                  className="w-32 h-32 rounded-full object-cover border-6 border-white dark:border-gray-800 shadow-xl"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser.displayName || 'User')}&background=6366f1&color=fff&size=128`;
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg ${getRoleBadgeColor()}`}>
                  <FaUser className="w-4 h-4 mr-2" />
                  {role?.charAt(0).toUpperCase() + role?.slice(1)}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {localUser.displayName || "User Name"}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
                <FaIdCard className="w-4 h-4 mr-2" />
                User ID: {localUser.uid || "N/A"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Personal Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaUser className="w-5 h-5 mr-2 text-indigo-600" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white dark:bg-gray-600 rounded-xl">
                    <FaUser className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{localUser.displayName || "User Name"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white dark:bg-gray-600 rounded-xl">
                    <FaEnvelope className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{localUser.email || "user@example.com"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaIdCard className="w-5 h-5 mr-2 text-purple-600" />
                  Account Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white dark:bg-gray-600 rounded-xl">
                    <div className={`w-3 h-3 rounded-full mr-3 ${getRoleBadgeColor()}`}></div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">{role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white dark:bg-gray-600 rounded-xl">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
                      <p className="font-semibold text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={openModal}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FaEdit className="w-5 h-5 mr-2" />
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update Profile
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              {/* Profile Picture Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : (localUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser.displayName || 'User')}&background=6366f1&color=fff&size=96`)}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                    onError={(e) => {
                      if (!selectedImage) {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser.displayName || 'User')}&background=6366f1&color=fff&size=96`;
                      }
                    }}
                  />
                  <label
                    htmlFor="photoURL"
                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 cursor-pointer shadow-lg transition-colors"
                  >
                    <FaCamera className="w-4 h-4" />
                  </label>
                  <input
                    type="file"
                    name="photoURL"
                    id="photoURL"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Click camera icon to change photo
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="displayName"
                      id="displayName"
                      defaultValue={localUser.displayName || ""}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={localUser.email || ""}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
