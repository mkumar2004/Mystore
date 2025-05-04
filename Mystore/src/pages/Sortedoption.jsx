import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FetchProductByFilters, setFilters } from '../redux/slices/ProductSlice';

const Sortedoption = () => {
  const [sorted, setSorted] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSorted(selectedSort);

    // Build new search params
    const newParams = new URLSearchParams(searchParams);
    if (selectedSort) {
      newParams.set("sortBy", selectedSort);
    } else {
      newParams.delete("sortBy");
    }

    // Navigate to updated URL
    navigate(`/collections/all?${newParams.toString()}`);

    // Dispatch Redux actions
    dispatch(setFilters({ sortBy: selectedSort }));
    dispatch(FetchProductByFilters({ sortBy: selectedSort }));
  };

  return (
    <div className='mb-4 flex items-center justify-end'>
      <select
        id="sort"
        onChange={handleSortChange}
        value={sorted}
        className='border-2 border-amber-400 shadow-md py-2 px-2 rounded-md focus:outline-none text-center text-red-600'
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default Sortedoption;


