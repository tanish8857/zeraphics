import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Zeraphics <span className="text-blue-600">Privacy Policy</span>
        </motion.h1>
        <motion.div 
          className="w-24 h-1 bg-blue-500 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        className="flex flex-col lg:flex-row gap-12 items-start mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="lg:w-2/3 space-y-8 text-gray-600"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
            <p>
              ZERAPHIC is a digital platform that connects patients with licensed physiotherapists. 
              Patients can select physiotherapists based on price, location, and availability or 
              book time slots at physiotherapists' clinics. By using ZERAPHIC, users agree to the 
              following policies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Patient Policy</h2>
            <h3 className="font-medium text-gray-700 mb-2">Booking and Appointments</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Patients can browse and book physiotherapists based on their preferred criteria (price, location, and available slots).</li>
              <li>Cancellations must be made at least 24 hours before the appointment to avoid cancellation charges.</li>
              <li>Patients must provide accurate medical information to help physiotherapists provide the best treatment.</li>
            </ul>

            <h3 className="font-medium text-gray-700 mb-2">Payments and Refunds</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Payments are processed securely via the ZERAPHIC platform.</li>
              <li>Refunds are subject to cancellation policies and will be issued within 5-7 business days if applicable.</li>
              <li>Any disputes regarding payments should be reported within 48 hours of the appointment.</li>
            </ul>

            <h3 className="font-medium text-gray-700 mb-2">Code of Conduct</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Patients must be respectful toward physiotherapists and follow clinic rules.</li>
              <li>Any misconduct, including harassment or non-payment, may result in suspension from the platform.</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.img 
          className="w-full lg:max-w-md rounded-xl shadow-lg"
          src={assets.policy_image} 
          alt="Privacy Policy"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        />
      </motion.div>

      {/* Additional Sections */}
      <motion.div 
        className="space-y-8 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Physiotherapist Policy</h2>
          <h3 className="font-medium text-gray-700 mb-2">Registration and Verification</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Physiotherapists must provide valid certifications and licenses to be listed on ZERAPHIC.</li>
            <li>ZERAPHIC reserves the right to verify credentials and reject or remove profiles if found non-compliant.</li>
          </ul>

          <h3 className="font-medium text-gray-700 mb-2">Scheduling and Availability</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Physiotherapists must update their availability in real time to avoid double bookings.</li>
            <li>Last-minute cancellations by physiotherapists should be minimized to maintain reliability.</li>
          </ul>

          <h3 className="font-medium text-gray-700 mb-2">Fees and Revenue</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Physiotherapists set their own consultation fees based on diagnosis, without any interference from ZERAPHIC.</li>
            <li>ZERAPHIC does not charge patients; the platform is free for them.</li>
            <li>ZERAPHIC charges a platform service fee to physiotherapists for using the platform.</li>
            <li>Payments for completed appointments will be settled within a specified period after service delivery.</li>
          </ul>

          <h3 className="font-medium text-gray-700 mb-2">Patient Confidentiality</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Physiotherapists must maintain patient confidentiality in compliance with medical ethics and privacy laws.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Privacy and Security</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>ZERAPHIC ensures that all user data is encrypted and protected.</li>
            <li>Patient data will not be shared with third parties without consent.</li>
            <li>Users can request account deletion and data removal upon request.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Platform Guidelines and Liabilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>ZERAPHIC acts as a facilitator and is not responsible for the quality of treatment provided by physiotherapists.</li>
            <li>Any disputes between patients and physiotherapists should be resolved amicably. ZERAPHIC may intervene if necessary.</li>
            <li>The platform reserves the right to modify policies as required.</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;