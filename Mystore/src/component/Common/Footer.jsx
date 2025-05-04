import React from "react";
import { Link } from "react-router-dom";
import { FaGithubSquare, FaPhone } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-400 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0 ">
        {/* News offers */}
        <div >
          <h3 className="text-lg text-gray-800 mb-4 ">News Frame </h3>
          <p className="text-[#1d1160] mb-3">
            Be the first to hear about a new product ,exclusive events ,and
            online offer
          </p>
          <p className="text-[#1d1160] mb-2 font-medium">
            Sign up and get 30% offer on every exculsive on product.
          </p>
          <form className="flex mt-5">
            <input
              className="p-2 text-sm border border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
              type="text"
              placeholder="Enter Your Email"
              required
            />
            <button
              type="sumbit"
              className="bg-black text-white py-3 px-6  text-sm rounded-lg hover:bg-gray-500 duration-300 transition-all  "
            >
              Subscription
            </button>
          </form>
        </div>
        {/* Shooping links */}
        <div >
          <h3 className="text-lg text-gray-900 mb-3">Shopping</h3>
          <ul className="text-[#1d1160] space-y-1.5">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Mobile auxiliary
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Top brand Labtop
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Electronics Requirements
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Fun Bukkies
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Sports and Fitness
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Brand Wears
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Model furniture
              </Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div >
          <h3 className="text-lg text-gray-900 mb-3">Supports</h3>
          <ul className="text-[#1d1160] space-y-1.5">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                About us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* social media */}
        <div >
          <h3 className="text-lg text-gray-900 mb-3">Follow Us</h3>
          <div className="flex space-x-2">
            <a
              href=""
              target="_blank"
              rel="nooper nofereber"
              className="hover:text-gray-600"
            >
              <FaGithubSquare className="h-6 w-6" />
            </a>
            <a
              href=""
              target="_blank"
              rel="nooper nofereber"
              className="hover:text-gray-600"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href=""
              target="_blank"
              rel="nooper nofereber"
              className="hover:text-gray-600"
            >
              <FaInstagramSquare className="h-6 w-6" />
            </a>
          </div>
          <p className=" mx-4 mt-2 text-[#1d1160]">Call Us</p>
          <p className="inline-block mx-7">
            <FaPhone />
          </p>
        </div>

        {/* Resrved */}
        <div className="container mx-120 mt-10 px-4 lg:px-0 border-t border-gray-400 pt-6  ">
          <p className="text-[#CC0000] text-sm tracking-tighter text-center">
            ® 2025 Mystore, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
