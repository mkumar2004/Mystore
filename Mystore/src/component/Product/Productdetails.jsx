import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Productgrid from './Productgrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/ProductSlice';
import { addtoCart } from '../../redux/slices/CartSlice';

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainimage, setImage] = useState("");
  const [selectcolor, setSelectedColor] = useState("");
  const [selectsize, setSelectedSize] = useState("");
  const [selectquantity, setSelectedQuantity] = useState(1);
  const [isdisable, setIsDisable] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0 && !mainimage) {
      setImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantity = (action) => {
    if (action === "plus") setSelectedQuantity((prev) => prev + 1);
    if (action === "minus" && selectquantity > 1) setSelectedQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectcolor || !selectsize || !selectquantity) {
      toast.error("Please select color, size, and quantity", { duration: 1000 });
      return;
    }

    setIsDisable(true);
    dispatch(
      addtoCart({
        productId: productFetchId,
        quantity: selectquantity,
        size: selectsize,
        color: selectcolor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to Cart", { duration: 2000 });
      })
      .finally(() => {
        setIsDisable(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='p-6'>
      {selectedProduct && (
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
          <div className='flex flex-col md:flex-row'>
            {/* Thumbnails (desktop) */}
            <div className='hidden md:flex flex-col space-y-4 mr-6'>
              {selectedProduct.images.map((item) => (
                <img
                  key={item.url}
                  src={item.url}
                  alt={item.altText}
                  onClick={() => setImage(item.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimage === item.url ? "border-black" : "border-white"}`}
                />
              ))}
            </div>

            {/* Main image */}
            <div className='md:w-1/2'>
              <div className='mb-4'>
                {/* Check if mainimage is valid, if not, show fallback */}
                {mainimage ? (
                  <img
                    src={mainimage}
                    alt="Product"
                    className='w-[500px] h-[600px] object-cover rounded-lg'
                  />
                ) : (
                  <img
                    src="/path/to/fallback-image.jpg" // Set a fallback image if mainimage is empty
                    alt="Fallback Product Image"
                    className='w-[500px] h-[600px] object-cover rounded-lg'
                  />
                )}
              </div>
            </div>

            {/* Thumbnails (mobile) */}
            <div className='md:hidden flex overflow-x-scroll space-x-4'>
              {selectedProduct.images.map((item) => (
                <img
                  key={item.url}
                  src={item.url}
                  alt={item.altText}
                  onClick={() => setImage(item.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimage === item.url ? "border-black" : "border-white"}`}
                />
              ))}
            </div>

            {/* Product info */}
            <div className='md:w-1/2 md:ml-10'>
              <h1 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h1>
              <p className='text-[#002D62] text-xl mb-2'>${selectedProduct.price}</p>
              <p className='text-gray-700 text-xl mb-4'>{selectedProduct.description}</p>

              {/* Colors */}
              <div className='flex gap-3 items-center mb-4'>
                <p className='text-xl'>Color:</p>
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border ${selectcolor === color ? "border-2 border-black" : "border-white"}`}
                    style={{ background: color.toLowerCase(), filter: 'brightness(0.7)' }}
                  />
                ))}
              </div>

              {/* Sizes */}
              <div className='flex gap-3 items-center mb-4'>
                <p className='text-xl'>Size:</p>
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded border ${selectsize === size ? "bg-gray-400" : "bg-white"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Quantity */}
              <div className='mb-4'>
                <p className='text-xl'>Quantity:</p>
                <div className='flex items-center space-x-4 mt-2'>
                  <button
                    onClick={() => handleQuantity("plus")}
                    className='bg-amber-600 rounded-full px-2.5 py-0.5 text-white font-bold hover:bg-amber-400'
                  >
                    +
                  </button>
                  <span>{selectquantity}</span>
                  <button
                    onClick={() => handleQuantity("minus")}
                    className='bg-amber-600 rounded-full px-2.5 py-0.5 text-white font-bold hover:bg-amber-400'
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isdisable}
                className={`bg-black py-2 px-6 mt-4 text-white w-full rounded hover:opacity-45 ${isdisable ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
              >
                {isdisable ? "Adding..." : "Add to Cart"}
              </button>

              {/* Characteristics */}
              <div className='mt-4'>
                <h3 className='font-bold text-xl'>Characteristics:</h3>
                <table className='w-full text-sm text-gray-700 mt-2'>
                  <tbody>
                    <tr>
                      <td className='py-1'>Brand</td>
                      <td className='py-1'>{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className='py-1'>Material</td>
                      <td className='py-1'>{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <div className='mt-6'>
            <h2 className='text-center text-2xl font-medium mb-4'>You May Also Like</h2>
            <Productgrid product={similarProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
