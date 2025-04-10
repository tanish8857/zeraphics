import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Jobs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
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
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Jobs at <span className="text-blue-600">Zeraphics</span>
        </motion.h1>
        <motion.div
          className="w-24 h-1 bg-blue-500 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="flex flex-col lg:flex-row gap-12 items-center mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.img
          className="w-full lg:max-w-md rounded-xl shadow-lg"
          src={assets.job_image}
          alt="Zeraphics Team"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="lg:w-1/2 space-y-6 text-gray-600"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            At Zeraphics, we take pride in fostering a dynamic and inclusive
            work culture that promotes collaboration, innovation, and personal
            growth. Our workspace is designed to encourage creativity and open
            communication, where every team member feels valued and empowered to
            contribute their ideas. We believe in maintaining a healthy
            work-life balance and offering flexible opportunities that allow our
            employees to thrive both professionally and personally{" "}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              A place to grow.
            </h3>
            <p>
            At Zeraphics, we are united by a shared passion for improving
            healthcare through technology, and together, we are building a
            supportive and forward-thinking environment where everyone can
            excel.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Openings Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-700 mb-8 text-center"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.9 }}
        >
          Current Openings at <span className="text-blue-600">Zeraphics</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            {
              title: "WEB DEVELOPER INTERN",
              openings: "2",
              description: "",
            },
            {
              title: "SOCIAL MEDIA INTERN",
              openings: "3",
              description: "",
            },
            {
              title: "MANAGEMENT INTERN",
              openings: "2",
              description: "",
            },
          ].map((job, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 p-8 flex flex-col gap-4 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <h3 className="font-bold text-lg group-hover:text-white">
                {job.title}
              </h3>
              <p className="text-sm group-hover:text-blue-100">
                Current Opening: {job.openings}
              </p>
              <p className="text-sm group-hover:text-blue-100">
                {job.description}
              </p>
              <motion.button
                className="mt-4 text-sm font-medium text-blue-600 group-hover:text-white self-start"
                whileHover={{ x: 5 }}
              >
                Mail us → zeraphic.hr@gmail.com
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Jobs;
