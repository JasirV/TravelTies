import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import { IoIosSearch, IoMdAddCircleOutline } from "react-icons/io";
import FilterModal from "./FilterModal";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

const useMenuAnimation = (isOpen) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? ""
          : "",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen]);

  return scope;
};

const NavbarSm = ({ isOpend, setIsOpend,setModalIsOpen,setModalIsOpenContries,setFilter,setSearch }) => {
  const scope = useMenuAnimation(isOpend);
  const [modalOped,setModalOped]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  return (
    <>
    <nav ref={scope} className={`menu bg-white rounded-3xl mt-2 ${isOpend ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        style={{
            position: "fixed",
            bottom: -210,
            left: 200,
            width: 100,
            height: 100,
            background: "white",
        }}
      />
      <motion.button
        className="hidden"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpend(!isOpend)}
      >
        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
          <svg width="15" height="15">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </div>
      </motion.button>
      {!modalOped&&(
          <ul
          style={{
              clipPath: isOpend ? "inset(10% 50% 90% 50% round 10px)" : "",
            }}
            className="p-4 flex-col gap-2 "
            > 
        <li className="flex justify-between  p-2" onClick={()=>{setModalIsOpen(true),setModalOped(true)}}>Edit Profile <MdEdit /></li>
        <li className="flex justify-between  p-2" onClick={()=>{setModalIsOpenContries(true),setModalOped(true)}}>Add Countries <IoMdAddCircleOutline /></li>
        <li className="flex justify-between p-2" onClick={()=>{setIsOpen(true),setModalOped(true)}}>Filter <FaFilter /></li>
        <li className="flex justify-between p-2">
          <input
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
            className="border w-9/12 rounded-full bg-secondary bg-opacity-30 p-1 px-5 "
            placeholder="Search"
          />
          <IoIosSearch />
        </li>
      </ul>
      )}
    </nav>
<FilterModal setIsOpen={setIsOpen} isOpen={isOpen} setFilter={setFilter}/>
    </>
  );
};

export default NavbarSm;
