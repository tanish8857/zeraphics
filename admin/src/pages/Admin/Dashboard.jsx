import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-all duration-200'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <img className='w-8 h-8' src={assets.doctor_icon} alt="Doctors" />
            </div>
            <div>
              <p className='text-3xl font-bold'>{dashData.doctors}</p>
              <p className='text-blue-100'>Total Doctors</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-all duration-200'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <img className='w-8 h-8' src={assets.appointments_icon} alt="Appointments" />
            </div>
            <div>
              <p className='text-3xl font-bold'>{dashData.appointments}</p>
              <p className='text-green-100'>Appointments</p>
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-all duration-200'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <img className='w-8 h-8' src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className='text-3xl font-bold'>{dashData.patients}</p>
              <p className='text-purple-100'>Active Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden'>
        <div className='bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4 flex items-center gap-3'>
          <div className='p-2 bg-white bg-opacity-20 rounded-lg'>
            <img className='w-5 h-5' src={assets.list_icon} alt="Bookings" />
          </div>
          <h2 className='text-lg font-semibold text-white'>Latest Bookings</h2>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors' key={index}>
              <img 
                className='rounded-full w-12 h-12 object-cover border-2 border-gray-200' 
                src={item.docData.image} 
                alt={item.docData.name} 
              />
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>{item.docData.name}</p>
                <p className='text-sm text-gray-500'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div className='flex items-center gap-2'>
                {item.cancelled ? (
                  <span className='px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>Completed</span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                    title="Cancel Appointment"
                  >
                    <img className='w-5 h-5' src={assets.cancel_icon} alt="Cancel" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {dashData.latestAppointments.length === 0 && (
          <div className='p-6 text-center text-gray-500'>
            No recent bookings found
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard