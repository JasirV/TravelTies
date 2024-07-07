import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactFlagsSelect from "react-flags-select";
import "../App.css";
import { IoMdCloseCircle } from "react-icons/io";
import api from "../utils/apiIntercepeors";
const ContriesModal = ({modalIsOpenContries,setModalIsOpenContries,countriesFetching}) => {
  const [selected, setSelected] = useState([]);
  const [countries,setCountries]=useState([])

  useEffect(()=>{
    const fetchflags=async()=>{
        try {
            const response=await api.get('/countries/')
            setCountries(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchflags()
  },[])
  const handleSelect = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };
  const handleSubmt=async()=>{
    try {
      const userId=localStorage.getItem('userId')
      const response=await api.patch(`/users/${userId}`,{selected})
      if(response.status===200){
        setModalIsOpenContries(false)
        countriesFetching()
      }
    } catch (error) {
      console.error(error);
    }
  }
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };


  return (
    <div className="App" >
      <AnimatePresence>
        {modalIsOpenContries && (
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
            ><div className="flex p-4 item-center align-middle justify-between text-xl text-ascente-1 pb-2">
            <p className="font-serif">Select Countrys</p>
            <IoMdCloseCircle className="text-red-400" onClick={()=>setModalIsOpenContries(false)} />
          </div>
          
          <div className="selected-items-container flex gap-2 px-3 border  rounded-full p-1 overflow-auto">
        {selected && (
          selected.map((i) => (
            <div key={i} className="selected-item ">
            <p>{i}</p>
             </div>
              ))
             )}
             </div>

          <div className="scroll-container flex flex-wrap p-5">
            {countries?.map((i)=>(
                <img src={i?.img}  key={i._id} alt={i?.code} className="w-12" onClick={()=>{handleSelect(i?.name)}} />
            ))}
          </div>
          <div className="modal-footer">
                <button
                  className="modal-button"
                  onClick={() => setModalIsOpenContries(false)}
                >
                  Close
                </button>
                <button type="submit" onClick={handleSubmt} className="px-4 bg-primary text-white border-none p-1 bg-opacity-85">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContriesModal;
