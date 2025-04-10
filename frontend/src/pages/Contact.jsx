import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Contact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Slightly longer to showcase animation
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
        {/* Animated Contact Icon */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
            <motion.div
              className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-center space-y-2"
        >
          <h3 className="text-xl font-medium text-gray-700">Loading Contact Information</h3>
          <p className="text-gray-500 text-sm">Getting our contact details ready</p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex space-x-2">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: item * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
    >
      <motion.div 
        className='text-center pt-16 pb-12'
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className='text-3xl md:text-4xl text-[#707070]'>
          CONTACT <span className='text-gray-800 font-bold'>US</span>
        </p>
        <motion.div 
          className="w-20 h-1 bg-blue-500 mx-auto mt-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
      </motion.div>

      <motion.div 
        className='flex flex-col md:flex-row gap-12 mb-28 items-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.img 
          className='w-full md:max-w-[400px] rounded-xl shadow-lg'
          src={assets.contact_image} 
          alt="Contact us"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className='flex flex-col gap-8 max-w-md'
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <motion.p 
              className='text-xl font-bold text-gray-700 mb-4'
              whileHover={{ x: 5 }}
            >
              OUR OFFICE
            </motion.p>
            <motion.p 
              className='text-gray-600 leading-7'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Parul University<br /> 
              Vadodara, Gujarat
            </motion.p>
          </div>

          <div>
            <motion.p 
              className='text-gray-600 leading-7'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Tel: +91 7698397153<br /> 
              Email: zeraphic.info@gmail.com
            </motion.p>
          </div>

          <div className='mt-4'>
            <motion.p 
              className='text-xl font-bold text-gray-700 mb-4'
              whileHover={{ x: 5 }}
            >
              CAREERS AT ZERAPHIC
            </motion.p>
            <motion.p 
              className='text-gray-600 mb-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Learn more about our teams and job openings.
            </motion.p>
            <motion.button
              className='border-2 border-black px-8 py-3 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-300 shadow-md'
              onClick={() => { navigate('/jobs'); window.scrollTo(0, 0) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Explore Jobs
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;