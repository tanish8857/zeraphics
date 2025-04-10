import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [payment, setPayment] = useState('');
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [loading, setLoading] = useState(false);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date
    const slotDateFormat = (slotDate) => {
        const [day, month, year] = slotDate.split('_');
        return `${day} ${months[parseInt(month) - 1]} ${year}`;
    };

    // Check if appointment is within next 24 hours
    const isWithin24Hours = (slotDate, slotTime) => {
        const [day, month, year] = slotDate.split('_');
        let [time, period] = slotTime.split(' ');
        let [hours, minutes] = time.split(':');
        
        hours = parseInt(hours);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        const appointmentDate = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            hours,
            parseInt(minutes)
        );
        
        const now = new Date();
        const diffInHours = (appointmentDate - now) / (1000 * 60 * 60);
        
        return diffInHours <= 24;
    };

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { 
                headers: { token } 
            });
            setAppointments(data.appointments.reverse());
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to cancel appointment
    const cancelAppointment = async () => {
        if (!selectedAppointment) return;
        
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId: selectedAppointment._id },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setShowCancelConfirm(false);
            setSelectedAppointment(null);
        }
    };

    // Payment functions
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/verifyRazorpay`,
                        response,
                        { headers: { token } }
                    );
                    if (data.success) {
                        toast.success("Payment successful!");
                        getUserAppointments();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error(error.response?.data?.message || error.message);
                }
            },
            theme: {
                color: '#395ED6'
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-razorpay`,
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                initPay(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Handle cancel click
    const handleCancelClick = (appointment) => {
        if (isWithin24Hours(appointment.slotDate, appointment.slotTime)) {
            toast.error("Cannot cancel appointments within 24 hours of the scheduled time");
            return;
        }
        setSelectedAppointment(appointment);
        setShowCancelConfirm(true);
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">You don't have any appointments yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {appointments.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="p-6 md:flex md:items-center md:justify-between">
                                <div className="flex items-start space-x-4">
                                    <img
                                        className="w-20 h-20 rounded-full object-cover"
                                        src={item.docData.image}
                                        alt={item.docData.name}
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.docData.name}
                                        </h3>
                                        <p className="text-gray-600">{item.docData.speciality}</p>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <p>
                                                <span className="font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                                            </p>
                                            <p>
                                                <span className="font-medium">Address:</span> {item.docData.address.line1}, {item.docData.address.line2}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                        <button
                                            onClick={() => setPayment(item._id)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                    
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                        <button
                                            onClick={() => appointmentRazorpay(item._id)}
                                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                                        >
                                            <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                                        </button>
                                    )}
                                    
                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                        <button className="px-4 py-2 bg-green-100 text-green-800 rounded-md">
                                            Payment Completed
                                        </button>
                                    )}
                                    
                                    {item.isCompleted && (
                                        <button className="px-4 py-2 bg-green-100 text-green-800 rounded-md">
                                            Appointment Completed
                                        </button>
                                    )}
                                    
                                    {!item.cancelled && !item.isCompleted && (
                                        <button
                                            onClick={() => handleCancelClick(item)}
                                            disabled={isWithin24Hours(item.slotDate, item.slotTime)}
                                            className={`px-4 py-2 rounded-md transition-colors ${
                                                isWithin24Hours(item.slotDate, item.slotTime)
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                            }`}
                                        >
                                            Cancel Appointment
                                        </button>
                                    )}
                                    
                                    {item.cancelled && (
                                        <button className="px-4 py-2 bg-red-100 text-red-800 rounded-md">
                                            Appointment Cancelled
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelConfirm && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Cancellation</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel your appointment with {selectedAppointment?.docData.name} on{' '}
                            {selectedAppointment && slotDateFormat(selectedAppointment.slotDate)} at {selectedAppointment?.slotTime}?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowCancelConfirm(false);
                                    setSelectedAppointment(null);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                No, Keep It
                            </button>
                            <button
                                onClick={cancelAppointment}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default MyAppointments;