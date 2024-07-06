import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import api from "../utils/apiIntercepeors";
import TextInput from "./TextInput";
import NoProfile from '../assets/defaultProfile.jpg'
import { FaPen } from "react-icons/fa";
import { handleFileUpload } from "../utils/ImageUploading";

const ProfileModal=({modalIsOpen, setModalIsOpen})=> {
    const [user,setUser]=useState({})
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      bio: "",
      profile_pic: null,
    });

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const response=await api.get('/users/',{params:{userId:localStorage.getItem("userId")}})
                setUser(response.data.data)
                setFormData({
                  first_name:response.data.data.first_name||"",
                  last_name:response.data.data.last_name||"",
                  email:response.data.data.email||"",
                  bio:response.data.data.bio||"",
                  profile_pic:response.data.profile_pic||"",
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser()
    },[modalIsOpen])
    const handleImageUpload=(event)=>{
      const file =event.target.files[0];
      setFormData({
        ...formData,
        profile_pic: file,
      });
  }
  console.log(formData);
  const handleProfileEdit = async () => {
    try {
    const user_id = localStorage.getItem('userId');
    let imageUrl = '';

    if (formData.profile_pic instanceof File) {
      imageUrl = await handleFileUpload(formData.profile_pic);
    }

    const newData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      bio: formData.bio,
      userId: user_id,
      profile_pic: imageUrl,
    };
      console.log(newData,"thisda");
      const response = await api.put('/users/',newData);
      console.log("Profile updated successfully:", response.data);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
    const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4
      }
    }
  };
  return (
    <div className="App">
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="modal-overlay"
          >
            <motion.div
              className="modal"
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex p-4 item-center align-middle justify-between text-xl text-ascente-1 pb-2">
            <p className="font-serif">Edit Profile</p>
          </div>
              <div className="modal-content flex flex-col lg:flex-row md:flex-row xl:flex-row 2xl:flex-row">
                {/* left */}
                <div className="w-1/3">
                <input type="file" id="fileInput" className="hidden" onChange={handleImageUpload} />
                <label htmlFor="fileInput">
                <img src={user.profile_pic|| NoProfile} alt={user.first_name} className="cursor-pointer rounded-full w-32 h-24 lg:w-72 lg:h-44 md:w-72 md:h-44 xl:w-72 xl:h-44 2xl:w-72 2xl:h-44" />
                </label>
                </div>
                {/* {Rigth}    */}
                <div className="w-9/12">
                <form className='p-2 w-full flex flex-col gap-1 justify-center'>
                    <div className="w-full flex flex-col mt-2">
                      <p className="font-light text-sm mb-2 ml-2">First Name</p>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      />
                    </div>
                    <div className="w-full flex flex-col mt-2">
                      <p className="font-light text-sm mb-2 ml-2">Last Name</p>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      />
                    </div>
                    <div className="w-full flex flex-col mt-2">
                      <p className="font-light text-sm mb-2 ml-2">Email Address</p>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="w-full flex flex-col mt-2">
                      <p className="font-light text-sm mb-2 ml-2">Bio</p>
                      <input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        className="bg-secondary bg-opacity-20 border rounded-full border-gray-300 outline-none text-sm font-light px-3 py-3 w-full placeholder:text-[#666]"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      />
                    </div>
                  </form>
                </div>    
              </div>
              <div className="modal-footer">
                <button
                  className="modal-button"
                  onClick={() => setModalIsOpen(false)}
                >
                  Close
                </button>
                <button type="submit" onClick={handleProfileEdit} className="px-4 bg-primary text-white border-none p-1 bg-opacity-85">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileModal
