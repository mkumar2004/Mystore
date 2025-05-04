import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { FetchProductByFilters, setFilters } from '../../redux/slices/ProductSlice';
const Searchbar = () => {

  const [searchterm,setSearchterm] = useState("");
  const [isopen, setIsopen] = useState(false) ;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSearchtoggle = ()=>{
     setIsopen(true);
  }
  const handleSearch=(e)=>{
    e.preventDefault();
   // console.log("Search",searchterm);
   dispatch(setFilters({search:searchterm}));
   dispatch(FetchProductByFilters({search:searchterm}));
   navigate(`/collections/all?search=${searchterm}`)
    setIsopen(false);
  }
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300
     ${isopen ? "absolute top-0 left-0 w-full bg-white h-24 z-50 ":"w-auto"}
    `} >
        {isopen? (
        <form 
        onSubmit={handleSearch}
        className='relative flex items-center justify-center w-full' >
            <div className='relative w-1/2'>
               <input type='text' placeholder='Search' value={searchterm} onChange={(e)=>setSearchterm(e.target.value)}
               className='bg-gray-200 px-4 py-2 pl-2 pr-10 rounded-lg focus:outline-none w-full placeholder:text-gray-800 ' />
            
            {/* search icon */}
            <button
              type='sumbit'
            className='absolute right-2 top-1/2 transform -translate-y-1/2  text-gray-600 hover:text-gray-800'
            >
             < IoSearchSharp className='h-7 w-7 text-red-500 hover:text-gray-500'/>
            </button>
            </div>
            {/* close icon */}
            <button
              type='sumbit'
            className='absolute right-2 top-1/2 transform -translate-y-1/2  text-gray-600 hover:text-gray-800'
            >
             < IoMdClose className='h-7 w-7 text-gray-500 hover:text-gray-800'/>
            </button>
        </form>):(
            <button onClick={handleSearchtoggle}>
              < IoSearchSharp className='h-7 w-7 text-red-500 hover:text-gray-500'/>
            </button>
        )}
    </div>
  )
}

export default Searchbar