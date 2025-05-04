import React from 'react'
import home2 from '../../assets/home2.webp'
import { Link} from "react-router-dom";
const Homesection = () => {
  return (
    <section className='relative'>
        <img src={home2} alt="homepic" className='w-full h-[400px] md:h-[600px] lg:h-[750] object-cover' />
        
        <div className='absolute inset-0  flex items-center justify-center '> 
          <div className='text-center text-[#4169E1]  p-6'>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter opacity-69 uppercase mb-4 '>
              seasonal  splender
            </h1>
            <p className='uppercase opacity-69 text-2xl font-bold text-[#FF4136]'>expolre endless possiblites with exculsive deals crafted just for you</p>
            <div className='mt-4 '>
            <Link to="#" className='bg-white font-bold opacity-80 px-6 py-2 rounded-sm text-lg hover:bg-gray-300 '>
               shop now
            </Link> 
            </div>
            
          </div>
        </div>
    </section>
  )
}

export default Homesection