import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className='relative bg-[#395ED6] rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden'>
      {/* Loading Animation */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#395ED6] z-10 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
          />
        </div>
      )}

      <div className='flex flex-col md:flex-row flex-wrap'>
        {/* --------- Header Left --------- */}
        <motion.div 
          className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'
          variants={containerVariants}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
        >
          <motion.p 
            className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'
            variants={itemVariants}
          >
            Book Appointment <br /> With Trusted Physios
          </motion.p>
          
          <motion.div 
            className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'
            variants={itemVariants}
          >
            <motion.img 
              className='w-28' 
              src={assets.group_profiles} 
              alt="Trusted profiles"
              whileHover={{ scale: 1.05 }}
            />
            <p>Simply browse through our extensive list of trusted Physio-theraphist, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
          </motion.div>
          
          <motion.a 
            href='#speciality' 
            className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Book appointment 
            <motion.img 
              className='w-3' 
              src={assets.arrow_icon} 
              alt=""
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          </motion.a>
        </motion.div>

        {/* --------- Header Right --------- */}
        <motion.div 
          className='md:w-1/2 relative'
          variants={imageVariants}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
        >
          <motion.img 
            className='w-full md:absolute bottom-0 h-auto rounded-lg'
            src={assets.header_img} 
            alt="Physiotherapy session"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-20"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  )
}

export default Header;