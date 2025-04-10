import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const filteredAppointments = appointments.filter(app => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return !app.cancelled && !app.isCompleted;
    if (activeTab === 'completed') return app.isCompleted;
    if (activeTab === 'cancelled') return app.cancelled;
    return true;
  });

  return (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-6'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className='text-2xl font-bold text-gray-800'>Appointment Management</h2>
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Appointments
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden'>
          {/* Table Header */}
          <motion.div 
            className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_1fr_1.5fr] gap-4 py-4 px-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <p className='text-gray-600 font-medium text-sm'>#</p>
            <p className='text-gray-600 font-medium text-sm'>Patient Details</p>
            <p className='text-gray-600 font-medium text-sm'>Payment</p>
            <p className='text-gray-600 font-medium text-sm'>Age</p>
            <p className='text-gray-600 font-medium text-sm'>Date & Time</p>
            <p className='text-gray-600 font-medium text-sm'>Fees</p>
            <p className='text-gray-600 font-medium text-sm'>Status</p>
          </motion.div>

          {/* Appointments List */}
          <div className='max-h-[65vh] overflow-y-auto'>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-wrap justify-between max-sm:gap-4 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_1fr_1.5fr] gap-4 items-center py-4 px-6 border-b hover:bg-blue-50/30 transition-colors ${item.cancelled ? 'bg-red-50/30' : item.isCompleted ? 'bg-green-50/30' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <p className='max-sm:hidden text-gray-500 font-medium'>{index + 1}</p>
                  
                  <div className='flex items-center gap-3'>
                    <img 
                      src={item.userData.image || assets.user_icon} 
                      className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm' 
                      alt="Patient" 
                    />
                    <div>
                      <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                      <p className='text-xs text-gray-500'>{item.userData.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.payment ? 'Online Paid' : 'Cash Payment'}
                    </span>
                  </div>
                  
                  <p className='text-gray-600'>{calculateAge(item.userData.dob)} yrs</p>
                  
                  <div className='text-gray-600'>
                    <p className='font-medium'>{slotDateFormat(item.slotDate)}</p>
                    <p className='text-sm'>{item.slotTime}</p>
                  </div>
                  
                  <p className='text-gray-800 font-medium'>{currency}{item.amount}</p>
                  
                  <div className='flex items-center gap-2'>
                    {item.cancelled ? (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Completed
                      </span>
                    ) : (
                      <>
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2'>
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Upcoming
                        </span>
                        <div className='flex gap-2'>
                          <motion.button
                            onClick={() => cancelAppointment(item._id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors'
                            title="Cancel Appointment"
                          >
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.button>
                          <motion.button
                            onClick={() => completeAppointment(item._id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors'
                            title="Complete Appointment"
                          >
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className='flex flex-col items-center justify-center py-12'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img 
                  src={assets.empty_icon} 
                  className='w-24 h-24 mb-4 opacity-70' 
                  alt="No appointments" 
                />
                <h3 className='text-lg font-medium text-gray-600'>No appointments found</h3>
                <p className='text-gray-400 text-center max-w-md px-4'>
                  {activeTab === 'all' 
                    ? "You don't have any appointments yet. When you do, they'll appear here." 
                    : `You don't have any ${activeTab} appointments.`}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorAppointments;