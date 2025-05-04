import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa6";
import FilterSlide from '../component/Product/FilterSlide';
import Sortedoption from './Sortedoption';
import Productgrid from '../component/Product/Productgrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchProductByFilters } from '../redux/slices/ProductSlice';

const CollectionPack = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  const params = Object.fromEntries([...searchParams]);
  //console.log(params); // This should show the search parameters when they change
  console.log("Search Params: ", Object.fromEntries([...searchParams]));
  useEffect(() => {
    const fetchProducts = async () => {
      // Make sure to spread params into the dispatch action correctly
      dispatch(FetchProductByFilters({ collection, ...params }));
    };

    fetchProducts();
  }, [dispatch, collection, searchParams]); // Watch for searchParams change

  const Slidebarref = useRef(null);
  const [isSideopen, setIsSideopen] = useState(false);

  const toggleSidebar = () => {
    setIsSideopen(!isSideopen);
  };

  const handleClickoutside = (e) => {
    if (Slidebarref.current && !Slidebarref.current.contains(e.target)) {
      setIsSideopen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickoutside);
    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, []);

  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Mobile filter toggle */}
      <button
        onClick={toggleSidebar}
        aria-expanded={isSideopen}
        aria-controls="filterSidebar"
        className='lg:hidden border p-2 border-amber-200 shadow flex justify-center items-center'
      >
        <FaFilter className='text-red-600 mr-2' /> Filter
      </button>

      {/* Sidebar */}
      <div
        id="filterSidebar"
        ref={Slidebarref}
        className={`${isSideopen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-65 overflow-y-auto transition-transform duration-300 lg:static bg-white lg:translate-x-0 opacity-90`}
      >
        <FilterSlide />
      </div>

      {/* Product grid */}
      <div className='flex-grow mb-2 px-4'>
        <h2 className='text-2xl uppercase mb-4 mt-5'>All Collection</h2>
        <Sortedoption />
        <Productgrid product={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPack;
