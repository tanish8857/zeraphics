import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hover: { 
      x: 5,
      color: "#3b82f6",
      transition: { duration: 0.2 }
    }
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-10 px-4 md:px-10">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-14">
          {/* About Section */}
          <div>
            <motion.img 
              className="mb-5 w-40" 
              src={assets.logo} 
              alt="Company Logo"
              whileHover={{ scale: 1.03 }}
            />
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              Our goal is to empower individuals to take control of their health
              and well-being, providing a seamless and efficient experience from
              start to finish.
            </p>
            <div className="flex gap-4 mt-6">
  {[ 
    { icon: assets.instagram, link: "https://www.instagram.com/zeraphic.health?igsh=NmowZHo4d2RubnVh" },
    { icon: assets.linkedin, link: "https://www.linkedin.com/company/zeraphic-health/" }
  ].map((item, index) => (
    <motion.a 
      key={index}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={item.icon} alt="Social icon" className="w-5 h-5" />
    </motion.a>
  ))}
</div>

          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-medium mb-5 text-gray-800">COMPANY</h3>
            <ul className="flex flex-col gap-3 text-gray-600">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "All Doctors", path: "/doctors" },
                { name: "Career", path: "/jobs" },
                { name: "Privacy policy", path: "/privacy-policy" }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <a href={link.path} className="block">{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-medium mb-5 text-gray-800">GET IN TOUCH</h3>
            <ul className="flex flex-col gap-3 text-gray-600">
              <motion.li
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 76983 97153
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover="hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                zeraphic.info@gmail.com
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <hr className="border-gray-200" />
          <p className="py-5 text-sm text-center text-gray-500">
            Copyright © 2025 zeraphics.in - All Rights Reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;