import React, { useState } from 'react'
import { FaFacebookMessenger } from 'react-icons/fa';
import { GiTreasureMap } from "react-icons/gi";
import {BsMoon, BsSunFill } from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io'
import { Link } from 'react-router-dom';
import TextInput from './TextInput';

const NavBar = () => {
    const [theme, setTheme] = useState(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkScheme ? 'dark' : 'light';
      });
  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 rounded-3xl bg-white'>
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2 bg-primary rounded text-white'>
            <GiTreasureMap />
            </div>
            <span className='text-xl md:text-2xl text-primary font-semibold'>TravelTies</span>
        </Link>

        <form className='hidden md:flex items-center justify-center  w-2/4'>
            <TextInput placeholder="Search" styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3" />
        </form>

        {/* ICONS */}

        <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'> 
        <button >
            {theme==="light"?<BsMoon />:<BsSunFill />}
        </button>
        <div className='hidden lg:flex'>
        <IoMdNotificationsOutline  />
        </div>
        <div>
           <button className='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full bg-white'>logout</button>
        </div>

        </div>
    </div>
  )
}

export default NavBar