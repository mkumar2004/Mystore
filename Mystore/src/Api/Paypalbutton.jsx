import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Racer from '../assets/racerpay.jpeg';
import debitcard from '../assets/debitcard.jpeg';
import netbanking from '../assets/netbanking.png';
import gpay from '../assets/gpay.jpeg';
import phonepay from '../assets/phonepay.png';

const bankLogos = {
  credit_card: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
  debit_card: debitcard,
  netbanking: netbanking,
  upi: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg",
  gpay: gpay,
  phonepay: phonepay,
};

const Paypalbutton = ({ amount, checkoutId }) => {
  const [status, setStatus] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  const handlePayment = () => {
    setShowOptions(true);
  };

  const confirmPayment = async (isSuccess) => {
    setStatus(isSuccess ? 'success' : 'failure');
    setShowOptions(false);

    // Only call the backend if the payment is successful
    if (isSuccess) {
      try {
        // 1. Mark payment as paid
        const paymentResponse = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
          { paymentStatus: 'paid' },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );

        // 2. Finalize checkout if payment is successful
        if (paymentResponse.status === 200) {
          const finalizeResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );

          // 3. Navigate to order confirmation page after successful finalization
          if (finalizeResponse.status === 200 || finalizeResponse.status === 201) {
            setTimeout(() => {
              navigate('/orderconfirm');
            }, 3000);
          } else {
            console.error('Finalization failed:', finalizeResponse);
            navigate('/');
          }
        } else {
          console.error('Payment update failed:', paymentResponse);
          setStatus('failure');
        }
      } catch (error) {
        console.error('Error during payment or finalization:', error);
        setStatus('failure');
      }
    }

    // Reset status after a few seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {status === 'success' && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Payment Successful!</h2>
          <p>Thank you for your payment.</p>
        </div>
      )}

      {status === 'failure' && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Payment Failed!</h2>
          <p>Please try again.</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        className="w-full bg-blue-500 text-white py-4 px-16 rounded-md font-semibold hover:bg-blue-600 transition"
      >
        checkout
      </button>

      {showOptions && (
        <div className="fixed top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg text-center w-[500px]">
          <img
            src={Racer}
            alt="Payment Gateway"
            className="w-[450px] h-[150px] rounded-2xl object-cover"
          />
          <h3 className="text-lg font-semibold mb-2 ">Select Payment Method</h3>

          <div className="flex flex-col space-y-3">
            {Object.keys(bankLogos).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-400 transition"
              >
                <img src={bankLogos[method]} alt={method} className="h-6 w-6 mr-2" />
                {method.replace("_", " ").toUpperCase()}
              </button>
            ))}
            <p className="text-lg font-bold text-gray-600 ">Total Amount: ₹{amount}</p>
          </div>

          {paymentMethod && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 text-blue-600 p-5 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Confirm Payment</h3>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => confirmPayment(true)}
                  className="m-2 px-6 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition"
                >
                  Success
                </button>
                <button
                  onClick={() => confirmPayment(false)}
                  className="m-2 px-6 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition"
                >
                  Failure
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Paypalbutton;
