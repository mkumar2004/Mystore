import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrival`);
        setArrivals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNewArrivals();
  }, []);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons(); // check initial state

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [arrivals]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Recalculate scroll state after animation
    setTimeout(updateScrollButtons, 500);
  };

  return (
    <section className="px-4 py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Explore New Arrivals</h2>
          <p className="text-gray-600">
            Fresh styles just in. New season, new trends. Shop now!
          </p>
        </div>

        {/* Scroll buttons */}
        <div className="flex justify-end items-center gap-3 mb-4 pr-4">
          <button
            onClick={() => scroll("left")}
            className={`p-2 rounded-full bg-yellow-400 text-red-700 hover:bg-yellow-300 transition ${
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
          >
            <GoTriangleLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded-full bg-yellow-400 text-red-700 hover:bg-yellow-300 transition ${
              !canScrollRight && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
          >
            <GoTriangleRight className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth gap-6 px-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {arrivals.map((product) => (
            <div
              key={product._id}
              className="min-w-[250px] max-w-[300px] flex-shrink-0 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-yellow-700 font-bold">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;


