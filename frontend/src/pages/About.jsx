import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Slightly longer to showcase animation
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
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

  const featureCardVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-6">
        {/* Animated Medical Icon */}
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
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
          <h3 className="text-xl font-medium text-gray-700">Loading About Us</h3>
          <p className="text-gray-500 text-sm">Discovering our story and values</p>
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Title Section */}
      <motion.div 
        className="text-center pt-16 pb-10"
        variants={itemVariants}
      >
        <motion.p 
          className="text-3xl md:text-4xl font-light text-gray-600"
          variants={itemVariants}
        >
          ABOUT <span className="text-gray-800 font-semibold">US</span>
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="my-10 flex flex-col md:flex-row gap-12 items-center"
        variants={itemVariants}
      >
        <motion.img
          className="w-full md:max-w-md rounded-xl shadow-lg"
          src={assets.about_image}
          alt="About Zeraphic"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"
          variants={itemVariants}
        >
          <motion.p variants={itemVariants}>
            <b className="text-gray-800 text-lg">
              Connecting Patients with Top Physiotherapists for Convenient and
              Personalized Care
            </b>
            <br />
            <span className="text-base">
              At Zeraphic, we're dedicated to bridging the gap between patients
              and physiotherapists, making it easier for individuals to access
              high-quality care when and where they need it. Our platform allows
              patients to book appointments with top physiotherapists in their
              area, choosing from convenient options like clinic visits or home
              treatments.
            </span>
          </motion.p>

          <motion.div variants={itemVariants}>
            <b className="text-gray-800 text-lg">Our Vision</b>
            <p className="text-base">
              To revolutionize the way patients access physiotherapy services,
              making high-quality care conveniently accessible and personalized to
              their needs.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <b className="text-gray-800 text-lg">Our Mission</b>
            <p className="text-base">
              To bridge the gap between patients and physiotherapists, providing a
              seamless and efficient platform for booking appointments, accessing
              home visits, and receiving top-notch physiotherapy care, ultimately
              improving the health and well-being of our community.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="my-16"
        variants={itemVariants}
      >
        <motion.div 
          className="text-2xl md:text-3xl font-light text-gray-600 mb-10 text-center"
          variants={itemVariants}
        >
          WHY <span className="text-gray-800 font-semibold">CHOOSE US</span> ?
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-20 rounded-xl overflow-hidden shadow-sm"
          variants={containerVariants}
        >
          {[
            {
              title: "EFFICIENCY",
              description: "Streamlined appointment scheduling that fits into your busy lifestyle."
            },
            {
              title: "CONVENIENCE",
              description: "Access to a network of trusted healthcare professionals in your area."
            },
            {
              title: "PERSONALIZATION",
              description: "Tailored recommendations and reminders to help you stay on top of your health."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="border border-gray-100 px-8 py-10 flex flex-col gap-4 hover:bg-[#395ED6] hover:text-white transition-all duration-300 cursor-pointer bg-white"
              variants={featureCardVariants}
              whileHover="hover"
            >
              <b className="text-lg">{feature.title}</b>
              <p className="text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;