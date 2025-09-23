
import axios from "axios"
// upload image and return image url

export const imageUpload = async (imageData) => {
    try {
        console.log("Starting image upload to ImgBB...");
        console.log("Image file:", imageData);
        console.log("API Key available:", !!import.meta.env.VITE_IMGBB_API_KEY);
        
        if (!import.meta.env.VITE_IMGBB_API_KEY) {
            throw new Error("ImgBB API key is not configured");
        }
        
        const formData = new FormData()
        formData.append("image", imageData)
        
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        
        console.log("ImgBB response:", response.data);
        
        if (response.data.success) {
            console.log("Image uploaded successfully:", response.data.data.display_url);
            return response.data.data.display_url;
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        if (error.response?.status === 400) {
            throw new Error("Invalid image file or ImgBB API key");
        } else if (error.response?.status === 429) {
            throw new Error("Too many upload requests. Please try again later");
        } else {
            throw new Error(error.message || "Failed to upload image");
        }
    }
}

export const saveUser = async (user)=>{
    await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
        {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        }
      )
}