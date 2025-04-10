import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Doctorsocalist = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Physio Management</h1>
        <p className='text-gray-500'>View and manage all registered Physio</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {doctors.map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
          >
            <div className='relative'>
              <img 
                className='w-full h-48 object-cover bg-gray-100'
                src={item.image} 
                alt={item.name} 
              />
              {item.available ? (
                <span className='absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                  Available
                </span>
              ) : (
                <span className='absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                  Unavailable
                </span>
              )}
            </div>

            <div className='p-4'>
              <h3 className='text-xl font-semibold text-gray-800 mb-1'>{item.name}</h3>
              <p className='text-blue-600 font-medium text-sm mb-3'>{item.speciality}</p>
              
              <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                <div className='flex items-center'>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input 
                      type='checkbox' 
                      className='sr-only peer' 
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                    />
                    <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 ${item.available ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                    <span className='ml-3 text-sm font-medium text-gray-700'>
                      {item.available ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </div>
                
                <div className='text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600'>
                  {item.experience || '0'} yrs exp
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className='flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg'>
          <div className='text-center'>
            <svg className='w-16 h-16 mx-auto text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'></path>
            </svg>
            <h3 className='mt-4 text-lg font-medium text-gray-700'>No doctors found</h3>
            <p className='mt-1 text-gray-500'>When doctors register, they will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;