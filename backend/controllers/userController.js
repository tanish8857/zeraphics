import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';
// New
import {sendDoctorCancellationNotification,sendDoctorAppointmentNotification, sendVerificationEmail,sendPasswordResetEmail,sendAppointmentEmail, sendCancellationEmail } from '../utils/emailSender.js'; // Add `.js` extension

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for all required fields
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists." });
        }

        // Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create user data
        const userData = {
            name,
            email,
            password: hashedPassword,
            isVerified: false, // User is not verified initially
            verificationToken,
        };

        // Save the new user
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Send verification email ONLY during account creation
        sendVerificationEmail(email, verificationToken);

        res.json({ success: true, message: 'User registered. Please check your email to verify your account.' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.json({ success: false, message: 'User does not exist' });
      } 
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        if (!user.isVerified) {
          return res.json({ success: false, message: 'Please verify your email before logging in.' });
        }
  
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
// API to verify email
const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    try {
      // console.log('Token received:', token); 
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('Decoded token:', decoded); // Debugging log
      // console.log('Current time:', Math.floor(Date.now() / 1000)); // Debugging log
  
      // Find the user by email
      const user = await userModel.findOne({ email: decoded.email }).exec(); // Ensure the query is awaited
      console.log('User found:', user); // Debugging log
  
      // Check if the user exists
      if (!user) {
        console.log('User not found for email:', decoded.email); // Debugging log
        return res.status(400).json({ success: false, message: 'User not found.' });
      }
  
      // Check if the user is already verified
      if (user.isVerified) {
        // console.log('User is already verified:', user.email); 
        return res.status(400).json({ success: false, message: 'User is already verified.' });
      }
  
      // Mark the user as verified
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
  
      // console.log('User after verification:', user); // Debugging log
  
      // Generate a JWT token for the user
      const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return success response
      res.status(200).json({ success: true, token: authToken });
    } catch (error) {
        // Debugging log
  
      // console.log('Error verifying email:', error); // Debugging log
  
      if (error.name === 'TokenExpiredError') {
        // Regenerate the verification token and send a new email
        const decoded = jwt.decode(token);
        await regenerateVerificationToken(decoded.email);
        return res.status(400).json({ success: false, message: 'Token expired. A new verification email has been sent.' });
      }
  
      res.status(400).json({ success: false, message: 'Invalid or expired token.' });
    } 
  };
// API to login user








// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
  
      // Generate reset token
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: '1h' 
      });
  
      // Save token to user
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      // Send email with the actual token
      await sendPasswordResetEmail(
        email, 
        'Password Reset', // Subject
        resetToken // The actual token
      );
  
      res.json({ 
        success: true, 
        message: 'Password reset link sent to your email.' 
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  };
  // Reset Password
  const resetPassword = async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;
  
    // 1. Validate token presence and basic structure
    if (!token || typeof token !== 'string') {
      console.error('No token provided or invalid format');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid reset token' 
      });
    }
  
    // 2. Clean the token (remove any unexpected characters)
    const cleanToken = token.trim();
    
    // 3. Verify JWT structure
    if (!cleanToken.startsWith('eyJ') || cleanToken.split('.').length !== 3) {
      // console.error('Malformed token structure:', cleanToken);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid token format' 
      });
    }
  
    try {
      // 4. Verify the JWT
      const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
      // console.log('Decoded token:', decoded);
  
      // 5. Find user with matching token
      const user = await userModel.findOne({
        _id: decoded.id,
        resetPasswordToken: cleanToken,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        console.error('No user found for token:', cleanToken);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid or expired token' 
        });
      }
  
      // 6. Validate passwords
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ 
          success: false, 
          message: 'Passwords do not match' 
        });
      }
  
      // 7. Update password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      return res.json({ 
        success: true, 
        message: 'Password updated successfully' 
      });
  
    } catch (error) {
      console.error('Token verification failed:', error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ 
          success: false, 
          message: 'Token expired. Please request a new reset link.' 
        });
      }
      
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid token. Please request a new reset link.' 
      });
    }
  };






// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select("-password");

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' });
        }

        let slots_booked = docData.slots_booked;

        // Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slots data in doctor data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Send email notification to the user
        sendAppointmentEmail(userData.email, docData.name, slotDate, slotTime);
        //Send email to doc
        await sendDoctorAppointmentNotification(
          docData.email,
          docData.name,
          userData.name,
       
          newAppointment.slotTime,
          newAppointment.slotDate
        );
        res.json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to cancel appointment
// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
      const { userId, appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);

      // Verify appointment user
      if (appointmentData.userId.toString() !== userId) {
          return res.json({ success: false, message: 'Unauthorized action' });
      }

      // Get user data
      const userData = await userModel.findById(userId).select("-password");
      
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      // Releasing doctor slot
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

      await doctorModel.findByIdAndUpdate(docId, { slots_booked });

      // Send email notification to the user
      sendCancellationEmail(userData.email, doctorData.name, slotDate, slotTime);

      // Send email to doctor
      await sendDoctorCancellationNotification(
          doctorData.email,
          doctorData.name,
          userData.name,
          slotDate,
          slotTime
      );
      
      res.json({ success: true, message: 'Appointment Cancelled' });

  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const { origin } = req.headers

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Appointment Fees"
                },
                unit_amount: appointmentData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
            cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { appointmentId, success } = req.body

        if (success === "true") {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe,
    verifyEmail,
    forgotPassword,
    resetPassword
}