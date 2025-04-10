import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const appointmentId = searchParams.get('appointmentId');
  const token = searchParams.get('token');
  const { backendUrl, token: authToken, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Function to verify Stripe payment
  const verifyStripe = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/verifyStripe',
        { success, appointmentId },
        { headers: { token: authToken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      navigate('/my-appointments');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to verify email
  const verifyEmail = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/verify`, {
        params: { token },
      });
      console.log('Verification response:', data); // Debugging log

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Email verified successfully. You are now logged in.');
        navigate('/');
      } else {
        toast.error(data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log('Verification error:', error.response?.data || error.message); // Debugging log
      toast.error(error.response?.data?.message || 'Verification failed.');
      navigate('/login');
    }
  };


  useEffect(() => {
    if (token) {
      verifyEmail(); // Handle email verification
    } else if (authToken && appointmentId && success) {
      verifyStripe(); // Handle Stripe verification
    }
  }, [token, authToken, appointmentId, success]);

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;