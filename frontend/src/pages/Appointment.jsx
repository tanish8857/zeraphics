import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [visibleSlots, setVisibleSlots] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false)
    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        setShowConfirmation(true)
    }

    const confirmBooking = async () => {
        setShowConfirmation(false)
        
        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', 
                { docId, slotDate, slotTime }, 
                { headers: { token } }
            )
            
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
            setIsLoading(false)
        }
    }, [docInfo])

    useEffect(() => {
        if (docSlots.length) {
            const today = new Date()
            const filteredSlots = docSlots.filter(slot => new Date(slot[0]?.datetime) >= today).slice(0, 6)
            setVisibleSlots(filteredSlots)
        }
    }, [docSlots])

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
        }
    }

    const cardVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Loading Animation */}
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
                    <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                </div>
            )}

            {docInfo && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Doctor Details Section */}
                    <motion.div 
                        className='flex flex-col sm:flex-row gap-6 mt-8'
                        variants={itemVariants}
                    >
                        <motion.div
                            className="relative"
                            variants={itemVariants}
                        >
                            <motion.img 
                                className='w-full sm:w-72 h-80 object-cover rounded-xl shadow-lg'
                                src={docInfo.image} 
                                alt={docInfo.name}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>

                        <motion.div 
                            className='flex-1 border border-gray-200 rounded-xl p-6 bg-white shadow-sm'
                            variants={itemVariants}
                        >
                            <div className='flex items-center gap-3'>
                                <motion.p 
                                    className='text-2xl md:text-3xl font-semibold text-gray-800'
                                    variants={itemVariants}
                                >
                                    {docInfo.name}
                                </motion.p>
                                <motion.img 
                                    className='w-5 h-5' 
                                    src={assets.verified_icon} 
                                    alt="Verified"
                                    variants={itemVariants}
                                />
                            </div>

                            <motion.div 
                                className='flex items-center gap-3 mt-2 text-gray-600'
                                variants={itemVariants}
                            >
                                <p>{docInfo.degree} - {docInfo.speciality}</p>
                                <motion.span 
                                    className='px-2 py-0.5 border rounded-full text-xs'
                                    variants={itemVariants}
                                >
                                    {docInfo.experience}
                                </motion.span>
                            </motion.div>

                            <motion.div 
                                className='mt-4'
                                variants={itemVariants}
                            >
                                <motion.div 
                                    className='flex items-center gap-2'
                                    variants={itemVariants}
                                >
                                    <p className='text-sm font-medium text-gray-800'>About</p>
                                    <motion.img 
                                        className='w-3 h-3' 
                                        src={assets.info_icon} 
                                        alt="Info"
                                        variants={itemVariants}
                                    />
                                </motion.div>
                                <motion.p 
                                    className='text-sm text-gray-600 mt-1'
                                    variants={itemVariants}
                                >
                                    {docInfo.about}
                                </motion.p>
                            </motion.div>

                            <motion.p 
                                className='text-gray-600 font-medium mt-4'
                                variants={itemVariants}
                            >
                                Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span>
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Booking Slots Section */}
                    <motion.div 
                        className='mt-10'
                        variants={itemVariants}
                    >
                        <motion.p 
                            className='text-lg font-medium text-gray-700'
                            variants={itemVariants}
                        >
                            Booking slots
                        </motion.p>

                        {/* Dates Selection */}
                        <motion.div 
                            className='flex gap-3 items-center w-full overflow-x-auto py-4 mt-4'
                            variants={itemVariants}
                        >
                            {visibleSlots.map((item, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setSlotIndex(index)}
                                    className={`text-center py-3 px-4 min-w-20 rounded-lg cursor-pointer flex-shrink-0 transition-colors ${slotIndex === index ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                                    variants={itemVariants}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <p className="text-sm font-medium">{daysOfWeek[new Date(item[0]?.datetime).getDay()]}</p>
                                    <p className="text-lg font-semibold">{new Date(item[0]?.datetime).getDate()}</p>
                                    <p className="text-xs">{monthsOfYear[new Date(item[0]?.datetime).getMonth()]}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Time Slots Selection */}
                        <motion.div 
                            className='flex gap-3 w-full overflow-x-auto mt-4 p-3 bg-gray-50 rounded-lg'
                            variants={itemVariants}
                        >
                            {visibleSlots.length > 0 && visibleSlots[slotIndex]?.map((item, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`px-5 py-2 rounded-lg flex-shrink-0 transition-all ${item.time === slotTime ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.time.toLowerCase()}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Book Appointment Button */}
                        <motion.button
                            onClick={bookAppointment}
                            className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full mt-6 shadow-md'
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Appointment
                        </motion.button>
                    </motion.div>

                    {/* Related Doctors Section */}
                    <motion.div 
                        className='mt-16'
                        variants={itemVariants}
                    >
                        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
                    </motion.div>
                </motion.div>
            )}

            {/* Confirmation Modal */}
            {showConfirmation && (
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="bg-white rounded-xl p-6 max-w-md w-full"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800">Confirm Appointment</h3>
                        <p className="mt-4 text-gray-600">
                            Are you sure you want to book an appointment with {docInfo.name} on {' '}
                            {visibleSlots[slotIndex][0].datetime.toDateString()} at {slotTime}?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button 
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmBooking}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export default Appointment;