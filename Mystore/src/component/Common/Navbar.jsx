import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import Searchbar from "./Searchbar";
import Cardrawer from "./Cardrawer";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [cartopen, setCartopen] = useState(false);
  const [menudrawer, setMenudrawer] = useState(false);
  const {cart} = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.auth)
  const cartitemsCount = cart?.products?.reduce((total,product)=>total+product.quantity,0) || 0;
  const handleCartdrawer = () => {
    setCartopen(!cartopen);
  };

  const handleMenudrawer = () => {
    setMenudrawer(!menudrawer);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center py-4 px-6 justify-between">
        <div>
          {/* logo */}
          <Link to="/" className="text-2xl font-medium">
            Mystore
          </Link>
        </div>

        {/* home navbar  */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Mens
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Womens
          </Link>
          <Link
            to="/collections/all?category=Top+Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all?category=Bottom+Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
          
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            All Product
          </Link>
        </div>

        {/* profile */}
        <div className="flex space-x-5">
          {user && user.role === "admin" && (
             <Link 
             to="/admin" 
             className="block bg-black px-2 rounded text-sm text-white hover:bg-gray-400 hover:text-black" >
             Admin
             </Link>
          )}
          
          <Link to="/profile" className="hover:text-black">
            <FaRegUser className="h-7 w-7 text-red-500 hover:text-gray-500" />
          </Link>

          {/* cart */}
          <button
            onClick={handleCartdrawer}
            className="relative hover:text-black"
          >
            <BsCart4 className="h-7 w-7 text-red-500 hover:text-gray-500" />
           {cartitemsCount > 0 &&(
                 <span className="absolute -top-3 bg-[#FEBE10] text-xs text-amber-100 rounded-full px-2 py-0.5 font-bold">
                 {cartitemsCount}
               </span>
           ) }
            
          </button>
          {/* search */}
          <Searchbar />
          {/* menudrawer */}
          <button onClick={handleMenudrawer} className="md:hidden">
            <IoMdMenu className="h-7 w-7 text-red-500 hover:text-gray-500" />
          </button>
        </div>
      </nav>
      <Cardrawer cartopen={cartopen} handleCartdrawer={handleCartdrawer} />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 w-[27rem] sm:w-1/2 md:w-[32rem] h-full bg-white 
         shadow-lg transform transition-transform duration-300 flex flex-col z-50 opacity-75 ${
           menudrawer ? "translate-x-0" : "-translate-x-full"
         }  `}
      >
        <div className="flex justify-end p-4">
          <button onClick={handleMenudrawer}>
            <IoMdClose className="h-7 w-7 text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl mb-4 font-bold text-center ">Menu</h2>
          <nav className=" text-center space-y-5">
            <Link
              to="/collections/all?gender=Men"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase ">
              Mens
            </Link>
            <Link
              to="/collections/all?gender=Women"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase ">
              Womens
            </Link>
            <Link
              to="/collections/all?category=Top+Wear"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase ">
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom+Wear"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase ">
              Bottom Wear
            </Link>
            <Link
              to="/collections/all"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase ">
              all products
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
