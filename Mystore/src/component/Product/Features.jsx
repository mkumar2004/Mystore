import React from 'react'
import {Link} from 'react-router-dom'
import Featuredsection from './Featuredsection'
const Features = () => {
  return (
    <section className='py-16 px-4'>
        <div className=' container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl bg-green-100 '>
             {/* left content */}
             <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                   <h2 className='text-lg text-gray-700 font-semibold mb-4'>Pure Preference</h2>
                   <h2 className=' text-4xl lg:text-5xl font-bold mb-4'>Shop smarter,comfort meets your perfect choice</h2>
                   <p className='text-lg text-gray-700 mb-6 font-semibold'>
                   Discover a seamless shopping experience with [Mystore]—where quality, comfort, and convenience come together. Shop the best deals, trendiest finds, and must-have essentials, all in one place
                   </p>
                   <Link to="to/collection" className='bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-400 duration-300 cursor-pointer '>
                    Shop Now
                   </Link>
             </div>
             {/* Right content */}
             <div className='lg:w-1/2'>
              
                <img src="https://picsum.photos/500?random=78" alt="" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />

          
             </div>

        </div>
        <Featuredsection/>

    </section>
  )
}

export default Features