import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecialityMenu = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

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
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <motion.div 
            id='speciality' 
            className='flex flex-col items-center gap-4 py-16 px-4 text-[#262626]'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <motion.h1 
                className='text-3xl font-medium text-center'
                variants={textVariants}
            >
                Find by Location
            </motion.h1>
            
            <motion.p 
                className='sm:w-1/3 text-center text-sm text-gray-600'
                variants={textVariants}
            >
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </motion.p>
            
            <div className='flex sm:justify-center gap-4 sm:gap-6 pt-5 w-full overflow-x-auto pb-4 px-4'>
                {specialityData.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover="hover"
                        className='flex-shrink-0'
                    >
                        <Link 
                            to={`/doctors/${item.speciality}`} 
                            onClick={() => window.scrollTo(0, 0)} 
                            className='flex flex-col items-center text-xs cursor-pointer'
                        >
                            <motion.div 
                                className='w-16 h-16 sm:w-24 sm:h-24 mb-2 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all'
                                whileTap={{ scale: 0.95 }}
                            >
                                <img 
                                    className='w-3/5 h-3/5 object-contain' 
                                    src={item.image} 
                                    alt={item.speciality} 
                                />
                            </motion.div>
                            <p className='text-sm font-medium text-gray-700'>{item.speciality}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SpecialityMenu;