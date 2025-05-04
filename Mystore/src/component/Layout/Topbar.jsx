import React from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
const Topbar = () => {
  return (
    <div className='bg-[#EF0107] text-white' >
        <div className='container mx-auto flex justify-between items-center py-1 px-3' >
         <div className='hidden md:flex items-center space-x-3 ' >
            <a href="https://github.com/mkumar2004" className='hover:text-gray-300' >
            <FaGithubSquare className='h-8 w-8' />  
            </a>
            <a href="https://www.linkedin.com/in/manojkumar-developer/" className='hover:text-gray-300' >
            <FaLinkedin className='h-8 w-8' /> 
            </a>
            <a href="#" className='hover:text-gray-300' >
            <FaInstagramSquare className='h-8 w-8' />  
            </a>
         </div>
         
         <div className='text-xl text-center flex-grow' >
            <span className='font-bold' >Shop the best,Forget the Rest</span>
         </div>
         
         <div className=' text-xl hidden md:block'>
           <a href="tel:123456789" className='hover:text-gray-300'>
            +91 6374695178
           </a>
         </div>
        
        </div>
       
    </div>
  )
}

export default Topbar