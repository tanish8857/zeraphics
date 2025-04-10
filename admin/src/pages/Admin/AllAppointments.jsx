import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const filteredAppointments = appointments.filter(app => {
    if (activeTab === 'all') return true
    if (activeTab === 'upcoming') return !app.cancelled && !app.isCompleted
    if (activeTab === 'completed') return app.isCompleted
    if (activeTab === 'cancelled') return app.cancelled
    return true
  })

  return (
    <div className='w-full max-w-6xl mx-auto p-4 sm:p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Appointment Management</h1>
        <p className='text-gray-500'>View and manage all patient appointments</p>
      </div>

      {/* Status Tabs */}
      <div className='flex flex-wrap gap-2 mb-6'>
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

      {/* Appointments Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b'>
          <p className='text-gray-600 font-medium text-sm'>#</p>
          <p className='text-gray-600 font-medium text-sm'>Patient</p>
          <p className='text-gray-600 font-medium text-sm'>Age</p>
          <p className='text-gray-600 font-medium text-sm'>Date & Time</p>
          <p className='text-gray-600 font-medium text-sm'>Doctor</p>
          <p className='text-gray-600 font-medium text-sm'>Fees</p>
          <p className='text-gray-600 font-medium text-sm'>Status</p>
        </div>

        {/* Appointments List */}
        <div className='max-h-[65vh] overflow-y-auto'>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item, index) => (
              <div 
                className={`flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center gap-4 py-4 px-6 border-b hover:bg-blue-50/30 transition-colors ${item.cancelled ? 'bg-red-50/30' : item.isCompleted ? 'bg-green-50/30' : ''}`}
                key={index}
              >
                <p className='hidden sm:block text-gray-500 font-medium'>{index + 1}</p>
                
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
                
                <p className='text-gray-600'>{calculateAge(item.userData.dob)} yrs</p>
                
                <div className='text-gray-600'>
                  <p className='font-medium'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-sm'>{item.slotTime}</p>
                </div>
                
                <div className='flex items-center gap-3'>
                  <img 
                    src={item.docData.image || assets.user_icon} 
                    className='w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm' 
                    alt="Doctor" 
                  />
                  <div>
                    <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                    <p className='text-xs text-gray-500'>{item.docData.speciality}</p>
                  </div>
                </div>
                
                <p className='text-gray-800 font-medium'>{currency}{item.amount}</p>
                
                <div className='flex items-center gap-2'>
                  {item.cancelled ? (
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors'
                      title="Cancel Appointment"
                    >
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-12'>
              <img 
                src={assets.empty_icon} 
                className='w-24 h-24 mb-4 opacity-70' 
                alt="No appointments" 
              />
              <h3 className='text-lg font-medium text-gray-600'>No appointments found</h3>
              <p className='text-gray-400 text-center max-w-md px-4'>
                {activeTab === 'all' 
                  ? "There are no appointments yet. When appointments are booked, they'll appear here." 
                  : `There are no ${activeTab} appointments.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments