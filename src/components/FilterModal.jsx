import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

const FilterModal = ({isOpen,setIsOpen,setFilter}) => {
  
const handleClick=(value)=>{
setFilter(value)
setIsOpen(false)
}
  

  return (
    <div className="relative inline-block text-left">
      <div
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className='flex justify-between m-2'>
            <h3 className='mx-2 flex items-center'>Filter <FaFilter className='mx-1' size={10}/></h3> 
        <IoIosCloseCircle className='text-red-400' size={17} onClick={()=>setIsOpen(false)} />
        </div>
        <div className="py-1">
          <p onClick={()=>{handleClick("dfl")}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Date First to Last</p>
          <p onClick={()=>{handleClick("dlf")}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Date Last to First</p>
        </div>
      </div>
    </div>
  );
};
export default FilterModal