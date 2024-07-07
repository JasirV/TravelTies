import React, { useState } from 'react'
import { GiTreasureMap } from "react-icons/gi";
import {IoMdNotificationsOutline} from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowDownLong } from "react-icons/fa6";
import NavbarSm from './NavbarSm';
import { CiFilter } from "react-icons/ci";
import FilterModal from './FilterModal';

const NavBar = ({setModalIsOpen,setModalIsOpenContries,setSearch,isOpen,setIsOpen,setFilter}) => {
const [isOpend, setIsOpend] = useState(false);
const navigate=useNavigate()
const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 rounded-3xl bg-white'>
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2 bg-primary rounded text-white'>
            <GiTreasureMap />
            </div>
            <span className='text-xl md:text-2xl text-primary font-semibold'>TravelTies</span>
        </Link>

        <form className='hidden md:flex items-center justify-center  w-2/4'>
            <input placeholder="Search" onChange={(e)=>setSearch(e.target.value)} className="w-[18rem] lg:w-[38rem] rounded-full py-3 outline-none text-sm font-light px-3 bg-secondary bg-opacity-25 border border-gray-100" />
        </form>

        {/* ICONS */}

        <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'> 
        <div className='flex lg:hidden' >
        <FaArrowDownLong size={15} onClick={()=>setIsOpend(!isOpend)} className={isOpen ? 'rotate-180' : ''}/>
        </div>
        <div className='hidden lg:flex'>
        <CiFilter onClick={()=>{setIsOpen(!isOpen)}} />
        {isOpen&&<FilterModal isOpen={isOpen} setIsOpen={setIsOpen} setFilter={setFilter}/> }
        </div>
        <div className='hidden lg:flex'>
        <IoMdNotificationsOutline  />
        </div>
        <div>
           <button onClick={handleLogout} className='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full bg-white'>logout</button>
        </div>
        </div>
    </div>
    {isOpend&&(
        <NavbarSm setSearch={setSearch} setIsOpend={setIsOpend} setFilter={setFilter} isOpend={isOpend} setModalIsOpen={setModalIsOpen} setModalIsOpenContries={setModalIsOpenContries}/>
    )}
    </>
  )
}

export default NavBar