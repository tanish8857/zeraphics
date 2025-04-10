import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
            setIsLoading(false)
        }
    }, [doctors, speciality, docId])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -10,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
        }
    }

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    }

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] px-4'>
            {isLoading ? (
                <div className="w-full flex justify-center items-center h-40">
                    <motion.div
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                </div>
            ) : (
                <>
                    <motion.h1 
                        className='text-3xl font-medium text-center'
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Related Doctors
                    </motion.h1>
                    
                    <motion.p 
                        className='sm:w-1/3 text-center text-sm text-gray-600'
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.1 }}
                    >
                        Simply browse through our extensive list of trusted doctors.
                    </motion.p>
                    
                    {relDoc.length > 0 ? (
                        <motion.div 
                            className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5'
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {relDoc.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                                    className='bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all'
                                    variants={itemVariants}
                                    whileHover="hover"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className='h-48 bg-blue-50 flex items-center justify-center overflow-hidden'>
                                        <motion.img 
                                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' 
                                            src={item.image} 
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className='p-4'>
                                        <div className={`flex items-center gap-2 ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                            <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></span>
                                            <span className='text-sm'>{item.available ? 'Available' : "Not Available"}</span>
                                        </div>
                                        <h3 className='text-lg font-semibold text-gray-800 mt-1'>{item.name}</h3>
                                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="bg-white rounded-xl p-8 text-center"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-700">No related doctors found</h3>
                            <p className="mt-2 text-gray-500">We couldn't find any doctors matching this specialty</p>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    )
}

export default RelatedDoctors