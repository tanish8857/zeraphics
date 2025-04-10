import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilter();
      setLoading(false);
    }, 1500); // Slightly longer to showcase animation
    return () => clearTimeout(timer);
  }, [doctors, speciality]);

  if (loading) {
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
          <h3 className="text-xl font-medium text-gray-700">Finding Specialists</h3>
          <p className="text-gray-500 text-sm">Loading our network of healthcare professionals</p>
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
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Book Your <span className="text-blue-600">Specialist</span>
          </h1>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Connect with our trusted healthcare professionals
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <motion.div 
            className="lg:w-1/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              onClick={() => setShowFilter(!showFilter)} 
              className={`lg:hidden w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg mb-4 transition-all ${showFilter ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 shadow-sm'}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Filter Specialists
            </motion.button>
            
            <motion.div 
              className={`${showFilter ? 'block' : 'hidden'} lg:block bg-white p-5 rounded-xl shadow-sm border border-gray-200`}
            >
              <h3 className="font-medium text-gray-700 text-lg mb-4 pb-2 border-b border-gray-100">
                Filter by Location
              </h3>
              <div className="space-y-2">
                {['Vadodara', 'Ahmedabad', 'Surat', 'Nadiad', 'Anand'].map((location, index) => (
                  <motion.div
                    key={location}
                    onClick={() => speciality === location ? navigate('/doctors') : navigate(`/doctors/${location}`)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${speciality === location ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.15 }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    {location}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Doctors Grid */}
          <div className="lg:w-4/5">
            {filterDoc.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {filterDoc.map((item, index) => (
                  <motion.div 
                    key={index}
                    onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer"
                    whileHover={{ y: -3 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                        src={item.image} 
                        alt={item.name} 
                      />
                    </div>
                    <div className="p-5">
                      <div className={`flex items-center gap-2 mb-2 ${item.available ? 'text-green-600' : 'text-gray-400'}`}>
                        <span className={`inline-block w-2 h-2 rounded-full ${item.available ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                        <span className="text-sm">{item.available ? 'Available Today' : 'Not Available'}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-gray-500 mb-3">{item.speciality}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{item.experience || '5+ Years'} Experience</span>
                        <span className="text-blue-500 hover:text-blue-700 transition-colors">
                          View Profile →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white rounded-xl p-8 md:p-12 text-center shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-700">No specialists found</h3>
                <p className="mt-2 text-gray-400">We couldn't find any doctors matching your criteria</p>
                <motion.button
                  onClick={() => navigate('/doctors')}
                  className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View All Specialists
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;