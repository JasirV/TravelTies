import { motion } from "framer-motion";
import React from "react";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2
    }
  },
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const DotVariants = {
  initial: {
    y: "0%"
  },
  animate: {
    y: "100%"
  }
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut"
};

const Loading=()=>{
  return (
    <div className="pt-20 w-full flex items-center justify-center">
      <motion.div
        className="w-40 h-20 flex justify-around"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="block w-8 h-8 bg-black rounded-full"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block w-8 h-8 bg-black rounded-full"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block w-8 h-8 bg-black rounded-full"
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}


export default Loading