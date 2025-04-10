import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { token, setToken, userData } = useContext(AppContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  }

  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      x: '100%',
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => setIsLoading(false)}
          />
        </div>
      )}

      <motion.div 
        className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD] px-4 md:px-8'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          onClick={() => navigate('/')} 
          className='w-44 cursor-pointer' 
          src={assets.logo} 
          alt="Logo"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        />

        {/* Desktop Navigation */}
        <ul className='md:flex items-start gap-8 font-medium hidden'>
          {['/', '/doctors', '/about', '/contact'].map((path, index) => (
            <NavLink 
              key={index}
              to={path}
              className={({ isActive }) => 
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }
            >
              <motion.li 
                className='py-1 relative'
                variants={navItemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {path === '/' && 'HOME'}
                {path === '/doctors' && 'ALL DOCTORS'}
                {path === '/about' && 'ABOUT'}
                {path === '/contact' && 'CONTACT'}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.li>
            </NavLink>
          ))}
        </ul>

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          {token && userData ? (
            <motion.div 
              className='flex items-center gap-2 cursor-pointer group relative'
              whileHover={{ scale: 1.05 }}
            >
              <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt="Profile" />
              <img className='w-2.5 transition-transform group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <motion.div 
                  className='min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-3 p-4'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.p 
                    onClick={() => navigate('/my-profile')} 
                    className='hover:text-blue-600 cursor-pointer px-2 py-1 rounded'
                    whileHover={{ x: 3 }}
                  >
                    My Profile
                  </motion.p>
                  <motion.p 
                    onClick={() => navigate('/my-appointments')} 
                    className='hover:text-blue-600 cursor-pointer px-2 py-1 rounded'
                    whileHover={{ x: 3 }}
                  >
                    My Appointments
                  </motion.p>
                  <motion.p 
                    onClick={logout} 
                    className='hover:text-blue-600 cursor-pointer px-2 py-1 rounded'
                    whileHover={{ x: 3 }}
                  >
                    Logout
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.button 
              onClick={() => navigate('/login')} 
              className='bg-[#395ED6] hover:bg-[#30458d] text-white px-6 py-2.5 rounded-full font-medium hidden md:block'
              whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(57, 94, 214, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              Create account
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <motion.img 
            onClick={() => setShowMenu(true)} 
            className='w-6 md:hidden cursor-pointer'
            src={assets.menu_icon} 
            alt="Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              className='fixed inset-0 z-30 bg-white md:hidden'
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className='flex items-center justify-between px-6 py-5 border-b'>
                <img src={assets.logo} className='w-36' alt="Logo" />
                <motion.img 
                  onClick={() => setShowMenu(false)} 
                  src={assets.cross_icon} 
                  className='w-7 cursor-pointer'
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                />
              </div>
              <ul className='flex flex-col items-start gap-1 mt-4 px-6 text-lg font-medium'>
                {['/', '/doctors', '/about', '/contact'].map((path, index) => (
                  <NavLink 
                    key={index}
                    to={path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) => 
                      isActive ? "text-blue-600" : "text-gray-600"
                    }
                  >
                    <motion.li 
                      className='w-full px-4 py-3 rounded-lg hover:bg-gray-100'
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {path === '/' && 'HOME'}
                      {path === '/doctors' && 'ALL DOCTORS'}
                      {path === '/about' && 'ABOUT'}
                      {path === '/contact' && 'CONTACT'}
                    </motion.li>
                  </NavLink>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export default Navbar