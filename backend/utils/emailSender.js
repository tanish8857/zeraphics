import nodemailer from 'nodemailer';

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' service for automatic host/port detection
  host: 'smtp.gmail.com', // Explicit Gmail SMTP server
  port: 465, // Recommended port for Gmail (SSL)
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // App Password (not your regular password)
  },
  tls: {
    // Only for development/testing (remove in production)
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  },
  connectionTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
});

/**
 * Base email sending function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 */
const sendEmail = async (to, subject, text, html = null) => {
  try {
    const mailOptions = {
      from: `"Zeraphic" <${process.env.GMAIL_USER}>`, // Professional sender format
      to,
      subject,
      text,
      html: html || text,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Email send error:', {
      to,
      subject,
      error: error.message
    });
    throw error;
  }
};

/**
 * Send email verification link
 * @param {string} email - Recipient email
 * @param {string} token - Verification token
 */
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.APP_URL}/verify?token=${token}`;
  
  return sendEmail(
    email,
    'Verify Your Email - Zeraphic',
    `Please verify your email by clicking: ${verificationLink}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Email Verification</h2>
      <p>Please click the button below to verify your email address:</p>
      <a href="${verificationLink}" 
         style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p style="margin-top: 20px; color: #6b7280;">
        Or copy this link: <br>${verificationLink}
      </p>
       <p><b> Please check spam if mail is not found in the inbox</b></p>
    </div>
    `
  );
};

/**
 * Send password reset link
 * @param {string} email - Recipient email
 * @param {string} token - Reset token
 */
const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;
  
  return sendEmail(
    email,
    'Password Reset Request - Zeraphic',
    `Click to reset your password: ${resetLink}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Password Reset</h2>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="${resetLink}" 
         style="display: inline-block; padding: 10px 20px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p style="margin-top: 20px; color: #6b7280;">
        This link will expire in 1 hour.<br>
        If you didn't request this, please ignore this email.
      </p>
       <p><b> Please check spam if mail is not found in the inbox</b></p>
    </div>
    `
  );
};

/**
 * Send appointment confirmation
 * @param {string} email - Recipient email
 * @param {string} doctorName - Doctor's name
 * @param {string} slotDate - Appointment date
 * @param {string} slotTime - Appointment time
 */
const sendAppointmentEmail = async (email, doctorName, slotDate, slotTime) => {
  return sendEmail(
    email,
    `Appointment Confirmed with Dr. ${doctorName}`,
    `Your appointment with Dr. ${doctorName} is confirmed on ${slotDate} at ${slotTime}.`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #059669;">Appointment Confirmed</h2>
      <p>Your appointment has been successfully booked.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
        <p><strong>Date:</strong> ${slotDate}</p>
        <p><strong>Time:</strong> ${slotTime}</p>
      </div>
      
      <p>You'll receive a reminder before your appointment.</p>
       <p><b> Please check spam if mail is not found in the inbox</b></p>
    </div>
    `
  );
};

/**
 * Send appointment cancellation notice
 * @param {string} email - Recipient email
 * @param {string} doctorName - Doctor's name
 * @param {string} slotDate - Original appointment date
 * @param {string} slotTime - Original appointment time
 */
const sendCancellationEmail = async (email, doctorName, slotDate, slotTime) => {
  return sendEmail(
    email,
    `Appointment Cancelled with Dr. ${doctorName}`,
    `Your appointment with Dr. ${doctorName} on ${slotDate} at ${slotTime} has been cancelled.`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d97706;">Appointment Cancelled</h2>
      <p>Your appointment has been cancelled as requested.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
        <p><strong>Was scheduled for:</strong> ${slotDate} at ${slotTime}</p>
      </div>
      
      <p>You can book a new appointment anytime through our platform.</p>
      <p><b> Please check spam if mail is not found in the inbox</b></p>
    </div>
    `
  );
};




/**
 * Send appointment notification to doctor
 * @param {string} doctorEmail - Doctor's email
 * @param {string} doctorName - Doctor's name
 * @param {string} patientName - Patient's name
 * @param {string} slotDate - Appointment date
 * @param {string} slotTime - Appointment time
 */
const sendDoctorAppointmentNotification = async (doctorEmail, doctorName, patientName, slotDate, slotTime) => {
  return sendEmail(
    doctorEmail,
    `New Appointment Booking - ${patientName}`,
    `You have a new appointment with ${patientName} on ${slotDate} at ${slotTime}.`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Appointment Booked</h2>
      <p>You have a new appointment scheduled through Zeraphic.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Patient:</strong> ${patientName}</p>
        <p><strong>Date:</strong> ${slotDate}</p>
        <p><strong>Time:</strong> ${slotTime}</p>
      </div>
      
      <p>Please review your schedule and prepare accordingly.</p>
      <p style="color: #6b7280; font-size: 0.9rem;">
        <b>Note:</b> You'll receive a reminder before the appointment.
      </p>
    </div>
    `
  );
};

const sendDoctorCancellationNotification = async (doctorEmail, doctorName, patientName, slotDate, slotTime) => {
  return sendEmail(
    doctorEmail,
    `Appointment Cancelled - ${patientName}`,
    `Your appointment with ${patientName} on ${slotDate} at ${slotTime} has been cancelled.`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">Appointment Cancelled</h2>
      <p>An appointment has been cancelled through Zeraphic.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Patient:</strong> ${patientName}</p>
        <p><strong>Was scheduled for:</strong> ${slotDate} at ${slotTime}</p>
      </div>
      
      <p>This time slot is now available for other patients.</p>
    </div>
    `
  );
};

export { 
  sendEmail,
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendAppointmentEmail, 
  sendCancellationEmail ,
  sendDoctorAppointmentNotification,
  sendDoctorCancellationNotification
};