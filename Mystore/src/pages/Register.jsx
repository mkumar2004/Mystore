import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MerageCart } from '../redux/slices/CartSlice';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';
  const ischeckedRedirect = redirect.includes('checkout');

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(MerageCart({ user, guestId })).then(() => {
          navigate(ischeckedRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(ischeckedRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, ischeckedRedirect, dispatch]);

  const handleverification = (e) => {
    e.preventDefault();
    dispatch(RegisterUser({ name, email, password }));
  };

  return (
    <div className='flex'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 mt-6'>
        <form
          onSubmit={handleverification}
          className='w-full max-w-md bg-white p-8 rounded-lg shadow-sm border-4 border-gray-200'>
          <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>Mystore</h2>
          </div>
          <h2 className='text-2xl font-semibold text-center mb-6'>Hey there! 👋</h2>
          <p className='text-center mb-4'>
            Enter your details to register
          </p>

          {/* Name */}
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border border-gray-400 p-2 rounded text-center'
              placeholder='Enter your name'
            />
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-gray-400 p-2 rounded text-center'
              placeholder='Enter your email'
            />
          </div>

          {/* Password */}
          <div className='mb-2'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border border-gray-400 p-2 rounded text-center'
              placeholder='Enter your password'
            />
          </div>

          <button
            type='submit'
            className='bg-black mt-2 text-white font-semibold w-full p-2 rounded-lg hover:bg-gray-800 transition'>
            Sign Up
          </button>

          <p className='text-sm text-center mt-6'>
            Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
          </p>
        </form>
      </div>

      <div className='hidden md:block w-1/2 bg-gray-500'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img
            src="https://picsum.photos/500?random=48"
            alt="Register to your account"
            className='h-[750px] w-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
