import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { IoBagCheckOutline } from "react-icons/io5";
const Featuredsection = () => {
  return (
    <section className='py-16 px-4 bg-white'>

        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            {/* featured 1 */}
            <div className='flex flex-col items-center'>
                <div className='py-4 rounded-full '>
                 <FaShippingFast className='text-xl' />
                </div>
                <h4 className='text-[#002244] text-sm tracking-tighter uppercase'>
                    free international shipping
                </h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                   all order with expected budget
                </p>

            </div>
             {/* featured 2 */}
             <div className='flex flex-col items-center'>
                <div className='py-4 rounded-full '>
                 <HiArrowPathRoundedSquare className='text-xl' />
                </div>
                <h4 className='text-[#002244] text-sm tracking-tighter uppercase'>
                    45 days Return
                </h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                   money back guranatee
                </p>

            </div>
             {/* featured 1 */}
             <div className='flex flex-col items-center'>
                <div className='py-4 rounded-full '>
                 <IoBagCheckOutline className='text-xl' />
                </div>
                <h4 className='text-[#002244] text-sm tracking-tighter uppercase'>
                    secure checkout
                </h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                   100% secured checkout process
                </p>

            </div>

        </div>
    </section>
  )
}

export default Featuredsection