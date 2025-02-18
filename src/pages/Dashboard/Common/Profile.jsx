import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user , loding} = useAuth();
  const [role, isLoading] = useRole()
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localUser, setLocalUser] = useState(user); // Local state for user
  const [selectedImage, setSelectedImage] = useState(null); // Local state for uploaded image preview

  if ( loding, isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Include the image in the form data
    if (selectedImage) {
      formData.append("photoURL", selectedImage);
    }

    const updatedData = Object.fromEntries(formData);

    // Update locally
    setLocalUser((prev) => ({
      ...prev,
      displayName: updatedData.displayName,
      email: updatedData.email,
      photoURL: selectedImage ? URL.createObjectURL(selectedImage) : prev.photoURL, // Use preview URL for immediate update
    }));

   

    closeModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };


  

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={localUser.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {localUser.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black">{localUser.displayName}</span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">{localUser.email}</span>
              </p>

              <div>
                <button
                  className="bg-lime-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1"
                  onClick={openModal}
                >
                  Update Profile
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Update Profile</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  defaultValue={localUser.displayName}
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={localUser.email}
                  className="mt-1 p-2 w-full border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="photoURL"
                  id="photoURL"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 p-2 w-full border rounded-lg"
                />
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="mt-4 w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-lime-500 px-4 py-2 rounded-lg text-white hover:bg-lime-700"
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



