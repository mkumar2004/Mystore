import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSlide = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Yellow", "Black", "Navy Blue", "Burgundy", "Light Blue", "Dark Wash", "White", "Gray"];
  const materials = ["Cotton", "Cotton Blend", "Denim", "Viscose", "Polyester", "Fleece", "Wool Blend", "Silk Blend", "Linen Blend"];
  const brands = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Urban Chic", "Polo Classics", "Street Vibes", "Heritage Wear", "Winter Basics", "Everyday Comfort"];
  const genders = ["Men", "Women"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100
    });
    setPriceRange([
      Number(params.minPrice) || 0,
      Number(params.maxPrice) || 100
    ]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    const updatedFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        updatedFilters[name] = [...(updatedFilters[name] || []), value];
      } else {
        updatedFilters[name] = updatedFilters[name].filter(item => item !== value);
      }
    } else if (type === "radio") {
      updatedFilters[name] = value;
    } else {
      updatedFilters[name] = value;
    }

    setFilters(updatedFilters);
    updateURLParams(updatedFilters);
  };

  const updateURLParams = (updatedFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(updatedFilters).forEach(([key, val]) => {
      if (Array.isArray(val) && val.length > 0) {
        params.set(key, val.join(","));
      } else if (val !== "" && val !== 0) {
        params.set(key, val);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newMax = Number(e.target.value);
    setPriceRange([0, newMax]);
    const newFilters = { ...filters, maxPrice: newMax };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold text-blue-600 text-center mb-4'>Filter</h2>

      {/* Category */}
      <div className='mb-6'>
        <label className='block mb-2 text-gray-700 font-medium'>Category</label>
        {categories.map((category) => (
          <div key={category} className='flex items-center mb-1'>
            <input
              type="radio"
              name="category"
              checked={filters.category === category}
              value={category}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
            />
            <span>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className='mb-6'>
        <label className='block mb-2 text-gray-700 font-medium'>Gender</label>
        {genders.map((gender) => (
          <div key={gender} className='flex items-center mb-1'>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
            />
            <span>{gender}</span>
          </div>
        ))}
      </div>

      {/* Size */}
      <div className='mb-6'>
        <label className='block mb-2 text-gray-700 font-medium'>Size</label>
        {sizes.map((size) => (
          <div key={size} className='flex items-center mb-1'>
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filters.size.includes(size)}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
            />
            <span>{size}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className='mb-6'>
        <label className='block mb-2 text-gray-700 font-medium'>Color</label>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <button 
              key={color}
              onClick={() => {
                const newColor = filters.color === color ? "" : color;
                handleFilterChange({
                  target: {
                    name: "color",
                    value: newColor,
                    type: "radio"
                  }
                });
              }}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Material */}
      <div className='mb-6'>
        <label className='block mb-2 text-gray-700 font-medium'>Material</label>
        {materials.map((material) => (
          <div key={material} className='flex items-center mb-1'>
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
            />
            <span>{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className='mb-6'>
        <label className='block mb-2 text-gray-700 font-medium'>Brand</label>
        {brands.map((brand) => (
          <div key={brand} className='flex items-center mb-1'>
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
            />
            <span>{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className='mb-8'>
        <label className='block mb-2 text-gray-700 font-medium'>Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
        />
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSlide;
