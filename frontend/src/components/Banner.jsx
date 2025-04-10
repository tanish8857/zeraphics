import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Banner = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1200)
        return () => clearTimeout(timer)
    }, [])

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.3
            }
        }
    }

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        },
        tap: {
            scale: 0.98
        }
    }

    return (
        <div className='relative bg-[#395ED6] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden'>
            {/* Loading Animation */}
            {isLoading && (
                <div className="absolute inset-0 bg-[#395ED6] z-10 flex items-center justify-center">
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
                        className="w-14 h-14 border-4 border-white border-t-transparent rounded-full"
                    />
                </div>
            )}

            <div className='flex flex-col md:flex-row'>
                {/* Left Side */}
                <motion.div 
                    className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'
                    initial="hidden"
                    animate={!isLoading ? "visible" : "hidden"}
                >
                    <motion.div 
                        className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'
                        variants={textVariants}
                    >
                        <motion.p variants={textVariants}>Book Appointment</motion.p>
                        <motion.p 
                            className='mt-4'
                            variants={textVariants}
                            transition={{ delay: 0.1 }}
                        >
                            With 100+ Trusted Doctors
                        </motion.p>
                    </motion.div>

                    <motion.button 
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
                        className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6'
                        variants={textVariants}
                        transition={{ delay: 0.2 }}
                        whileHover="hover"
                        whileTap="tap"
                        variant={buttonVariants}
                    >
                        Create account
                    </motion.button>
                </motion.div>

                {/* Right Side */}
                <motion.div 
                    className='hidden md:block md:w-1/2 lg:w-[370px] relative'
                    initial="hidden"
                    animate={!isLoading ? "visible" : "hidden"}
                    variants={imageVariants}
                >
                    <motion.img 
                        className='w-full absolute bottom-0 right-0 max-w-md'
                        src={assets.appointment_img} 
                        alt="Doctor appointment"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div 
                className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-blue-400 rounded-full filter blur-[80px] opacity-20"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-[-30px] right-[-30px] w-60 h-60 bg-blue-400 rounded-full filter blur-[100px] opacity-20"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.25, 0.2]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </div>
    )
}

export default Banner;