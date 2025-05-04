import React from 'react'
import {Link} from 'react-router-dom'
const Productgrid = ({product,loading,error}) => {
  if(loading){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Error : {error}</p>
  }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {product.map((prd,index)=>(
            <Link key={index} to={`/product/${prd._id}`} className='block'>
                <div className='bg-white p-4 rounded-lg'>
                    <div className='w-full h-96 mb-4'>
                        <img src={prd.images[0].url} alt={prd.name} 
                         className='w-full h-full object-cover rounded-lg'
                        />

                    </div>
                    <h2 className='px-2 -mt-2 text-sm'>{prd.name}</h2>
                    <h2 className='px-2 text-sm font-medium tracking-tighter '>${prd.price}</h2>
                </div>
            </Link>
          ))}
    </div>
  )
}

export default Productgrid