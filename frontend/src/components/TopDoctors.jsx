import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

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
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
            {isLoading ? (
                <div className="w-full flex justify-center items-center h-64">
                    <motion.div
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 1.5,
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
                        Top Doctors to Book
                    </motion.h1>
                    
                    <motion.p 
                        className='sm:w-1/3 text-center text-sm text-gray-600'
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Simply browse through our extensive list of trusted doctors.
                    </motion.p>
                    
                    <motion.div 
                        className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0'
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {doctors.slice(0, 10).map((item, index) => (
                            <motion.div 
                                key={index}
                                onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                                className='bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all'
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className='h-48 bg-blue-50 flex items-center justify-center overflow-hidden'>
                                    <img 
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
                    
                    <motion.button 
                        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
                        className='bg-blue-50 text-blue-600 px-8 py-3 rounded-full mt-10 hover:bg-blue-100 transition-colors'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View More Doctors
                    </motion.button>
                </>
            )}
        </div>
    )
}

export default TopDoctors;