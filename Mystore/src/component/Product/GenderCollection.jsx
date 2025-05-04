import React from "react";
import lap from "../../assets/laptop.jpg";
import mobile from "../../assets/mobile.jpeg";
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-10 px-4 lg:px-0">
      <div className="container mx-auto  flex flex-col md:flex-row gap-8">
        {/* Laptop */}

        <div className="relative flex-1">
          <img src={lap} alt="" className="w-full h-[600px] object-cover rounded-lg" />
          <div className="absolute bottom-8 left-8 bg-white p-2 opacity-80">
            <h2 className="text-2xl font-bold text-gray-600 mb-3">
              Premium Selection <br /> Next-Gen Models
            </h2>
            <Link to="#" className="text-gray-700 underline  hover:text-red-600">
              Shop Now
            </Link>
          </div>
        </div>
      {/* Mobile */}
      <div className="relative flex-1">
          <img src={mobile} alt="" className="w-full h-[600px] object-cover rounded-lg" />
          <div className="absolute bottom-8 left-8 bg-white p-2 opacity-80">
            <h2 className="text-2xl font-bold text-gray-600 mb-3">
              Premium Selection <br /> Next-Gen Models
            </h2>
            <Link to="#" className="text-gray-700 underline hover:text-red-600">
              Shop Now
            </Link>
          </div>
        </div>
      
      
      </div>
    </section>
  );
};

export default GenderCollection;
