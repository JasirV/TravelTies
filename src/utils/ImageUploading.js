import axios from 'axios';

 
export const handleFileUpload = async (uploadFile) => {
    try {
        const formData = new FormData(); 
        formData.append('file', uploadFile);
        formData.append('upload_preset', 'socialmedia');
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_ID}/image/upload`,
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    };