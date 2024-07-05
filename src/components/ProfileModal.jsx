import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import api from "../utils/apiIntercepeors";
import TextInput from "./TextInput";
import NoProfile from '../assets/defaultProfile.jpg'
import { FaPen } from "react-icons/fa";

const ProfileModal=({modalIsOpen, setModalIsOpen})=> {
    const [user,setUser]=useState({})

    useEffect(()=>{
        const fetchUser=async()=>{
            try {
                const response=await api.get('/users/',{params:{userId:localStorage.getItem("userId")}})
                setUser(response.data.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser()
    },[])
console.log(user);
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
                <div className="w-1/3 relative">
                <input type="file" className="hidden" />
                <img src={user.profile_pic || NoProfile} alt={user.first_name} className="rounded-full w-32 h-24 lg:w-72 lg:h-44 md:w-72 md:h-44 xl:w-72 xl:h-44 2xl:w-72 2xl:h-44 " />
                <div className="absolute top-36 right-8 -mb-1 -mr-1 bg-white p-1 rounded-full">
                <FaPen className="text-gray-600 w-4 h-4 hidden lg:flex" />
                </div>
                </div>
                {/* {Rigth}    */}
                <div className="w-9/12">
                <form className='p-2 w-full flex flex-col gap-1 justify-center'>
              <TextInput name="firstName" placeholder="FirstName" label="First Name" type="fristName" styles='w-full rounded-full' labelStyle='ml-2'  />
              <TextInput name="lastName" placeholder="Last Name" label="Last Name" type="lastName" sterstyles='w-full rounded-full' labelStyle='ml-2' />
              <TextInput name="email" placeholder="email@example.com" label="Email Address" type="email" styles='w-full rounded-full' labelStyle='ml-2'  />
              <TextInput name="bio" placeholder="bio" label="Bio" type="text" styles='w-full rounded-full' labelStyle='ml-2'  />
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
                <button className="px-4 bg-primary text-white border-none p-1 bg-opacity-85">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileModal
