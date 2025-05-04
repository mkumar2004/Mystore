import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Product from "../Cart/Product";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Cardrawer = ({ cartopen, handleCartdrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const Handlecheckout = () => {
    handleCartdrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-[27rem] sm:w-1/2 md:w-[32rem] h-full bg-white 
    shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
      cartopen ? "translate-x-0" : "translate-x-full"
    }  `}
    >
      {/* close icon */}
      <div className="flex justify-end p-4">
        <button onClick={handleCartdrawer}>
          <IoMdClose className="h-7 w-7 text-gray-500 hover:text-gray-800" />
        </button>
      </div>
      <div className="flex-grow pt-3 overflow-y-auto">
        <h2 className="text-xl font-bold text-center text-[#002244]">
          Your order
        </h2>
        {/* Componets */}
        {cart && cart?.products.length > 0 ? (
          <Product cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="mt-2 text-xl text-center text-cyan-400">No Purchase done</p>
        )}
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products.length > 0 && (
          <>
            <button
              onClick={Handlecheckout}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-400 font-bold transition-all duration-200"
            >
              checkout
            </button>
            <p className="text-center text-gray-600 text-sm tracking-tighter  mt-2">
              Secure your order now with our lighting-fast and hassle-free
              checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Cardrawer;
