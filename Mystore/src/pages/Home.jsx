import React, { useEffect, useState } from 'react' 
import Homesection from '../component/Common/Homesection'
import GenderCollection from '../component/Product/GenderCollection'
import NewArrivals from '../component/Product/NewArrivals'
import Productdetails from '../component/Product/Productdetails'
import Productgrid from '../component/Product/Productgrid'
import Features from '../component/Product/Features'
import {useDispatch, useSelector} from 'react-redux'
import { FetchProductByFilters } from '../redux/slices/ProductSlice'
import axios from 'axios'
 
const Home = () => {
    const dispatch = useDispatch();
    const {products,loading , error} = useSelector((state)=>state.products);
    const [Bestseller,setBestseller] = useState(null);
   //console.log("Best seller",Bestseller);
   // console.log(products);
    //fetch product
    useEffect(()=>{

      dispatch(FetchProductByFilters({
        limit:8
       }));
       //fetch best seller
       const fetchBestseller = async()=>{
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
          setBestseller(response.data);
        } catch (error) {
          console.error(error);
        }
       }
       fetchBestseller();
      
    },[dispatch])
  return (
    <div>
        <Homesection/>
        <GenderCollection/>
        <NewArrivals/>
        {/* Best seller */}
          <h2 className='text-3xl text-center font-bold mt-6 px-2  '>Best Seller</h2>
          {Bestseller && Bestseller._id  ? (<Productdetails productId={Bestseller._id}/>):(
            <p className='text-center '>Loading best seller Products...</p>
          )}
        {/* Toys */}
        <div className='container mx-auto '>
        <h3 className='text-3xl text-center mb-4 font-bold '>Love, laughter, and little ones.</h3>
         <Productgrid product={products} loading={loading} error ={error} /> 
        </div>
        <Features/>
    </div>
  )
}

export default Home