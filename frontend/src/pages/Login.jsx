import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });

        if (data.success) {
          toast.success('Registration successful. Please check your email to verify your account.');
          setName('');
          setEmail('');
          setPassword('');
          setState('Login');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

        if (data.success) {
          if (data.user.isVerified) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            toast.success('Login successful.');
          } else {
            toast.error('Please verify your email before logging in.');
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    
    if (token) {
      navigate('/');
    }
    
    return () => clearTimeout(timer);
  }, [token]);

  if (pageLoading) {
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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form 
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1 
            className="text-3xl font-bold text-gray-800 mb-2"
            whileHover={{ scale: 1.02 }}
          >
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {state === 'Sign Up' ? 'Sign up to book appointments' : 'Log in to continue'}
          </motion.p>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </motion.div>

        {state === 'Sign Up' && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              type="text"
              required
              placeholder="John Doe"
            />
          </motion.div>
        )}

        <motion.div 
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: state === 'Sign Up' ? 0.6 : 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            type="email"
            required
            placeholder="your@email.com"
          />
        </motion.div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: state === 'Sign Up' ? 0.7 : 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            type="password"
            required
            placeholder="••••••••"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md relative overflow-hidden"
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: state === 'Sign Up' ? 0.8 : 0.7 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-2">Processing...</span>
            </div>
          ) : (
            state === 'Sign Up' ? 'Create Account' : 'Login'
          )}
        </motion.button>

        <motion.div 
          className="mt-6 text-center text-sm text-gray-600 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: state === 'Sign Up' ? 0.9 : 0.8 }}
        >
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <motion.span 
                onClick={() => setState('Login')}
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login here
              </motion.span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <motion.span 
                onClick={() => setState('Sign Up')}
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up here
              </motion.span>
            </p>
          )}
          
          <p>
            Forgot your password?{' '}
            <Link to="/forgot-password">
              <motion.span 
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset it here
              </motion.span>
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;